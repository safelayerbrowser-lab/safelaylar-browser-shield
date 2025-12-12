import { Download, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface InstallButtonProps {
  variant?: "default" | "hero" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
  className?: string;
}

const InstallButton = ({ 
  variant = "default", 
  size = "default",
  showIcon = true,
  className = ""
}: InstallButtonProps) => {
  const { isInstallable, isInstalled, isIOS, promptInstall, canPrompt } = usePWAInstall();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isInstalled) {
      toast({
        title: "Already installed!",
        description: "SafeLaylar is already installed on your device.",
      });
      return;
    }

    if (canPrompt) {
      const result = await promptInstall();
      if (result.success) {
        toast({
          title: "Installing SafeLaylar",
          description: "The app is being installed to your device.",
        });
      }
    } else {
      // Navigate to install page for instructions
      navigate("/install");
    }
  };

  const getButtonContent = () => {
    if (isInstalled) {
      return (
        <>
          {showIcon && <Check className="mr-2 h-4 w-4" />}
          App Installed
        </>
      );
    }
    
    if (isIOS) {
      return (
        <>
          {showIcon && <Smartphone className="mr-2 h-4 w-4" />}
          Install App
        </>
      );
    }

    return (
      <>
        {showIcon && <Download className="mr-2 h-4 w-4" />}
        Install App
      </>
    );
  };

  const buttonVariants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    hero: "bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-lg hover:shadow-xl",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={`${buttonVariants[variant]} transition-all ${className}`}
      disabled={isInstalled}
    >
      {getButtonContent()}
    </Button>
  );
};

export default InstallButton;
