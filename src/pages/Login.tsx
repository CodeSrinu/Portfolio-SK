import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, loading: authLoading } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/admin');
        }
    }, [authLoading, isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/admin');
        } else {
            // Format the error message to be more user-friendly
            let errorMessage = result.error || 'Login failed';
            if (errorMessage.includes('invalid-credential')) {
                errorMessage = 'Invalid email or password. Please check your credentials.';
            } else if (errorMessage.includes('user-not-found')) {
                errorMessage = 'No account found with this email.';
            } else if (errorMessage.includes('wrong-password')) {
                errorMessage = 'Incorrect password.';
            }
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">Admin Login</h1>
                    <p className="text-text/70">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0f1a1b] rounded-xl p-8 border border-primary/20">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-text focus:border-primary focus:outline-none transition-colors"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-text focus:border-primary focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-btn py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-text/50 text-sm mt-6">
                    <a href="/" className="text-primary hover:underline">← Back to Portfolio</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
