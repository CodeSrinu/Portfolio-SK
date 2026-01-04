import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, Target, Star, Rocket, Globe, Leaf, Award, Briefcase, Trophy, Flag, Gift } from 'lucide-react';
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
    Briefcase: <Briefcase className="text-primary" size={40} />,
    Trophy: <Trophy className="text-primary" size={40} />,
    Flag: <Flag className="text-primary" size={40} />,
    Gift: <Gift className="text-primary" size={40} />,
};

const CustomSections: React.FC = () => {
    const { data, loading } = usePortfolioData();

    if (loading) {
        return null;
    }

    const { customSections } = data;

    // Don't render if no custom sections or all hidden
    if (!customSections || customSections.length === 0) {
        return null;
    }

    const visibleSections = customSections.filter(s => s.visible).sort((a, b) => a.order - b.order);

    if (visibleSections.length === 0) {
        return null;
    }

    return (
        <>
            {visibleSections.map((section) => (
                <section key={section.id} id={section.id} className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <div className="flex justify-center mb-6">
                                {iconMap[section.icon] || <Star className="text-primary" size={40} />}
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{section.title}</h2>

                            <p className="text-xl text-text/90 mb-8">
                                {section.description}
                            </p>

                            {section.buttonText && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a href={section.buttonLink || '#contact'} className="primary-btn inline-block">
                                        {section.buttonText}
                                    </a>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </section>
            ))}
        </>
    );
};

export default CustomSections;
