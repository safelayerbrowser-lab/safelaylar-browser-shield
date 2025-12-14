import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  ArrowLeft,
  Lock,
  Eye,
  MessageCircle,
  UserX,
  AlertTriangle,
  Heart,
  Camera,
  Share2,
  Smartphone,
  Globe,
  CreditCard,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const safetyCategories = [
  {
    title: "Protect Your Privacy",
    icon: Lock,
    color: "text-blue-500",
    tips: [
      "Use strong, unique passwords for each account",
      "Enable two-factor authentication (2FA) everywhere",
      "Review and limit app permissions regularly",
      "Be cautious about what personal info you share online",
      "Use a password manager to keep credentials secure"
    ]
  },
  {
    title: "Recognize Online Grooming",
    icon: UserX,
    color: "text-red-500",
    tips: [
      "Be wary of strangers who seem 'too perfect' or overly interested",
      "Watch for attempts to isolate you from friends/family",
      "Don't share personal photos with people you haven't met",
      "Trust your instincts—if something feels wrong, it probably is",
      "Report suspicious behavior immediately"
    ]
  },
  {
    title: "Spot Phishing Attempts",
    icon: AlertTriangle,
    color: "text-yellow-500",
    tips: [
      "Check sender email addresses carefully for typos",
      "Never click links in suspicious emails or messages",
      "Legitimate companies won't ask for passwords via email",
      "Look for HTTPS and padlock icon on websites",
      "When in doubt, contact the company directly"
    ]
  },
  {
    title: "Avoid Romance Scams",
    icon: Heart,
    color: "text-pink-500",
    tips: [
      "Be skeptical of people who profess love quickly",
      "Never send money to someone you haven't met in person",
      "Do a reverse image search on profile photos",
      "Watch for inconsistencies in their stories",
      "Video chat before trusting someone online"
    ]
  },
  {
    title: "Safe Social Media Use",
    icon: Share2,
    color: "text-purple-500",
    tips: [
      "Set profiles to private and review who follows you",
      "Think before posting—content can be permanent",
      "Don't share your location in real-time",
      "Be selective about friend/follow requests",
      "Report harassment and block abusive accounts"
    ]
  },
  {
    title: "Protect Against Deepfakes",
    icon: Camera,
    color: "text-orange-500",
    tips: [
      "Be cautious of unexpected video calls from known contacts",
      "Look for visual glitches, odd blinking, or lip sync issues",
      "Verify urgent requests through a different channel",
      "Don't share sensitive info on video without verification",
      "Report suspected deepfake content immediately"
    ]
  },
  {
    title: "Mobile Device Security",
    icon: Smartphone,
    color: "text-green-500",
    tips: [
      "Keep your device OS and apps updated",
      "Only download apps from official stores",
      "Review app permissions before installing",
      "Use screen lock with strong PIN or biometrics",
      "Enable remote wipe in case of theft or loss"
    ]
  },
  {
    title: "Safe Online Shopping",
    icon: CreditCard,
    color: "text-cyan-500",
    tips: [
      "Shop only on secure, reputable websites",
      "Use credit cards or secure payment methods",
      "Be wary of deals that seem too good to be true",
      "Check reviews and seller ratings before buying",
      "Monitor bank statements for unauthorized charges"
    ]
  }
];

const emergencyContacts = [
  { name: "National Cyber Crime Helpline", number: "1930" },
  { name: "Women Helpline", number: "181" },
  { name: "Child Helpline", number: "1098" },
  { name: "Police Emergency", number: "100" }
];

const SafetyTips = () => {
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
            Online Safety Tips
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Essential guidelines to protect yourself and your loved ones from online threats
          </motion.p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {safetyCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Emergency Contacts</h2>
            <p className="text-muted-foreground">If you're in immediate danger, contact these helplines</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {emergencyContacts.map((contact, i) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center border-destructive/20">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-2">{contact.name}</p>
                    <p className="text-2xl font-bold text-destructive">{contact.number}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get Real-Time Protection</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Install SafeLaylar to automatically detect and block threats before they reach you
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link to="/install">Install SafeLaylar</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/protection">Try Scanner</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyTips;
