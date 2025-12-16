import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const existingReviews = [
  {
    id: 1,
    name: "Amina Bello",
    role: "Parent of 2",
    rating: 5,
    content: "SafeLaylar has given me peace of mind. I can finally let my children browse the internet without constantly worrying. The real-time alerts are incredibly helpful!",
    avatar: null
  },
  {
    id: 2,
    name: "Dr. Fatima Ibrahim",
    role: "Child Psychologist",
    rating: 5,
    content: "As a professional working with children affected by online abuse, I recommend SafeLaylar to all parents. It's the most comprehensive protection tool I've seen.",
    avatar: null
  },
  {
    id: 3,
    name: "Emmanuel Okonkwo",
    role: "School Administrator",
    rating: 5,
    content: "We've implemented SafeLaylar across our school network. The AI-powered threat detection has blocked numerous harmful content attempts. Essential for educational institutions.",
    avatar: null
  },
  {
    id: 4,
    name: "Sarah Mensah",
    role: "Digital Safety Advocate",
    rating: 5,
    content: "Finally, a solution that addresses Technology-Facilitated Gender-Based Violence effectively. The grooming detection feature is groundbreaking.",
    avatar: null
  },
  {
    id: 5,
    name: "Yusuf Adeyemi",
    role: "IT Professional",
    rating: 5,
    content: "The browser extension works flawlessly. Real-time scanning without slowing down my browsing experience. Highly technical yet user-friendly.",
    avatar: null
  },
  {
    id: 6,
    name: "Grace Nnamdi",
    role: "Mother & Educator",
    rating: 5,
    content: "My daughter was being targeted by online predators. SafeLaylar detected and blocked the threat before any harm was done. Forever grateful!",
    avatar: null
  }
];

const Testimonials = () => {
  const [reviews, setReviews] = useState(existingReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", content: "", rating: 5 });
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and review.",
        variant: "destructive"
      });
      return;
    }

    const review = {
      id: reviews.length + 1,
      ...newReview,
      avatar: null
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: "", role: "", content: "", rating: 5 });
    setShowForm(false);
    toast({
      title: "Thank you!",
      description: "Your review has been submitted successfully."
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              User Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Trusted by <span className="text-primary">Families Worldwide</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how SafeLaylar is making a difference in protecting children and families online.
            </p>
          </motion.div>

          {/* Submit Review Button */}
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2"
              variant={showForm ? "outline" : "default"}
            >
              {showForm ? "Cancel" : "Share Your Story"}
            </Button>
          </div>

          {/* Review Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <form onSubmit={handleSubmitReview} className="max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Share Your Experience</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Role</label>
                    <Input
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="Parent, Teacher, etc."
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Your Review *</label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Share how SafeLaylar has helped protect you or your family..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Submit Review
                </Button>
              </form>
            </motion.div>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    {review.role && (
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
