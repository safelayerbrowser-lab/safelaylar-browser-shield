import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is SafeLaylar and how does it work?",
    answer: "SafeLaylar is an AI-powered digital safety tool designed to protect users from Technology-Facilitated Gender-Based Violence (TFGBV). It uses advanced machine learning to detect toxic content, grooming patterns, deepfakes, romance scams, and other online threats in real-time across your social media and browsing activities."
  },
  {
    question: "Is my personal data safe with SafeLaylar?",
    answer: "Absolutely. Your privacy is our top priority. All threat detection happens locally on your device or through encrypted connections. We never store your personal messages, browsing history, or social media content on our servers. We only collect anonymized threat patterns to improve our detection algorithms."
  },
  {
    question: "What types of threats does SafeLaylar detect?",
    answer: "SafeLaylar detects a wide range of online threats including: toxic comments and cyberbullying, grooming behavior patterns, phishing attempts and scam links, deepfake images and videos, romance scams, spyware and malicious downloads, impersonation attempts, and explicit content."
  },
  {
    question: "How do I install the browser extension?",
    answer: "Visit our Install page and download the extension for your preferred browser (Chrome, Firefox, or Safari). Once installed, sign in with your SafeLaylar account and the extension will automatically start protecting you as you browse."
  },
  {
    question: "Can parents monitor their children's online safety?",
    answer: "Yes! SafeLaylar offers a Parental Dashboard feature that allows parents to connect with their children's accounts (with consent). Parents can view safety scores, threat summaries, and receive alerts about potential dangers while respecting the child's privacy."
  },
  {
    question: "What should I do if SafeLaylar detects a threat?",
    answer: "When a threat is detected, SafeLaylar will alert you immediately with details about the threat type and severity. For critical threats, we recommend blocking the source, reporting to the platform, and if necessary, contacting local authorities. Our Help Center provides detailed guidance for each threat type."
  },
  {
    question: "Is SafeLaylar free to use?",
    answer: "SafeLaylar offers a free tier with basic protection features. Premium plans are available for advanced features like real-time monitoring across multiple platforms, priority support, and family accounts. Check our pricing page for more details."
  },
  {
    question: "How accurate is the AI threat detection?",
    answer: "Our AI models are trained on extensive datasets and continuously improved with new threat patterns. While no system is 100% accurate, SafeLaylar achieves high detection rates with minimal false positives. Users can adjust sensitivity levels and provide feedback to improve accuracy."
  },
  {
    question: "Can I use SafeLaylar on multiple devices?",
    answer: "Yes! Your SafeLaylar account works across all your devices. Simply install the browser extension or PWA on each device and sign in with your account. Your settings and protection history sync automatically."
  },
  {
    question: "How do I report a false positive or missed threat?",
    answer: "You can report issues directly through the app by clicking the feedback button on any threat alert. Our team reviews all reports to improve detection accuracy. You can also reach out through our Contact page or help center."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SafeLaylar, online safety, and how we protect you from digital threats.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border/50 rounded-xl px-6 data-[state=open]:bg-primary/5"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
