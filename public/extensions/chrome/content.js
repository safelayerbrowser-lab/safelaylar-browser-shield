// SafeLaylar Browser Shield - Enhanced Content Script v2.0
// Real-time AI-powered page monitoring and protection

(function() {
  'use strict';

  const CONFIG = {
    SCAN_INTERVAL: 1500,
    AI_SCAN_THRESHOLD: 100, // Min chars for AI analysis
    BLUR_CLASS: 'safelaylar-blur',
    BLOCKED_CLASS: 'safelaylar-blocked',
    BADGE_VISIBLE_DURATION: 5000
  };

  let isEnabled = true;
  let threatCount = 0;
  let scanCount = 0;
  let lastScanTime = 0;

  let filterSettings = {
    antiGrooming: true,
    contentProtection: true,
    romanceScamAlerts: true,
    deepfakeDetection: true,
    spywareProtection: true,
    aiPoweredScanning: true,
    autoScan: true,
    sensitivityLevel: 'balanced'
  };

  // Enhanced threat patterns with more comprehensive coverage
  const THREAT_PATTERNS = {
    toxic: [
      /kill.*yourself/i,
      /you.*worthless/i,
      /hate.*you/i,
      /go.*die/i,
      /nobody.*loves.*you/i,
      /should.*not.*exist/i,
      /kys/i,
      /end.*your.*life/i
    ],
    grooming: [
      /don't.*tell.*anyone/i,
      /our.*little.*secret/i,
      /send.*me.*a.*picture/i,
      /how.*old.*are.*you.*really/i,
      /your.*parents.*don't.*need.*to.*know/i,
      /meet.*me.*somewhere/i,
      /special.*friendship/i,
      /mature.*for.*your.*age/i,
      /keep.*this.*between.*us/i,
      /delete.*this.*message/i
    ],
    scam: [
      /congratulations.*you.*won/i,
      /claim.*your.*prize/i,
      /urgent.*account.*suspended/i,
      /verify.*immediately.*or.*lose/i,
      /nigerian.*prince/i,
      /wire.*transfer.*urgent/i,
      /limited.*time.*offer/i,
      /act.*now.*before/i,
      /exclusive.*opportunity/i,
      /guaranteed.*returns/i
    ],
    romance_scam: [
      /fallen.*in.*love.*with.*you/i,
      /need.*money.*emergency/i,
      /can't.*video.*call.*right.*now/i,
      /military.*deployed.*overseas/i,
      /send.*gift.*cards/i,
      /western.*union/i,
      /stuck.*in.*another.*country/i,
      /hospital.*bills.*help/i
    ],
    phishing: [
      /your.*account.*has.*been.*compromised/i,
      /click.*here.*to.*verify/i,
      /update.*your.*payment/i,
      /confirm.*your.*identity/i,
      /suspicious.*login.*attempt/i,
      /security.*alert.*action.*required/i
    ],
    malware: [
      /download.*free.*crack/i,
      /install.*this.*software.*now/i,
      /your.*computer.*is.*infected/i,
      /call.*microsoft.*support/i,
      /your.*device.*has.*virus/i,
      /click.*to.*remove.*virus/i
    ]
  };

  // Load settings
  chrome.storage.local.get(['safeLaylarEnabled', 'safeLaylarSettings'], (result) => {
    if (result.safeLaylarEnabled !== undefined) {
      isEnabled = result.safeLaylarEnabled;
    }
    if (result.safeLaylarSettings) {
      filterSettings = { ...filterSettings, ...result.safeLaylarSettings };
    }
    if (isEnabled) {
      initProtection();
    }
  });

  function initProtection() {
    console.log('SafeLaylar: Initializing protection...');
    injectStyles();
    performFullScan();
    observeMutations();
    showProtectionBadge();
    notifyBackgroundPageScanned();
    
    // Periodic deep scan
    setInterval(performFullScan, CONFIG.SCAN_INTERVAL);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'safelaylar-styles';
    style.textContent = `
      .${CONFIG.BLUR_CLASS} {
        filter: blur(12px) !important;
        transition: filter 0.3s ease !important;
        cursor: pointer !important;
        position: relative !important;
        user-select: none !important;
      }
      .${CONFIG.BLUR_CLASS}::before {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        background: rgba(220, 38, 38, 0.1) !important;
        z-index: 9999 !important;
      }
      .${CONFIG.BLUR_CLASS}::after {
        content: '🛡️ Content filtered by SafeLaylar - Click to reveal' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: linear-gradient(135deg, #1590F0, #0F68EF) !important;
        color: white !important;
        padding: 12px 20px !important;
        border-radius: 12px !important;
        font-size: 13px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        white-space: nowrap !important;
        z-index: 10000 !important;
        box-shadow: 0 4px 20px rgba(15, 104, 239, 0.4) !important;
        pointer-events: none !important;
      }
      .${CONFIG.BLOCKED_CLASS} {
        display: none !important;
      }
      .safelaylar-badge {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        background: linear-gradient(135deg, #10B981, #059669) !important;
        color: white !important;
        padding: 12px 18px !important;
        border-radius: 50px !important;
        font-size: 13px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 500 !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4) !important;
        cursor: pointer !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        animation: safelaylar-pulse 2s ease-in-out infinite !important;
      }
      .safelaylar-badge:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5) !important;
      }
      .safelaylar-badge.threat-detected {
        background: linear-gradient(135deg, #EF4444, #DC2626) !important;
        animation: safelaylar-alert 0.5s ease-in-out !important;
      }
      .safelaylar-badge svg {
        width: 18px !important;
        height: 18px !important;
      }
      .safelaylar-badge .dot {
        width: 8px !important;
        height: 8px !important;
        background: white !important;
        border-radius: 50% !important;
        animation: safelaylar-blink 1s ease-in-out infinite !important;
      }
      @keyframes safelaylar-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.9; }
      }
      @keyframes safelaylar-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes safelaylar-alert {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.1); }
        75% { transform: scale(0.95); }
      }
      .safelaylar-tooltip {
        position: fixed !important;
        bottom: 70px !important;
        right: 20px !important;
        background: white !important;
        color: #1f2937 !important;
        padding: 16px 20px !important;
        border-radius: 12px !important;
        font-size: 13px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        z-index: 999998 !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
        max-width: 280px !important;
        opacity: 0 !important;
        transform: translateY(10px) !important;
        transition: all 0.3s ease !important;
        pointer-events: none !important;
      }
      .safelaylar-tooltip.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .safelaylar-reveal {
        filter: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function performFullScan() {
    if (!isEnabled) return;
    
    const now = Date.now();
    if (now - lastScanTime < 500) return; // Debounce
    lastScanTime = now;
    scanCount++;

    // Scan text content
    const textNodes = getTextNodes(document.body);
    textNodes.forEach(node => {
      const text = node.textContent;
      const threat = detectThreat(text);
      if (threat) {
        handleThreatDetection(node, threat, text);
      }
    });

    // Scan links
    if (filterSettings.spywareProtection) {
      scanLinks();
    }

    // Scan images (placeholder for ML)
    if (filterSettings.deepfakeDetection) {
      scanImages();
    }

    // Run AI analysis on page content periodically
    if (filterSettings.aiPoweredScanning && scanCount % 5 === 0) {
      const pageText = document.body.innerText.substring(0, 2000);
      if (pageText.length > CONFIG.AI_SCAN_THRESHOLD) {
        requestAIAnalysis(pageText);
      }
    }
  }

  function getTextNodes(element) {
    const nodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.textContent.trim().length < 15) return NodeFilter.FILTER_SKIP;
          if (node.parentElement?.closest('script, style, noscript, .safelaylar-badge')) {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    let node;
    while (node = walker.nextNode()) {
      nodes.push(node);
    }
    return nodes;
  }

  function detectThreat(text) {
    const lowerText = text.toLowerCase();
    
    const categories = [
      { key: 'toxic', enabled: filterSettings.contentProtection },
      { key: 'grooming', enabled: filterSettings.antiGrooming },
      { key: 'scam', enabled: filterSettings.romanceScamAlerts },
      { key: 'romance_scam', enabled: filterSettings.romanceScamAlerts },
      { key: 'phishing', enabled: filterSettings.spywareProtection },
      { key: 'malware', enabled: filterSettings.spywareProtection }
    ];

    for (const { key, enabled } of categories) {
      if (!enabled) continue;
      const patterns = THREAT_PATTERNS[key];
      if (!patterns) continue;
      
      for (const pattern of patterns) {
        if (pattern.test(lowerText)) {
          return {
            category: key,
            pattern: pattern.toString(),
            severity: getSeverity(key)
          };
        }
      }
    }

    return null;
  }

  function getSeverity(category) {
    const map = {
      toxic: 'medium',
      grooming: 'critical',
      scam: 'high',
      romance_scam: 'high',
      phishing: 'critical',
      malware: 'critical'
    };
    return map[category] || 'medium';
  }

  function handleThreatDetection(node, threat, text) {
    const parent = node.parentElement;
    if (!parent || parent.classList.contains(CONFIG.BLUR_CLASS)) return;

    parent.classList.add(CONFIG.BLUR_CLASS);
    threatCount++;
    updateBadge();

    // Allow reveal on click
    parent.addEventListener('click', () => {
      if (confirm('SafeLaylar has filtered this content for your protection. Are you sure you want to view it?')) {
        parent.classList.remove(CONFIG.BLUR_CLASS);
        parent.classList.add('safelaylar-reveal');
      }
    }, { once: true });

    // Notify background
    sendToBackground(text, threat);
  }

  function scanLinks() {
    const links = document.querySelectorAll('a[href]:not([data-safelaylar-scanned])');
    links.forEach(link => {
      link.setAttribute('data-safelaylar-scanned', 'true');
      chrome.runtime.sendMessage(
        { type: 'CHECK_URL', url: link.href },
        (response) => {
          if (response && !response.isSafe) {
            link.classList.add(CONFIG.BLUR_CLASS);
            link.addEventListener('click', (e) => {
              e.preventDefault();
              if (confirm('SafeLaylar has detected this link may be unsafe. Continue anyway?')) {
                window.open(link.href, '_blank');
              }
            });
          }
        }
      );
    });
  }

  function scanImages() {
    // Placeholder for ML-based deepfake detection
    // Would integrate with server-side ML model in production
    const images = document.querySelectorAll('img:not([data-safelaylar-scanned])');
    images.forEach(img => {
      img.setAttribute('data-safelaylar-scanned', 'true');
    });
  }

  function requestAIAnalysis(content) {
    chrome.runtime.sendMessage({
      type: 'AI_ANALYZE',
      content,
      url: window.location.href,
      contentType: 'page'
    }, (response) => {
      if (response?.result?.threat_detected) {
        console.log('SafeLaylar AI: Threat detected', response.result);
        updateBadge(true);
      }
    });
  }

  function sendToBackground(content, threat) {
    chrome.runtime.sendMessage(
      { type: 'ANALYZE_CONTENT', content, threat },
      (response) => {
        if (response?.threats?.length > 0) {
          console.log('SafeLaylar: Threats logged', response.threats);
        }
      }
    );
  }

  function notifyBackgroundPageScanned() {
    chrome.runtime.sendMessage({ type: 'PAGE_SCANNED' });
  }

  function observeMutations() {
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && 
                !node.classList?.contains('safelaylar-badge') &&
                !node.classList?.contains('safelaylar-tooltip')) {
              shouldScan = true;
              break;
            }
          }
        }
      });
      if (shouldScan) {
        requestAnimationFrame(performFullScan);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function showProtectionBadge() {
    const badge = document.createElement('div');
    badge.className = 'safelaylar-badge';
    badge.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
      <span>Protected</span>
      <div class="dot"></div>
    `;

    const tooltip = document.createElement('div');
    tooltip.className = 'safelaylar-tooltip';
    
    badge.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'GET_STATS' }, (response) => {
        if (response?.stats) {
          tooltip.innerHTML = `
            <strong style="display:block;margin-bottom:8px;">SafeLaylar Protection Stats</strong>
            <div style="line-height:1.6;">
              🛡️ Threats Blocked: ${response.stats.threatsBlocked}<br>
              📄 Pages Scanned: ${response.stats.pagesScanned}<br>
              🎣 Phishing Blocked: ${response.stats.phishingBlocked}<br>
              💔 Scams Blocked: ${response.stats.scamsBlocked}<br>
              ⚠️ Toxic Content: ${response.stats.toxicContentBlocked}<br>
              🚨 Grooming Detected: ${response.stats.groomingPatternsDetected}<br>
              🤖 AI Analyses: ${response.stats.aiAnalysisCount}
            </div>
          `;
          tooltip.classList.add('visible');
          setTimeout(() => tooltip.classList.remove('visible'), 5000);
        }
      });
    });

    document.body.appendChild(badge);
    document.body.appendChild(tooltip);
  }

  function updateBadge(threatAlert = false) {
    const badge = document.querySelector('.safelaylar-badge');
    if (badge) {
      if (threatAlert || threatCount > 0) {
        badge.classList.add('threat-detected');
        badge.querySelector('span').textContent = `${threatCount} Blocked`;
        setTimeout(() => badge.classList.remove('threat-detected'), 3000);
      }
    }
  }

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.safeLaylarEnabled) {
      isEnabled = changes.safeLaylarEnabled.newValue;
      if (isEnabled) {
        initProtection();
      }
    }
    if (changes.safeLaylarSettings) {
      filterSettings = { ...filterSettings, ...changes.safeLaylarSettings.newValue };
    }
  });

  console.log('SafeLaylar Browser Shield v2.0 - Content Protection Active');
})();
