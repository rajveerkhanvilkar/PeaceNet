import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, PlusCircle, Info, Shield, Menu, X, Sparkles, User, LogOut, LogIn } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "Browse Stories", url: createPageUrl("Browse"), icon: BookOpen },
  { title: "Share Story", url: createPageUrl("Submit"), icon: PlusCircle },
  { title: "About", url: createPageUrl("About"), icon: Info },
  { title: "Admin", url: createPageUrl("AdminDashboard"), icon: Shield },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --aurora-blue: #60A5FA;
          --aurora-violet: #A78BFA;
          --aurora-pink: #F472B6;
        }
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        body {
          background: #0A0A0F;
          color: #E5E7EB;
        }
        
        .aurora-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: linear-gradient(120deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%);
        }
        
        .aurora-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 50% 80%, rgba(244, 114, 182, 0.15) 0%, transparent 50%);
          animation: aurora-move 20s ease-in-out infinite;
        }
        
        @keyframes aurora-move {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
        }
        
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 15s infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -100vh); opacity: 0; }
        }
        
        .glass {
          background: rgba(15, 15, 25, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-light {
          background: rgba(25, 25, 40, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-button {
          background: linear-gradient(135deg, var(--aurora-blue), var(--aurora-violet), var(--aurora-pink));
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          transition: all 0.3s ease;
        }
        
        .gradient-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glow-text {
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }
        
        .scroll-hide-nav {
          transform: translateY(-100%);
        }
      `}</style>

      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Glass Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-blue-400 group-hover:text-pink-400 transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white glow-text">PeaceNet</h1>
                <p className="text-xs text-gray-400">World's Positivity Engine</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                      ? 'glass text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                );
              })}

              {/* User Profile / Login */}
              {isAuthenticated ? (
                <div className="relative ml-2">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:border-blue-400 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 glass rounded-xl overflow-hidden"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              logout();
                              setProfileDropdownOpen(false);
                              navigate('/');
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="ml-2 flex items-center gap-2 px-4 py-2 gradient-button rounded-lg text-white font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass p-2 rounded-lg text-white hover:text-blue-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                        ? 'glass-light text-blue-400'
                        : 'text-gray-300 hover:bg-white/5'
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Animated Footer */}
      <footer className="relative z-10 mt-20 glass border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">PeaceNet</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Spreading positivity, one story at a time. Join us in making the world a brighter place.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navigationItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <p className="text-gray-400 text-sm mb-4">
                Be part of the movement to spread kindness and hope across the globe.
              </p>
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['facebook', 'twitter', 'instagram'].map((platform, i) => (
                  <motion.div
                    key={platform}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <span className="text-xs font-bold text-white uppercase">{platform[0]}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              © 2025 TrioNix. Spreading hope, kindness & positivity worldwide. ✨
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}