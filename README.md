# SafeLaylar Browser Shield

## Your Digital Shield for a Safer Online World

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green.svg)](#installation)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-orange.svg)](https://supabase.com)

SafeLaylar is an AI-powered browser protection tool designed to combat **Technology-Facilitated Gender-Based Violence (TFGBV)** and protect vulnerable users—especially children and women—from online threats including grooming, scams, toxic content, and digital exploitation.

![SafeLaylar Shield](public/pwa-512x512.png)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement--relevance-to-tfgbv)
- [Features](#-features-walkthrough)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Technologies Used](#-technologies-used)
- [Browser Extension](#-browser-extension)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Expected Impact](#-expected-impact)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Problem Statement & Relevance to TFGBV

### The Problem

Technology-Facilitated Gender-Based Violence (TFGBV) is a growing global crisis that disproportionately affects women, girls, and vulnerable populations:

| Statistic | Impact |
|-----------|--------|
| **1 in 3 women** | Have experienced online violence globally |
| **85%** | Of women have witnessed online violence against others |
| **38%** | Of girls have experienced cyberbullying |
| **Growing** | Sophistication of grooming tactics using AI |
| **Rising** | Image-based abuse and deepfake pornography |

### Specific Threats We Address

1. **Online Grooming**: Predators using social engineering to manipulate minors
2. **Romance Scams**: Financial fraud targeting lonely individuals
3. **Phishing Attacks**: Credential theft through deceptive websites
4. **Cyberbullying**: Toxic content and harassment campaigns
5. **Deepfakes**: AI-generated fake media for harassment
6. **Sextortion**: Blackmail using intimate images
7. **Stalkerware**: Surveillance software for control

### Why SafeLaylar Matters

SafeLaylar directly addresses TFGBV through:

- ✅ **Real-time AI threat detection** for grooming patterns
- ✅ **Push notifications** for immediate threat alerts
- ✅ **Parental oversight** with child consent
- ✅ **Educational resources** via AI chatbot
- ✅ **Community safety network** for support

---

## ✨ Features Walkthrough

### 🛡️ Core Protection Features

| Feature | Description | Status |
|---------|-------------|--------|
| **AI Content Filter** | Detects and blocks harmful content in real-time | ✅ Active |
| **Anti-Grooming Detection** | Identifies manipulation patterns using AI | ✅ Active |
| **Romance Scam Alerts** | Warns of potential romance fraud indicators | ✅ Active |
| **Phishing Protection** | Blocks fake websites and credential theft | ✅ Active |
| **Deepfake Detection** | Identifies AI-generated fake media | ✅ Active |
| **Spyware Protection** | Blocks malicious tracking and scripts | ✅ Active |

### 🔔 Push Notifications

Real-time alerts delivered instantly when threats are detected:

```javascript
// Example notification categories:
- 🔴 Critical: Grooming patterns, phishing attempts
- 🟠 High: Romance scams, malware
- 🟡 Medium: Toxic content, suspicious links
- ℹ️ Info: Weekly reports, safety tips
```

### 👨‍👩‍👧 Parental Dashboard

- **Child Account Linking**: Connect with consent-based oversight
- **Safety Score**: Real-time safety metrics (0-100)
- **Threat History**: View all blocked threats
- **Weekly Reports**: Automated email summaries
- **Customizable Filters**: Per-child sensitivity settings

### 🤖 AI Safety Chatbot

Powered by Google Gemini via Lovable AI Gateway:

- 24/7 availability for safety questions
- Personalized safety tips
- Threat reporting guidance
- Educational resources

### 📱 Multi-Platform Support

| Platform | Type | Status |
|----------|------|--------|
| Chrome | Extension | ✅ Available |
| Firefox | Extension | ✅ Available |
| Safari | Extension | ✅ Available |
| Edge | Extension | ✅ Available |
| iOS | PWA | ✅ Available |
| Android | PWA | ✅ Available |
| Desktop | PWA | ✅ Available |

---

## 📥 Installation

### Progressive Web App (PWA)

The easiest way to install SafeLaylar:

1. Visit the app at your deployed URL
2. Look for the "Install App" button or browser install prompt
3. Click "Install" to add to your home screen/desktop

**Supported Browsers:**
- Chrome 89+ (Desktop & Mobile)
- Edge 89+ (Desktop)
- Safari 16.4+ (iOS & macOS)
- Firefox (Desktop)
- Samsung Internet

### Browser Extension

#### Chrome/Edge

1. Download the extension from `/public/extensions/chrome`
2. Go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the folder

#### Firefox

1. Download from `/public/extensions/firefox`
2. Go to `about:debugging`
3. Click "Load Temporary Add-on"
4. Select the manifest.json

---

## 🚀 Running the Project

### Prerequisites

- **Node.js 18+** (install via [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **bun** package manager
- **Supabase account** (for backend features)

### Quick Start

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd safelaylar-browser-shield

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Supabase Setup

The project uses Supabase for:

- **Authentication**: Email/password and social login
- **Database**: PostgreSQL for user data and threat logs
- **Edge Functions**: AI-powered threat detection
- **Real-time**: Live threat notifications

Edge functions are automatically deployed when you push changes.

---

## 🛠️ Technologies Used

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 12.x | Animations |
| shadcn/ui | Latest | UI components |
| React Router | 6.x | Client routing |
| TanStack Query | 5.x | Server state |

### Backend Stack

| Technology | Purpose |
|------------|---------|
| Supabase | BaaS (Database, Auth, Functions) |
| PostgreSQL | Primary database |
| Deno | Edge function runtime |
| Lovable AI | AI gateway for threat detection |

### AI & ML

| Technology | Purpose |
|------------|---------|
| Google Gemini 2.5 Flash | Content analysis & chatbot |
| Custom pattern matching | Fast threat detection |
| Threat classification | Multi-category detection |

### PWA Features

| Feature | Implementation |
|---------|---------------|
| Service Worker | Workbox via vite-plugin-pwa |
| App Manifest | Full PWA manifest |
| Offline Support | Cache-first strategy |
| Push Notifications | Web Push API |

---

## 🔌 Browser Extension

### Features

- **Auto-scanning**: Scans page content in real-time
- **AI Integration**: Connects to SafeLaylar API for deep analysis
- **Visual Protection**: Blurs harmful content
- **Notifications**: Desktop alerts for threats
- **Statistics**: Tracks blocked threats

### Architecture

```
extension/
├── manifest.json      # Extension configuration
├── background.js      # Service worker (threat detection)
├── content.js         # Page content scanner
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic
└── icons/            # Extension icons
```

### API Integration

The extension communicates with the SafeLaylar API:

```javascript
// Threat Detection Endpoint
POST /functions/v1/threat-detection
{
  "content": "Text to analyze",
  "contentType": "text|url|image",
  "url": "https://example.com"
}

// Response
{
  "threat_detected": boolean,
  "threat_level": "safe|low|medium|high|critical",
  "threat_type": "grooming|phishing|scam|...",
  "confidence": 0-100,
  "action": "allow|warn|block"
}
```

---

## 📚 API Documentation

### Threat Detection API

**Endpoint**: `POST /functions/v1/threat-detection`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "content": "String to analyze (max 2000 chars)",
  "contentType": "text|url|page",
  "url": "Optional URL for context",
  "userId": "Optional user ID for logging"
}
```

**Response**:
```json
{
  "threat_detected": true,
  "threat_level": "high",
  "threat_type": "grooming",
  "confidence": 87,
  "warning_message": "Potential grooming pattern detected",
  "action": "block",
  "details": "Message contains manipulation tactics"
}
```

### Safety Chat API

**Endpoint**: `POST /functions/v1/safety-chat`

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "How do I spot phishing?" }
  ],
  "isDemo": false
}
```

**Response**: Server-Sent Events (SSE) stream

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
├─────────────┬─────────────┬─────────────┬──────────────────┤
│   React     │   Browser   │    PWA      │     Mobile       │
│   Web App   │  Extension  │  (Install)  │   (Responsive)   │
└──────┬──────┴──────┬──────┴──────┬──────┴──────────────────┘
       │             │             │
       └─────────────┴─────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE LAYER                           │
├─────────────┬─────────────┬─────────────┬──────────────────┤
│    Auth     │  Database   │   Storage   │  Edge Functions  │
│  (Users)    │ (PostgreSQL)│  (Files)    │  (Deno Runtime)  │
└─────────────┴─────────────┴─────────────┴────────┬─────────┘
                                                   │
                                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI LAYER                               │
├─────────────────────────────────────────────────────────────┤
│              Lovable AI Gateway                             │
│         (Google Gemini 2.5 Flash)                          │
│   - Threat Detection    - Safety Chatbot                   │
│   - Content Analysis    - Pattern Recognition              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Expected Impact

### Individual Level

| Metric | Target | Current |
|--------|--------|---------|
| Threat exposure reduction | 95% | Active |
| Grooming detection rate | 99% | Active |
| User safety score improvement | +40% | Measuring |
| Response time to threats | <1s | Achieved |

### Community Level

- **Safety networks** connecting trusted adults
- **Shared learning** through community tips
- **Collective protection** via threat intelligence

### Societal Level

- **Reduced TFGBV incidents** through prevention
- **Digital literacy** improvement
- **Policy support** with anonymized data
- **Research contribution** to understanding digital violence

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Include tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Supabase](https://supabase.com)
- AI by [Google Gemini](https://ai.google)
- UI components by [shadcn/ui](https://ui.shadcn.com)

---

## 📞 Support

- **Email**: safelayerbrowser@gmail.com


---

*SafeLaylar - Because everyone deserves to feel safe online.* 🛡️
