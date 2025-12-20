import { Shield, Twitter, Facebook, Instagram, Linkedin, Youtube, Github } from "lucide-react";
import { Link } from "react-router-dom";
import SocialShare from "./SocialShare";

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/safelaylar", color: "hover:text-[#1DA1F2]" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/safelaylar", color: "hover:text-[#4267B2]" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/safelaylar", color: "hover:text-[#E4405F]" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/safelaylar", color: "hover:text-[#0077B5]" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@safelaylar", color: "hover:text-[#FF0000]" },
  { name: "GitHub", icon: Github, href: "https://github.com/safelaylar", color: "hover:text-foreground" },
];

const Footer = () => {
  return (
    <footer className="py-16 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SafeLaylar</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
                AI-powered protection for a safer digital life. Built with privacy in mind, 
                designed for everyone.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Product links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Download", href: "/install", isRouter: true },
                  { label: "Dashboard", href: "/dashboard", isRouter: true },
                  { label: "About Us", href: "/about", isRouter: true },
                ].map((link, i) => (
                  <li key={i}>
                    {link.isRouter ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "/help", isRouter: true },
                  { label: "Safety Tips", href: "/safety-tips", isRouter: true },
                  { label: "Privacy Policy", href: "/privacy", isRouter: true },
                  { label: "Contact", href: "/contact", isRouter: true },
                ].map((link, i) => (
                  <li key={i}>
                    {link.isRouter ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Share Section */}
          <div className="py-6 border-t border-b border-border/50 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Help spread digital safety awareness - share SafeLaylar with others
              </p>
              <SocialShare title="SafeLaylar - AI-Powered Digital Safety Protection" />
            </div>
          </div>
          
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 SafeLaylar. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
