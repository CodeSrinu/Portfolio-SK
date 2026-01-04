import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Project } from '../types';
import DynamicIcon from '../components/DynamicIcon';

const AllProjects: React.FC = () => {
    const { data, loading } = usePortfolioData();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        );
    }

    const { projects } = data;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
                    <p className="text-text/70 max-w-xl mx-auto">
                        A collection of my work in Unity game development, physics systems, and more.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
                        <ArrowLeft size={16} />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                y: { duration: 0.5, delay: index * 0.1 },
            }}
            className="w-full bg-[#0f1a1b] border border-primary/20 rounded-xl overflow-hidden min-h-[16rem] transition-all duration-600 ease-in-out hover:border-primary/40"
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
                style={{ transformStyle: 'preserve-3d' }}
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
                        <div className="mt-auto flex gap-3 relative z-20">
                            {project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '' && (
                                <a
                                    href={project.githubUrl.startsWith('http') ? project.githubUrl : `https://${project.githubUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm bg-primary text-background px-3 py-1 rounded hover:bg-primary/90 transition-colors cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={16} />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== '' && (
                                <a
                                    href={project.demoUrl.startsWith('http') ? project.demoUrl : `https://${project.demoUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm border border-primary text-text px-3 py-1 rounded hover:bg-primary/10 transition-colors cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={16} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <DynamicIcon name={project.icon} className="text-primary" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-primary mb-2">{project.tagline}</p>
                        <p className="text-sm text-text/70 line-clamp-2">{shortDescription}</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AllProjects;
