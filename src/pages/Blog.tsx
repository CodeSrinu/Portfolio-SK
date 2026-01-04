import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlog } from '../hooks/useBlog';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
    const { posts, loading, fetchPosts } = useBlog();

    // Refresh posts when page loads
    useEffect(() => {
        fetchPosts(true); // true = published only
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
                    <p className="text-text/70 max-w-xl mx-auto">
                        Thoughts on technology, entrepreneurship, and everything in between.
                    </p>
                </motion.div>

                {posts.length === 0 ? (
                    <div className="text-center text-text/50 py-20">
                        <p>No blog posts yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#0f1a1b] rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors"
                            >
                                {post.coverImage && (
                                    <Link to={`/blog/${post.slug}`}>
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                                        />
                                    </Link>
                                )}
                                <div className="p-6">
                                    <Link to={`/blog/${post.slug}`}>
                                        <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>

                                    <div className="flex items-center gap-4 text-sm text-text/50 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        {post.tags && post.tags.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Tag size={14} />
                                                {post.tags.slice(0, 3).join(', ')}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-text/70 mb-4">{post.excerpt}</p>

                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                                    >
                                        Read more <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link to="/" className="text-primary hover:underline">
                        ← Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
