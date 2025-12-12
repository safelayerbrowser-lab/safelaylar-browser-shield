# SafeLaylar Browser Shield

## Your Digital Shield for a Safer Online World

SafeLaylar is an AI-powered browser protection tool designed to combat **Technology-Facilitated Gender-Based Violence (TFGBV)** and protect vulnerable users—especially children and women—from online threats including grooming, scams, toxic content, and digital exploitation.

![SafeLaylar Logo](public/pwa-512x512.png)

---

## 🎯 Problem Statement & Relevance to TFGBV

### The Problem

Technology-Facilitated Gender-Based Violence (TFGBV) is a growing global crisis:

- **1 in 3 women** globally have experienced online violence
- **Children are increasingly targeted** through social media, gaming platforms, and messaging apps
- **Grooming tactics** have become more sophisticated, with predators using AI and social engineering
- **Online scams and romance fraud** disproportionately target women and elderly users
- **Deepfakes and image-based abuse** are rising at alarming rates
- **Cyberbullying** leads to severe mental health consequences, especially among youth

### Why SafeLaylar Matters

SafeLaylar directly addresses TFGBV by providing:

1. **Real-time Threat Detection**: AI-powered scanning of content for grooming patterns, manipulation tactics, and harmful content
2. **Parental Controls**: Parents can monitor and protect children's online activities with consent-based oversight
3. **Romance Scam Alerts**: Detects common patterns used in romance fraud and catfishing
4. **Anti-Grooming Technology**: Identifies manipulation language and suspicious communication patterns
5. **Community Safety Network**: Connect trusted adults to help protect vulnerable users
6. **Educational Resources**: AI chatbot provides safety tips and guidance

---

## ✨ Features Walkthrough

### 🛡️ Core Protection Features

| Feature | Description |
|---------|-------------|
| **AI Content Filter** | Automatically detects and blocks toxic, harmful, or exploitative content |
| **Anti-Grooming Detection** | Identifies manipulation patterns and grooming language in real-time |
| **Romance Scam Alerts** | Warns users of potential romance fraud indicators |
| **Deepfake Detection** | Identifies AI-generated fake images and videos |
| **Spyware Protection** | Blocks malicious tracking and spyware attempts |

### 👨‍👩‍👧 Parental Dashboard

- **Child Account Linking**: Connect parent and child accounts with consent
- **Safety Score**: Real-time safety metrics for each protected user
- **Threat History**: View blocked threats and concerning activity
- **Weekly Reports**: Automated safety summaries delivered via email
- **Customizable Filters**: Adjust sensitivity levels per child

### 🌐 Browser Extensions

- **Chrome Extension**: Full protection for Chrome/Edge browsers
- **Firefox Add-on**: Complete Firefox integration
- **Safari Extension**: iOS and macOS Safari support

### 📱 Progressive Web App (PWA)

- **Install as App**: Works like a native app on desktop and mobile
- **Offline Access**: Core features work without internet
- **Auto-Updates**: Always up-to-date with latest protection
- **Cross-Platform**: Works on Windows, Mac, Linux, iOS, Android

### 🤖 Safety AI Chatbot

- Ask questions about online safety
- Get personalized safety tips
- Report concerns and get guidance
- Available 24/7

---

## 🚀 Running the Project

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or bun package manager

### Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd safelaylar-browser-shield

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and concurrent features |
| **TypeScript** | Type-safe JavaScript for reliability |
| **Vite** | Fast build tool with hot module replacement |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Smooth animations and transitions |
| **shadcn/ui** | Accessible, customizable UI components |
| **React Router** | Client-side routing |
| **TanStack Query** | Server state management |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database with real-time subscriptions |
| **Supabase Auth** | User authentication and authorization |
| **Supabase Edge Functions** | Serverless functions for AI processing |
| **Row Level Security** | Database-level access control |

### PWA & Browser Extensions
| Technology | Purpose |
|------------|---------|
| **vite-plugin-pwa** | Service worker and manifest generation |
| **Workbox** | Advanced caching strategies |
| **Chrome Extensions API** | Chrome/Edge browser extension |
| **WebExtensions API** | Firefox add-on support |

### AI & Safety
| Technology | Purpose |
|------------|---------|
| **OpenAI GPT** | Content analysis and chatbot responses |
| **Custom ML Models** | Grooming pattern detection |
| **Content Classification** | Threat categorization |

---

## 📈 Expected Impact

### Individual Level
- **Reduced exposure** to harmful content by up to 95%
- **Early warning** system for grooming attempts
- **Empowered parents** with visibility into children's online safety
- **Increased confidence** in navigating digital spaces

### Community Level
- **Safety networks** connecting trusted adults with vulnerable users
- **Shared learning** through community safety tips
- **Collective protection** through aggregated threat intelligence

### Societal Level
- **Reduced TFGBV incidents** through prevention and early detection
- **Digital literacy** improvement through educational resources
- **Policy support** with anonymized data on online threats
- **Research contribution** to understanding digital violence patterns

### Measurable Outcomes
| Metric | Target |
|--------|--------|
| Threats blocked per user/month | 50+ |
| Grooming attempts detected | 99% accuracy |
| User safety score improvement | +40% within 30 days |
| Parental engagement rate | 80%+ weekly active |

---

## 🌍 Browser Compatibility

| Browser | Desktop | Mobile | Extension |
|---------|---------|--------|-----------|
| Chrome | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ (iOS 16.4+) | ✅ |
| Samsung Internet | - | ✅ | - |
| Opera | ✅ | ✅ | - |

---

## 📄 License

This project is built with ❤️ to combat technology-facilitated gender-based violence and protect vulnerable communities online.

---

## 🤝 Contributing

We welcome contributions from developers, researchers, and advocates working to make the internet safer. Please see our contributing guidelines for more information.

---

## 📞 Support

- **Documentation**: [docs.safelaylar.com](https://docs.safelaylar.com)
- **Email**: support@safelaylar.com
- **Community**: Join our Discord for discussions and support

---

*SafeLaylar - Because everyone deserves to feel safe online.*
