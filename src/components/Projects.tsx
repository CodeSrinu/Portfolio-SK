import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Leaf, Cloud, Github, ExternalLink, Folder, Gamepad2, User, Target, Glasses, ArrowRight } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Project } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="text-primary" size={32} />,
  Leaf: <Leaf className="text-primary" size={32} />,
  Cloud: <Cloud className="text-primary" size={32} />,
  Folder: <Folder className="text-primary" size={32} />,
  Gamepad2: <Gamepad2 className="text-primary" size={32} />,
  User: <User className="text-primary" size={32} />,
  Target: <Target className="text-primary" size={32} />,
  Glasses: <Glasses className="text-primary" size={32} />,
};

const Projects: React.FC = () => {
  const { data, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-primary">Loading...</div>
        </div>
      </section>
    );
  }

  const { projects } = data;

  // Show only 3 projects on homepage
  const displayedProjects = projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Works</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects - Links to separate page */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 rounded-full text-primary hover:bg-primary/10 transition-colors"
            >
              View All Projects ({projects.length})
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) setIsFlipped(!isFlipped);
  };

  const shortDescription = project.description.split(' ').slice(0, 20).join(' ') + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: { duration: 0.5, delay: index * 0.1 },
      }}
      viewport={{ once: true }}
      className="w-full bg-background border border-primary/20 rounded-lg perspective-1000 overflow-hidden min-h-[16rem] transition-all duration-600 ease-in-out"
      onClick={handleClick}
      onHoverStart={() => !isMobile && setIsFlipped(true)}
      onHoverEnd={() => !isMobile && setIsFlipped(false)}
    >
      <motion.div
        className="w-full p-6"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 12,
          mass: 0.6,
          restDelta: 0.001,
        }}
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        {isFlipped ? (
          <div className="w-full flex flex-col items-center" style={{ transform: 'rotateY(180deg)' }}>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-text/70 mb-4">{project.description}</p>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-auto flex gap-3">
              {project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm bg-primary text-background px-3 py-1 rounded"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== '' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm border border-primary text-text px-3 py-1 rounded"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center">
            <div className="mb-4">{iconMap[project.icon] || <Folder className="text-primary" size={32} />}</div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-primary mb-2">{project.tagline}</p>
            <p className="text-sm text-text/70 line-clamp-2">{shortDescription}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Projects;