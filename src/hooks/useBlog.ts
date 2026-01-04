import { useState, useEffect, useCallback } from 'react';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost } from '../types';

const BLOG_COLLECTION = 'blog';

export function useBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (publishedOnly = true) => {
        try {
            setLoading(true);
            const blogRef = collection(db, BLOG_COLLECTION);

            // Fetch all posts and filter/sort in memory to avoid index requirements
            const snapshot = await getDocs(blogRef);

            let blogPosts: BlogPost[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date()
            })) as BlogPost[];

            // Filter by published if needed
            if (publishedOnly) {
                blogPosts = blogPosts.filter(post => post.published === true);
            }

            // Sort by createdAt descending
            blogPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setPosts(blogPosts);
            setError(null);
            setLoading(false);
            return blogPosts;
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            setLoading(false);
            return [];
        }
    }, []);

    const getPost = async (slug: string): Promise<BlogPost | null> => {
        try {
            const blogRef = collection(db, BLOG_COLLECTION);
            const snapshot = await getDocs(blogRef);

            const matchingDoc = snapshot.docs.find(doc => doc.data().slug === slug);

            if (!matchingDoc) return null;

            return {
                id: matchingDoc.id,
                ...matchingDoc.data(),
                createdAt: matchingDoc.data().createdAt?.toDate() || new Date(),
                updatedAt: matchingDoc.data().updatedAt?.toDate() || new Date()
            } as BlogPost;
        } catch (err) {
            console.error('Error fetching blog post:', err);
            return null;
        }
    };

    const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const blogRef = collection(db, BLOG_COLLECTION);
            const newPost = {
                ...post,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            };
            const docRef = await addDoc(blogRef, newPost);
            // Refresh posts list
            await fetchPosts(false);
            return docRef.id;
        } catch (err) {
            console.error('Error creating blog post:', err);
            setError(err instanceof Error ? err.message : 'Failed to create post');
            return null;
        }
    };

    const updatePost = async (id: string, updates: Partial<BlogPost>) => {
        try {
            const docRef = doc(db, BLOG_COLLECTION, id);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: Timestamp.now()
            });
            // Refresh posts list
            await fetchPosts(false);
            return true;
        } catch (err) {
            console.error('Error updating blog post:', err);
            setError(err instanceof Error ? err.message : 'Failed to update post');
            return false;
        }
    };

    const deletePost = async (id: string) => {
        try {
            const docRef = doc(db, BLOG_COLLECTION, id);
            await deleteDoc(docRef);
            // Refresh posts list
            await fetchPosts(false);
            return true;
        } catch (err) {
            console.error('Error deleting blog post:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete post');
            return false;
        }
    };

    // Initial fetch - published posts only for public view
    useEffect(() => {
        fetchPosts(true);
    }, [fetchPosts]);

    return { posts, loading, error, fetchPosts, getPost, createPost, updatePost, deletePost };
}
