import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Shield, Target, Heart, Users, Award, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

import jimohImg from "@/assets/team/jimoh-habibullahi.jpg";
import elhamImg from "@/assets/team/elham-jemal.jpg";
import sherifahImg from "@/assets/team/abdulhameed-sherifah.jpg";
import awwalImg from "@/assets/team/awwal-abubakar.jpg";

const teamMembers = [
  {
    name: "Jimoh Habibullahi",
    role: "Co-Founder",
    specialization: "AI Engineer & Innovator",
    experience: [
      "Leads AI system development and innovation strategies",
      "Experienced in designing and deploying intelligent solutions across multiple sectors"
    ],
    image: jimohImg
  },
  {
    name: "Elham J. Jemal",
    role: "Product Researcher",
    specialization: "Outreach, Product Awareness & User Engagement",
    experience: [
      "Conducts user research and product-market fit analysis",
      "Builds strategies for user onboarding, engagement, and public outreach"
    ],
    image: elhamImg
  },
  {
    name: "Abdulhameed Sherifah",
    role: "Partnership Lead & Product Manager",
    specialization: "Product Evangelism & Partnerships",
    experience: [
      "Skilled in product lifecycle management and stakeholder coordination",
      "Drives product adoption, partnerships, and community engagement"
    ],
    image: sherifahImg
  },
  {
    name: "Awwal Abubakar Sadik",
    role: "Front-End Developer",
    specialization: "User Designer & Creative Developer",
    experience: [
      "Designs intuitive and visually appealing user interfaces",
      "Transforms product ideas into responsive, high-quality front-end implementations",
      "Enhances user experience through creative and functional digital design"
    ],
    image: awwalImg
  }
];

const values = [
  {
    icon: Shield,
    title: "Protection First",
    description: "We prioritize the safety of children and vulnerable individuals in every decision we make."
  },
  {
    icon: Heart,
    title: "Empathy & Care",
    description: "We understand the pain of online abuse and are committed to preventing it with compassion."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage cutting-edge AI technology to stay ahead of evolving online threats."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in building a global community united against Technology-Facilitated Gender-Based Violence."
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - SafeLaylar | Our Mission & Team</title>
        <meta name="description" content="Learn about SafeLaylar's mission to protect children from online threats. Meet our dedicated team fighting against Technology-Facilitated Gender-Based Violence." />
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

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                About SafeLaylar
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Fighting for a <span className="text-primary">Safer Digital World</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're on a mission to protect children and vulnerable individuals from 
                Technology-Facilitated Gender-Based Violence using AI-powered innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
                    <Target className="w-4 h-4" />
                    Our Mission
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                    Eliminating Online Abuse Through Technology
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    SafeLaylar was born from a deep understanding of the devastating impact that 
                    online abuse has on children and families worldwide. We witnessed firsthand how 
                    Technology-Facilitated Gender-Based Violence (TFGBV) destroys lives, and we 
                    decided to take action.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our AI-powered platform provides real-time protection against grooming, 
                    exploitation, harassment, and other forms of online threats. We believe every 
                    child deserves to explore the digital world safely.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Our Team
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Meet the <span className="text-primary">SafeLaylar Team</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A diverse, passionate team united by the mission to create a safer digital world for everyone.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                      <p className="text-xs text-muted-foreground mb-3">{member.specialization}</p>
                      <div className="text-left px-2">
                        {member.experience.map((exp, i) => (
                          <p key={i} className="text-xs text-muted-foreground mb-1 flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {exp}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  Our Impact
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Making a Difference
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "10K+", label: "Threats Blocked" },
                  { value: "5K+", label: "Protected Users" },
                  { value: "99%", label: "Detection Rate" },
                  { value: "24/7", label: "Real-time Protection" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border text-center"
                  >
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Join Us in Making the Internet Safer
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Together, we can protect children and create a digital world free from abuse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/install">
                  <Button size="lg">Get Protected Now</Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">Contact Us</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
