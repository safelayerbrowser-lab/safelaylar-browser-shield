import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

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
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                AI-powered protection for a safer digital life. Built with privacy in mind, 
                designed for everyone.
              </p>
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
          
          {/* Bottom */}
          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
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