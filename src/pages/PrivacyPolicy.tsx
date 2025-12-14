import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 14, 2025</p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SafeLaylar ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our browser extension, web application, and related services (collectively, the "Service").
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We built SafeLaylar with privacy as a core principle. We believe you shouldn't have to sacrifice your privacy to stay safe online.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Account information (email address, password)</li>
                  <li>Profile information (name, preferences)</li>
                  <li>Feedback and support communications</li>
                  <li>Family account connections (with explicit consent)</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Threat detection data (analyzed locally when possible)</li>
                  <li>Usage statistics (anonymized and aggregated)</li>
                  <li>Device and browser information</li>
                  <li>Error logs for troubleshooting</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.3 Information We Do NOT Collect</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Browsing history or visited URLs</li>
                  <li>Personal messages or communications content</li>
                  <li>Passwords or financial information</li>
                  <li>Data from websites you visit (unless you request a scan)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To provide and improve our threat detection services</li>
                  <li>To send safety alerts and notifications (with your consent)</li>
                  <li>To personalize your protection settings</li>
                  <li>To generate aggregated safety reports for parents/guardians</li>
                  <li>To improve our AI models (using anonymized data only)</li>
                  <li>To respond to your support requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Secure HTTPS connections for all communications</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication measures</li>
                  <li>Data anonymization and pseudonymization where possible</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do NOT sell your personal information. We may share data only in these circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the safety of users (e.g., reporting imminent threats to authorities)</li>
                  <li>With service providers who assist our operations (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SafeLaylar is designed to protect children and complies with applicable children's privacy laws. Parental consent is required for users under 13. Parents can review, modify, or delete their child's data at any time through the parental dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of non-essential data collection</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your data only as long as necessary to provide our services. Threat logs are automatically deleted after 90 days. Account data is deleted within 30 days of account closure. You can request immediate deletion at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data may be processed in countries with different privacy laws. We ensure adequate protection through standard contractual clauses and compliance with applicable data protection regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically. We will notify you of significant changes via email or through the Service. Continued use after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy-related questions or to exercise your rights:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground mt-4">
                  <li>Email: privacy@safelaylar.com</li>
                  <li>Contact form: <Link to="/contact" className="text-primary hover:underline">Contact Page</Link></li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
