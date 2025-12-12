// SafeLaylar Browser Shield - Enhanced Background Service Worker
// AI-powered content filtering, threat detection, and real-time notifications

const SAFELAYLAR_API = 'https://taerlieqgcfewblndolh.supabase.co/functions/v1/threat-detection';

const THREAT_PATTERNS = {
  phishing: [
    /verify.*account.*urgent/i,
    /suspended.*account.*action/i,
    /password.*expired.*reset/i,
    /congratulations.*winner/i,
    /claim.*prize.*now/i,
    /account.*unusual.*activity/i,
    /update.*payment.*info/i,
    /click.*here.*immediately/i
  ],
  scam: [
    /send.*money.*wire/i,
    /nigerian.*prince/i,
    /inheritance.*claim/i,
    /lottery.*winner/i,
    /bitcoin.*invest.*guaranteed/i,
    /work.*from.*home.*easy/i,
    /double.*your.*money/i,
    /risk.*free.*investment/i
  ],
  toxic: [
    /hate.*speech/i,
    /kill.*yourself/i,
    /you.*worthless/i,
    /go.*die/i,
    /nobody.*loves.*you/i
  ],
  grooming: [
    /don't.*tell.*parents/i,
    /our.*secret/i,
    /send.*picture/i,
    /how.*old.*are.*you/i,
    /your.*parents.*don't.*need.*to.*know/i,
    /meet.*me.*alone/i,
    /special.*friendship/i,
    /mature.*for.*your.*age/i
  ],
  romance_scam: [
    /fallen.*in.*love.*with.*you/i,
    /need.*money.*emergency/i,
    /can't.*video.*call/i,
    /military.*deployed/i,
    /send.*gift.*cards/i,
    /western.*union/i
  ],
  malware: [
    /download.*free.*crack/i,
    /install.*this.*software/i,
    /your.*computer.*infected/i,
    /call.*microsoft.*support/i
  ]
};

const BLOCKED_DOMAINS = new Set([
  'malware-domain.com',
  'phishing-site.net',
  'scam-website.org',
  'fake-bank.com',
  'crypto-scam.io'
]);

let stats = {
  threatsBlocked: 0,
  pagesScanned: 0,
  phishingBlocked: 0,
  scamsBlocked: 0,
  toxicContentBlocked: 0,
  groomingPatternsDetected: 0,
  romanceScamsDetected: 0,
  malwareBlocked: 0,
  aiAnalysisCount: 0,
  lastUpdated: Date.now()
};

let settings = {
  aiPoweredScanning: true,
  autoScan: true,
  notificationsEnabled: true,
  scanFrequency: 'realtime', // 'realtime', 'page_load', 'manual'
  sensitivityLevel: 'balanced' // 'low', 'balanced', 'high'
};

// Load stats and settings from storage
chrome.storage.local.get(['safeLaylarStats', 'safeLaylarSettings'], (result) => {
  if (result.safeLaylarStats) {
    stats = { ...stats, ...result.safeLaylarStats };
  }
  if (result.safeLaylarSettings) {
    settings = { ...settings, ...result.safeLaylarSettings };
  }
});

// Save stats periodically
setInterval(() => {
  chrome.storage.local.set({ safeLaylarStats: stats });
}, 15000);

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'ANALYZE_CONTENT':
      handleContentAnalysis(request, sender, sendResponse);
      return true; // Keep channel open for async response

    case 'AI_ANALYZE':
      handleAIAnalysis(request, sendResponse);
      return true;

    case 'GET_STATS':
      sendResponse({ stats, settings });
      break;

    case 'UPDATE_SETTINGS':
      settings = { ...settings, ...request.settings };
      chrome.storage.local.set({ safeLaylarSettings: settings });
      sendResponse({ success: true, settings });
      break;

    case 'CHECK_URL':
      const urlResult = checkURL(request.url);
      sendResponse(urlResult);
      break;

    case 'PAGE_SCANNED':
      stats.pagesScanned++;
      sendResponse({ success: true });
      break;
  }
  return false;
});

function handleContentAnalysis(request, sender, sendResponse) {
  const threats = analyzeContent(request.content);
  
  if (threats.length > 0) {
    updateStats(threats);
    
    // Send notifications for critical threats
    if (settings.notificationsEnabled) {
      const criticalThreats = threats.filter(t => t.severity === 'critical' || t.severity === 'high');
      if (criticalThreats.length > 0) {
        sendNotification(criticalThreats, sender.tab?.url);
      }
    }
  }
  
  // Optionally run AI analysis for deeper inspection
  if (settings.aiPoweredScanning && threats.length === 0 && request.content.length > 50) {
    runAIAnalysis(request.content, request.url)
      .then(aiResult => {
        if (aiResult.threat_detected) {
          const aiThreats = [{
            category: aiResult.threat_type || 'suspicious',
            severity: aiResult.threat_level,
            details: aiResult.details,
            source: 'ai',
            timestamp: Date.now()
          }];
          updateStats(aiThreats);
          if (settings.notificationsEnabled && (aiResult.threat_level === 'high' || aiResult.threat_level === 'critical')) {
            sendNotification(aiThreats, request.url);
          }
        }
      })
      .catch(err => console.error('AI analysis error:', err));
  }
  
  sendResponse({ threats, stats });
}

