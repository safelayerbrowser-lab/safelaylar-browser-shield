import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Settings, 
  AlertTriangle, 
  Users,
  Smartphone,
  Globe,
  Lock,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const faqs = [
  {
    category: "Getting Started",
    icon: Download,
    questions: [
      {
        q: "How do I install SafeLaylar?",
        a: "You can install SafeLaylar as a Progressive Web App (PWA) by clicking the 'Install App' button on our homepage, or download our browser extension from the Chrome Web Store, Firefox Add-ons, or Safari Extensions."
      },
      {
        q: "Is SafeLaylar free to use?",
        a: "Yes! SafeLaylar offers a free tier with essential protection features. Premium features are available for advanced users and families who need comprehensive monitoring."
      },
      {
        q: "What devices does SafeLaylar support?",
        a: "SafeLaylar works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. Our PWA can be installed on Windows, macOS, Linux, iOS, and Android devices."
      }
    ]
  },
  {
    category: "Protection Features",
    icon: Shield,
    questions: [
      {
        q: "How does real-time threat detection work?",
        a: "Our AI-powered system analyzes web content, messages, and links in real-time, identifying potential threats like phishing attempts, scams, harassment, and predatory behavior before they can cause harm."
      },
      {
        q: "What types of threats does SafeLaylar detect?",
        a: "We detect 8 categories of threats: online grooming, phishing, romance scams, malware, harassment, explicit content, deepfakes, and spyware. Our AI continuously learns to identify new threat patterns."
      },
      {
        q: "Can SafeLaylar protect my children online?",
        a: "Yes! SafeLaylar offers parental monitoring features including activity reports, content filtering, and real-time alerts when potential threats are detected on your child's device."
      }
    ]
  },
  {
    category: "Settings & Configuration",
    icon: Settings,
    questions: [
      {
        q: "How do I customize my protection settings?",
        a: "Go to your Dashboard > Settings to customize protection levels, notification preferences, and filter sensitivity. You can enable or disable specific protection features based on your needs."
      },
      {
        q: "Can I whitelist trusted websites?",
        a: "Yes, you can add trusted websites to your safe list through the browser extension settings or dashboard. These sites will bypass threat scanning while still maintaining basic protection."
      },
      {
        q: "How do I set up family monitoring?",
        a: "Navigate to Dashboard > Family Safety to invite family members, set up child accounts, and configure monitoring preferences. Parents receive alerts when threats are detected on linked accounts."
      }
    ]
  },
  {
    category: "Troubleshooting",
    icon: AlertTriangle,
    questions: [
      {
        q: "Why is the extension not working on some sites?",
        a: "Some websites have strict security policies that prevent extensions from running. Additionally, internal browser pages (chrome://, about:) and some financial/banking sites may block extensions for security."
      },
      {
        q: "The scanner shows 'offline' status. What should I do?",
        a: "Check your internet connection and ensure the extension has the necessary permissions. Try refreshing the page or restarting your browser. If issues persist, reinstall the extension."
      },
      {
        q: "How do I report a false positive?",
        a: "If SafeLaylar incorrectly flags safe content, click the 'Report False Positive' button in the warning popup or contact us through the feedback form. This helps improve our AI accuracy."
      }
    ]
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SafeLaylar</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Help Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Find answers to common questions and learn how to get the most out of SafeLaylar
          </motion.p>
          
          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Download, label: "Installation", href: "/install" },
              { icon: Shield, label: "Protection", href: "/protection" },
              { icon: Users, label: "Dashboard", href: "/dashboard" },
              { icon: MessageCircle, label: "Contact Us", href: "/contact" },
            ].map((item, i) => (
              <Link key={i} to={item.href}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="font-medium text-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              </div>
              
              <div className="space-y-3">
                {category.questions.map((item, i) => {
                  const id = `${categoryIndex}-${i}`;
                  const isOpen = openItems.includes(id);
                  
                  return (
                    <Card key={i} className="overflow-hidden">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <CardContent className="pt-0 pb-4 px-4">
                          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Our support team is here to assist you</p>
          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
