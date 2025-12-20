import { Twitter, Facebook, Linkedin, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareProps {
  title?: string;
  url?: string;
  className?: string;
}

const SocialShare = ({ 
  title = "SafeLaylar - AI-Powered Digital Safety", 
  url = typeof window !== 'undefined' ? window.location.href : 'https://safelaylar.com',
  className = ""
}: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#4267B2]/10 hover:text-[#4267B2]"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          className={`rounded-full transition-colors ${link.color}`}
          onClick={() => window.open(link.url, '_blank', 'width=600,height=400')}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-primary/10 hover:text-primary"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </Button>
      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 hover:text-primary"
          onClick={handleNativeShare}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default SocialShare;
