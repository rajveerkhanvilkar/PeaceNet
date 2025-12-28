import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Layout from './Layout';
import Home from './Home';
import Browse from './Browse';
import Submit from './Submit';
import AdminDashboard from './AdminDashboard';
import About from './About';
import Auth from './Auth';
import { AuthProvider } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

// Utility function for creating page URLs
export const createPageUrl = (pageName) => {
    const routes = {
        'Home': '/',
        'Browse': '/browse',
        'Submit': '/submit',
        'AdminDashboard': '/admin',
        'About': '/about',
        'Auth': '/auth'
    };
    return routes[pageName] || '/';
};

// Make it available globally
window.createPageUrl = createPageUrl;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="browse" element={<Browse />} />
                            <Route path="submit" element={<Submit />} />
                            <Route path="admin" element={<AdminDashboard />} />
                            <Route path="about" element={<About />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
