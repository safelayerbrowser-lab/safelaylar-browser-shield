import { motion } from "framer-motion";
import communityWorkshop from "@/assets/community-workshop.jpg";
import childSafetyAdvocacy from "@/assets/child-safety-advocacy.jpg";
import digitalRightsWorkshop from "@/assets/digital-rights-workshop.jpg";

const images = [
  {
    src: communityWorkshop,
    alt: "Community workshop on digital safety awareness",
    caption: "Empowering communities with digital safety knowledge"
  },
  {
    src: childSafetyAdvocacy,
    alt: "Children holding signs promoting childhood safety and protection from exploitation",
    caption: "Every child deserves a safe childhood online"
  },
  {
    src: digitalRightsWorkshop,
    alt: "Digital rights and online safety workshop in a classroom setting",
    caption: "Educating youth on digital rights and online safety"
  },
];

const ImpactGallery = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Making Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SafeLaylar is part of a global movement to combat technology-facilitated gender-based violence and protect vulnerable communities online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm text-background/90 font-medium">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactGallery;
