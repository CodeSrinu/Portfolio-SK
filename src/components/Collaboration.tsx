import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, Target, Star, Rocket, Globe, Leaf, Award } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="text-primary" size={40} />,
  Heart: <Heart className="text-primary" size={40} />,
  Zap: <Zap className="text-primary" size={40} />,
  Target: <Target className="text-primary" size={40} />,
  Star: <Star className="text-primary" size={40} />,
  Rocket: <Rocket className="text-primary" size={40} />,
  Globe: <Globe className="text-primary" size={40} />,
  Leaf: <Leaf className="text-primary" size={40} />,
  Award: <Award className="text-primary" size={40} />,
};

const Collaboration: React.FC = () => {
  const { data, loading } = usePortfolioData();

  if (loading) {
    return null;
  }

  const { collaboration } = data;

  // Don't render if not visible
  if (!collaboration?.visible) {
    return null;
  }

  return (
    <section id="collaboration" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            {iconMap[collaboration.icon] || <Users className="text-primary" size={40} />}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">{collaboration.title}</h2>

          <p className="text-xl text-text/90 mb-8">
            {collaboration.description}
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href={collaboration.buttonLink} className="primary-btn inline-block">
              {collaboration.buttonText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;