async function handleAIAnalysis(request, sendResponse) {
  try {
    const result = await runAIAnalysis(request.content, request.url, request.contentType);
    stats.aiAnalysisCount++;
    sendResponse({ success: true, result });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

async function runAIAnalysis(content, url, contentType = 'text') {
  try {
    const response = await fetch(SAFELAYLAR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content.substring(0, 2000),
        contentType,
        url
      })
    });

    if (!response.ok) {
      throw new Error('AI analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      threat_detected: false,
      threat_level: 'safe',
      error: error.message
    };
  }
}

function analyzeContent(content) {
  const threats = [];
  const text = content.toLowerCase();
  
  for (const [category, patterns] of Object.entries(THREAT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        threats.push({
          category,
          severity: getSeverity(category),
          pattern: pattern.toString(),
          source: 'pattern',
          timestamp: Date.now()
        });
        break;
      }
    }
  }
  
  return threats;
}

function checkURL(url) {
  try {
    const hostname = new URL(url).hostname;
    const isSafe = !BLOCKED_DOMAINS.has(hostname);
    
    // Check for suspicious URL patterns
    const suspiciousPatterns = [
      /login.*verify/i,
      /secure.*update/i,
      /account.*confirm/i,
      /paypal.*\..*\.com/i,
      /bank.*\..*\.net/i
    ];
    
    let suspicious = false;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url)) {
        suspicious = true;
        break;
      }
    }
    
    return {
      isSafe: isSafe && !suspicious,
      suspicious,
      blocked: BLOCKED_DOMAINS.has(hostname)
    };
  } catch {
    return { isSafe: true, suspicious: false, blocked: false };
  }
}

function getSeverity(category) {
  const severityMap = {
    phishing: 'critical',
    scam: 'high',
    toxic: 'medium',
    grooming: 'critical',
    romance_scam: 'high',
    malware: 'critical'
  };
  return severityMap[category] || 'medium';
}

function updateStats(threats) {
  threats.forEach(threat => {
    stats.threatsBlocked++;
    switch (threat.category) {
      case 'phishing':
        stats.phishingBlocked++;
        break;
      case 'scam':
        stats.scamsBlocked++;
        break;
      case 'toxic':
        stats.toxicContentBlocked++;
        break;
      case 'grooming':
        stats.groomingPatternsDetected++;
        break;
      case 'romance_scam':
        stats.romanceScamsDetected++;
        break;
      case 'malware':
        stats.malwareBlocked++;
        break;
    }
  });
  stats.lastUpdated = Date.now();
}

function sendNotification(threats, url) {
  const criticalThreats = threats.filter(t => t.severity === 'critical');
  const highThreats = threats.filter(t => t.severity === 'high');
  
  let title, message, priority;
  
  if (criticalThreats.length > 0) {
    title = '🔴 Critical Threat Blocked!';
    message = `SafeLaylar blocked ${criticalThreats.length} critical threat(s): ${criticalThreats.map(t => t.category).join(', ')}`;
    priority = 2;
  } else if (highThreats.length > 0) {
    title = '🟠 High-Risk Content Detected';
    message = `SafeLaylar blocked ${highThreats.length} high-risk content: ${highThreats.map(t => t.category).join(', ')}`;
    priority = 1;
  } else {
    title = '🛡️ Threat Blocked';
    message = `SafeLaylar blocked ${threats.length} potential threat(s)`;
    priority = 0;
  }
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title,
    message,
    priority,
    buttons: [
      { title: 'View Details' },
      { title: 'Dismiss' }
    ]
  });
}

// Auto-scan new tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && settings.autoScan && tab.url) {
    // Check URL safety
    const urlResult = checkURL(tab.url);
    if (!urlResult.isSafe) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: '⚠️ Suspicious Website Detected',
        message: `This website may be unsafe: ${new URL(tab.url).hostname}`,
        priority: 2
      });
    }
    stats.pagesScanned++;
  }
});

// Context menu for reporting
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'safelaylar-report',
    title: 'Report to SafeLaylar',
    contexts: ['selection', 'link', 'image']
  });
  
  chrome.contextMenus.create({
    id: 'safelaylar-scan',
    title: 'Scan with SafeLaylar AI',
    contexts: ['selection', 'page']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'safelaylar-report') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Report Submitted',
      message: 'Thank you for helping keep the internet safe!',
      priority: 1
    });
  } else if (info.menuItemId === 'safelaylar-scan') {
    const content = info.selectionText || '';
    if (content) {
      runAIAnalysis(content, tab?.url)
        .then(result => {
          const title = result.threat_detected ? '⚠️ Threat Detected' : '✅ Content Appears Safe';
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title,
            message: result.warning_message || 'Scan complete',
            priority: result.threat_detected ? 2 : 0
          });
        });
    }
  }
});

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // View Details - open protection dashboard
    chrome.tabs.create({ url: 'https://taerlieqgcfewblndolh.supabase.co/protection' });
  }
  chrome.notifications.clear(notificationId);
});

console.log('SafeLaylar Browser Shield v2.0 - AI-Powered Protection Initialized');
