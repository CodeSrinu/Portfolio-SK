import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { TimelineItem as TimelineItemType } from '../types';
import DynamicIcon from './DynamicIcon';

const Timeline: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType | null>(null);
  const { data, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="timeline" className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="text-primary">Loading...</div>
        </div>
      </section>
    );
  }

  const { timeline: timelineItems } = data;

  return (
    <section id="timeline" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey So Far</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="timeline-line"></div>

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex mb-12 relative"
            >
              <div
                className="timeline-node cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <DynamicIcon name={item.icon} size={20} />
              </div>
              <div className="ml-8">
                <span className="text-sm text-primary font-medium">{item.date}</span>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-text/70">{item.shortDescription}</p>
                <button
                  className="text-primary mt-2 text-sm hover:underline"
                  onClick={() => setSelectedItem(item)}
                >
                  Read more
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal ${selectedItem ? 'active' : ''}`}>
        <div className="modal-content">
          {selectedItem && (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-primary font-medium">{selectedItem.date}</span>
                  <h3 className="text-2xl font-semibold">{selectedItem.title}</h3>
                </div>
                <button
                  title='btn'
                  className="text-text/70 hover:text-primary"
                  onClick={() => setSelectedItem(null)}
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-text/90 mb-4">{selectedItem.fullDescription}</p>
              <div className="flex justify-end">
                <button
                  className="outline-btn py-2 px-4"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
