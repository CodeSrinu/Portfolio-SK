import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (err) {
            console.error('Login error:', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Login failed'
            };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (err) {
            console.error('Logout error:', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Logout failed'
            };
        }
    };

    return { user, loading, login, logout, isAuthenticated: !!user };
}
