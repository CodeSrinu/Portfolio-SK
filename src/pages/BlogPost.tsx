import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useBlog } from '../hooks/useBlog';
import { BlogPost as BlogPostType } from '../types';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getPost } = useBlog();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                const fetchedPost = await getPost(slug);
                setPost(fetchedPost);
            }
            setLoading(false);
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link to="/blog" className="text-primary hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <article className="container mx-auto px-4 py-20 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8"
                    >
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

                    <div className="flex items-center gap-4 text-sm text-text/50 mb-8">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        {post.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                                <Tag size={14} />
                                {post.tags.join(', ')}
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert prose-primary max-w-none">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>,
                                p: ({ children }) => <p className="text-text/90 leading-relaxed mb-4">{children}</p>,
                                a: ({ href, children }) => (
                                    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                        {children}
                                    </a>
                                ),
                                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                                li: ({ children }) => <li className="text-text/90">{children}</li>,
                                code: ({ children, className }) => {
                                    const isInline = !className;
                                    return isInline ? (
                                        <code className="bg-primary/10 text-primary px-1 py-0.5 rounded text-sm">{children}</code>
                                    ) : (
                                        <code className="block bg-[#0f1a1b] p-4 rounded-lg overflow-x-auto text-sm">{children}</code>
                                    );
                                },
                                pre: ({ children }) => (
                                    <pre className="bg-[#0f1a1b] p-4 rounded-lg overflow-x-auto mb-4 border border-primary/20">
                                        {children}
                                    </pre>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-primary pl-4 italic text-text/70 my-4">
                                        {children}
                                    </blockquote>
                                ),
                                img: ({ src, alt }) => (
                                    <img src={src} alt={alt} className="rounded-lg my-4 w-full" />
                                )
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-primary/20">
                            <h3 className="text-sm font-medium text-text/50 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </article>
        </div>
    );
};

export default BlogPost;
