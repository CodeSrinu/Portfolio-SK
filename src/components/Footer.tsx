import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer: React.FC = () => {
  const { data } = usePortfolioData();

  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-primary font-medium mb-2">"{data.profile.quote}"</p>
            <p className="text-text/70 text-sm">
              © {new Date().getFullYear()} {data.profile.name}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-text/70 hover:text-primary transition-colors text-sm">
              Blog
            </Link>
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-text/70 hover:text-primary transition-colors text-sm">
              GitHub
            </a>
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text/70 hover:text-primary transition-colors text-sm">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;