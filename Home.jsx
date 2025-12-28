import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Globe, Users, TrendingUp } from "lucide-react";
import { base44 } from "./api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data: approvedStories } = useQuery({
    queryKey: ['approved-stories'],
    queryFn: () => base44.entities.Story.filter({ status: 'approved' }),
    initialData: [],
  });

  const { data: allStories } = useQuery({
    queryKey: ['all-stories-stats'],
    queryFn: () => base44.entities.Story.list(),
    initialData: [],
  });

  // Calculate real stats
  const stats = {
    storiesShared: approvedStories.length,
    globalReach: [...new Set(allStories.map(s => s.location).filter(Boolean))].length,
    activeMembers: [...new Set(allStories.map(s => s.author_name).filter(Boolean))].length,
    smilesCreated: "∞"
  };

  const features = [
    {
      icon: Heart,
      title: "Share Kindness",
      description: "Post stories of good deeds and positive moments that inspire others"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connect with people worldwide spreading positivity in their communities"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands creating a movement of hope and encouragement"
    },
    {
      icon: TrendingUp,
      title: "Track Growth",
      description: "Watch the wave of positivity grow as more stories are shared"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto relative z-10 w-full"
        >
          {/* Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Join the Positivity Movement</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2"
          >
            The World's
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent glow-text">
              Positivity Engine
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Share stories of hope, kindness, and positive change. Together, we're building
            a community that celebrates the good in humanity.
          </motion.p>

          {/* CTA Buttons - Stack vertically on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col gap-3 justify-center items-stretch max-w-md mx-auto px-4 sm:flex-row sm:max-w-none"
          >
            <Link to={createPageUrl("Submit")} className="w-full sm:w-auto">
              <button className="w-full gradient-button text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-xl text-sm sm:text-base">
                Share Your Story
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
            <Link to={createPageUrl("Browse")} className="w-full sm:w-auto">
              <button className="w-full glass text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                Browse Stories
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
          </motion.div>

          {/* Stats - 2 columns on mobile, 4 on larger screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4"
          >
            {[
              { label: "Stories Shared", value: stats.storiesShared },
              { label: "Locations", value: stats.globalReach },
              { label: "Contributors", value: stats.activeMembers },
              { label: "Smiles Created", value: stats.smilesCreated }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 sm:p-5 md:p-6 rounded-xl"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </section>

      {/* Features Section - Stack vertically on mobile */}
      <section className="py-12 sm:py-16 md:py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Why Join PeaceNet?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Be part of something bigger. Every story shared creates ripples of positivity
            </p>
          </motion.div>

          {/* Features Grid - 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:border-blue-400/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Make a Difference?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Your story matters. Share it today and inspire countless others to spread kindness.
            </p>
            <Link to={createPageUrl("Submit")}>
              <button className="gradient-button text-white font-semibold px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg shadow-2xl w-full sm:w-auto max-w-md mx-auto block">
                Share Your Story Now
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
