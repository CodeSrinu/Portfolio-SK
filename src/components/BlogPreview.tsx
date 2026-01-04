import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';

const BlogPreview: React.FC = () => {
    const { posts, loading, fetchPosts } = useBlog();

    useEffect(() => {
        fetchPosts(true); // Fetch published posts only
    }, []);

    // Show only latest 3 posts
    const latestPosts = posts.slice(0, 3);

    if (loading) {
        return null;
    }

    // Don't render if no posts
    if (latestPosts.length === 0) {
        return null;
    }

    return (
        <section id="blog" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Latest <span className="text-primary">Blogs</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
                    <p className="text-text/70 max-w-xl mx-auto">
                        Thoughts on technology, entrepreneurship, and my journey.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {latestPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#0f1a1b] rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-1"
                        >
                            {post.coverImage && (
                                <Link to={`/blog/${post.slug}`}>
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
                                    />
                                </Link>
                            )}
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-xs text-text/50 mb-2">
                                    <Calendar size={12} />
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <Link to={`/blog/${post.slug}`}>
                                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </Link>
                                <p className="text-text/60 text-sm line-clamp-2 mb-3">
                                    {post.excerpt}
                                </p>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    Read more <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 rounded-full text-primary hover:bg-primary/10 transition-colors"
                    >
                        View All Posts <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPreview;
