import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold gradient-text">SK</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </>
          ) : (
            <Link to="/" className="text-text hover:text-primary transition-colors duration-300">
              Home
            </Link>
          )}
          <Link
            to="/blog"
            className="text-text hover:text-primary transition-colors duration-300"
          >
            Blog
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-text focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md shadow-lg ${isOpen ? 'block' : 'hidden'
          }`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text hover:text-primary transition-colors duration-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {!isHomePage && (
            <Link
              to="/"
              className="text-text hover:text-primary transition-colors duration-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          )}
          <Link
            to="/blog"
            className="text-text hover:text-primary transition-colors duration-300 py-2"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;