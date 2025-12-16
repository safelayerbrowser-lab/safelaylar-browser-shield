import { Helmet } from "react-helmet";
import { Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SafeLaylar</title>
        <meta name="description" content="Read SafeLaylar's Terms of Service. Understand your rights and responsibilities when using our child safety protection platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SafeLaylar</span>
              </Link>
              <Link to="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
                  <p className="text-muted-foreground">Last updated: December 16, 2025</p>
                </div>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="p-6 rounded-2xl bg-card border border-border mb-8">
                  <p className="text-muted-foreground">
                    Please read these Terms of Service carefully before using SafeLaylar. By accessing or using our service, 
                    you agree to be bound by these terms.
                  </p>
                </div>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    By accessing or using SafeLaylar's services, including our website, browser extensions, mobile applications, 
                    and any related services (collectively, the "Service"), you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations.
                  </p>
                  <p className="text-muted-foreground">
                    If you do not agree with any part of these terms, you may not access the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                  <p className="text-muted-foreground mb-4">
                    SafeLaylar provides AI-powered online safety protection services designed to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Detect and block harmful content in real-time</li>
                    <li>Identify potential grooming, phishing, and scam attempts</li>
                    <li>Protect against Technology-Facilitated Gender-Based Violence (TFGBV)</li>
                    <li>Provide parental monitoring and control features</li>
                    <li>Alert users to potential online threats</li>
                    <li>Offer educational resources about online safety</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                  <h3 className="text-xl font-medium text-foreground mb-3">3.1 Account Creation</h3>
                  <p className="text-muted-foreground mb-4">
                    To access certain features of the Service, you may be required to create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information as necessary</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>

                  <h3 className="text-xl font-medium text-foreground mb-3">3.2 Age Requirements</h3>
                  <p className="text-muted-foreground mb-4">
                    You must be at least 13 years old to create an account. Users under 18 require parental or guardian 
                    consent and supervision. Parents/guardians are responsible for monitoring their children's use of 
                    the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
                  <p className="text-muted-foreground mb-4">You agree NOT to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Attempt to bypass or disable any security features</li>
                    <li>Reverse engineer, decompile, or disassemble the Service</li>
                    <li>Use the Service to harass, abuse, or harm others</li>
                    <li>Upload malicious code, viruses, or harmful content</li>
                    <li>Impersonate any person or entity</li>
                    <li>Interfere with or disrupt the Service's operation</li>
                    <li>Collect data about other users without consent</li>
                    <li>Use automated means to access the Service without permission</li>
                    <li>Resell or redistribute the Service without authorization</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Privacy and Data Protection</h2>
                  <p className="text-muted-foreground mb-4">
                    Your privacy is important to us. Our collection and use of personal information is governed by our 
                    <Link to="/privacy" className="text-primary hover:underline"> Privacy Policy</Link>, which is 
                    incorporated into these Terms by reference.
                  </p>
                  <p className="text-muted-foreground">
                    By using the Service, you consent to the collection and use of your information as described in 
                    our Privacy Policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
                  <h3 className="text-xl font-medium text-foreground mb-3">6.1 Our Rights</h3>
                  <p className="text-muted-foreground mb-4">
                    The Service and its original content, features, and functionality are owned by SafeLaylar and are 
                    protected by international copyright, trademark, patent, trade secret, and other intellectual 
                    property laws.
                  </p>

                  <h3 className="text-xl font-medium text-foreground mb-3">6.2 License Grant</h3>
                  <p className="text-muted-foreground mb-4">
                    Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license 
                    to use the Service for personal, non-commercial purposes.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Subscriptions and Payments</h2>
                  <h3 className="text-xl font-medium text-foreground mb-3">7.1 Free and Premium Services</h3>
                  <p className="text-muted-foreground mb-4">
                    SafeLaylar offers both free and premium subscription tiers. Premium features require payment as 
                    described on our pricing page.
                  </p>

                  <h3 className="text-xl font-medium text-foreground mb-3">7.2 Billing</h3>
                  <p className="text-muted-foreground mb-4">
                    Premium subscriptions are billed in advance on a monthly or annual basis. You authorize us to 
                    charge your payment method for all fees associated with your subscription.
                  </p>

                  <h3 className="text-xl font-medium text-foreground mb-3">7.3 Cancellation</h3>
                  <p className="text-muted-foreground mb-4">
                    You may cancel your subscription at any time. Upon cancellation, you will retain access to premium 
                    features until the end of your current billing period.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground mb-4">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
                    OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Implied warranties of merchantability and fitness for a particular purpose</li>
                    <li>Non-infringement of third-party rights</li>
                    <li>Uninterrupted, timely, secure, or error-free service</li>
                    <li>Accuracy or reliability of any information obtained through the Service</li>
                    <li>100% detection of all threats or harmful content</li>
                  </ul>
                  <p className="text-muted-foreground">
                    While we strive for comprehensive protection, no security solution can guarantee complete safety. 
                    Users should remain vigilant and practice safe online habits.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                  <p className="text-muted-foreground mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAFELAYLAR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                    SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                    DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                  <p className="text-muted-foreground">
                    Our total liability for any claims arising from or related to the Service shall not exceed the 
                    amount you paid us in the twelve (12) months preceding the claim.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
                  <p className="text-muted-foreground">
                    You agree to indemnify and hold harmless SafeLaylar and its officers, directors, employees, and 
                    agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising 
                    from your use of the Service or violation of these Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modifications to Service</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with 
                    or without notice. We shall not be liable to you or any third party for any modification, 
                    suspension, or discontinuation of the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    We may revise these Terms at any time by posting the updated terms on our website. Your continued 
                    use of the Service after any changes constitutes acceptance of the new Terms.
                  </p>
                  <p className="text-muted-foreground">
                    We will notify users of material changes via email or through the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">13. Termination</h2>
                  <p className="text-muted-foreground mb-4">
                    We may terminate or suspend your account and access to the Service immediately, without prior 
                    notice or liability, for any reason, including but not limited to breach of these Terms.
                  </p>
                  <p className="text-muted-foreground">
                    Upon termination, your right to use the Service will cease immediately. Provisions of these Terms 
                    that by their nature should survive termination shall survive.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">14. Governing Law</h2>
                  <p className="text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with applicable laws, without regard 
                    to conflict of law principles. Any disputes arising from these Terms or the Service shall be 
                    resolved through binding arbitration or in courts of competent jurisdiction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">15. Severability</h2>
                  <p className="text-muted-foreground">
                    If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
                    limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain 
                    in full force and effect.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact Information</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <p className="text-foreground font-medium mb-2">SafeLaylar Legal Team</p>
                    <p className="text-muted-foreground">Email: legal@safelaylar.com</p>
                    <p className="text-muted-foreground">Website: <Link to="/contact" className="text-primary hover:underline">Contact Page</Link></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
