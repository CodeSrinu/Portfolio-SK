import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Check, Clock } from 'lucide-react';

const Startup: React.FC = () => {
  return (
    <section id="startup" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Startup</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
          >
            <div className="flex justify-center mb-6">
              <Rocket className="text-primary" size={48} />
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-4 gradient-text">Farm Service Platform</h3>
            
            <p className="text-text/90 text-center mb-8">
              A tech-driven solution aimed at revolutionizing agricultural services in Andhra Pradesh. Enabling farmers to rent equipment, hire labor, and access essential services like drone fertilization, harvesting, seed procurement, and organic mineral supply.
            </p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-primary">Development Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check className="text-primary" size={16} />
                  </div>
                  <div>
                    <h5 className="font-medium">WhatsApp Bot Launch</h5>
                    <p className="text-sm text-text/70">February 2025 - Completed the WhatsApp bot for service booking</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Clock className="text-primary" size={16} />
                  </div>
                  <div>
                    <h5 className="font-medium">Mobile App Development</h5>
                    <p className="text-sm text-text/70">In Progress - Expected completion by mid-2025</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Clock className="text-primary" size={16} />
                  </div>
                  <div>
                    <h5 className="font-medium">Toll-Free Service</h5>
                    <p className="text-sm text-text/70">Planning Phase - Expected launch by mid-2025</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">Key Features</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Multi-platform accessibility (WhatsApp, mobile app, toll-free)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Real-time service tracking and automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Comprehensive agricultural services (equipment rental, labor, drone fertilization)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Focus on reducing operational burdens for farmers</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Startup;