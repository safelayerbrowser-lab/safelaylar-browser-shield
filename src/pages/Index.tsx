import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import HowItWorks from "@/components/HowItWorks";
import Download from "@/components/Download";
import Footer from "@/components/Footer";
import SafetyChatbot from "@/components/SafetyChatbot";
import ImpactGallery from "@/components/ImpactGallery";
import InstallBanner from "@/components/InstallBanner";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <ImpactGallery />
      <Testimonials />
      <FAQ />
      <InteractiveDemo />
      <HowItWorks />
      <Download />
      <Footer />
      <SafetyChatbot />
      <InstallBanner />
    </div>
  );
};

export default Index;