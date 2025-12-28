
import React from "react";
import { motion } from "framer-motion";
import { Heart, Globe, Users, Sparkles, Target, Eye, Award, Instagram } from "lucide-react";
import { base44 } from "./api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function AboutPage() {
  const { data: approvedStories } = useQuery({
    queryKey: ['approved-stories-stats'],
    queryFn: () => base44.entities.Story.filter({ status: 'approved' }),
    initialData: [],
  });

  const { data: allStories } = useQuery({
    queryKey: ['all-stories-about'],
    queryFn: () => base44.entities.Story.list(),
    initialData: [],
  });

  // Calculate real stats
  const stats = {
    storiesShared: approvedStories.length,
    countriesReached: [...new Set(allStories.map(s => s.location).filter(Boolean))].length,
    activeCommunity: [...new Set(allStories.map(s => s.author_name).filter(Boolean))].length,
    awardsWon: 12 // This can remain static or be made configurable
  };

  const teamMembers = [
    { name: "Rajveer Khanvilkar", role: "Founder & Visionary", initials: "RK", color: "from-blue-400 to-cyan-400" },
    { name: "Swarali Adhau", role: "Community Director", initials: "SA", color: "from-purple-400 to-pink-400" },
    { name: "Atharva Kene", role: "Content Curator", initials: "AK", color: "from-green-400 to-emerald-400" },
    { name: "Sahil Khedkar", role: "Technology Lead", initials: "SK", color: "from-orange-400 to-red-400" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "Every story shared is genuine and comes from the heart"
    },
    {
      icon: Globe,
      title: "Global Unity",
      description: "Connecting people across borders through shared positivity"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built by the community, for the community"
    },
    {
      icon: Sparkles,
      title: "Hope",
      description: "Inspiring belief in a better, brighter future for all"
    }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-4 sm:mb-6"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold text-white mb-4 sm:mb-6 glow-text">
            About PeaceNet
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-3">
            We're on a mission to amplify positivity and kindness across the globe,
            one inspiring story at a time.
          </p>
        </motion.div>

        {/* Mission & Vision - Single column on mobile */}
        <div className="flex flex-col gap-6 sm:gap-8 mb-16 sm:mb-20 md:grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 sm:p-8 rounded-3xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              To create a digital sanctuary where positive stories flourish, inspiring
              individuals worldwide to recognize, share, and celebrate the good in humanity.
              We believe that by highlighting acts of kindness, achievements, and positive
              change, we can shift global consciousness toward hope and compassion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 sm:p-8 rounded-3xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Our Vision</h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              A world where positivity becomes the default narrative. Where every person
              feels empowered to share their story of hope, and where these stories create
              a ripple effect of kindness that transcends borders, cultures, and differences.
              We envision PeaceNet as the world's largest repository of human goodness.
            </p>
          </motion.div>
        </div>

        {/* Core Values - Single column on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3 sm:mb-4">Our Core Values</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
          <div className="flex flex-col gap-4 sm:gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-4 sm:p-6 rounded-2xl text-center hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 sm:p-8 md:p-12 rounded-3xl mb-16 sm:mb-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">How It All Began</h2>
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
              <p>
                PeaceNet was born from a simple observation: while news media often focuses on
                negativity and conflict, countless acts of kindness, courage, and positive change
                happen every single day around the world—yet they go largely unnoticed.
              </p>
              <p>
                In 2025, our founder Rajveer Khanvilkar started collecting positive stories from the local
                community. What began as a small blog quickly grew into a movement, with people from
                all walks of life eager to share their experiences of hope and kindness.
              </p>
              <p>
                Today, PeaceNet has evolved into a global platform where thousands of stories are
                shared monthly, reaching millions of people and inspiring countless acts of kindness
                in return. We've proven that when we amplify the good, more good follows.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team - Single column on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3 sm:mb-4">Meet Our Team</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            Passionate individuals dedicated to spreading positivity
          </p>
          <div className="flex flex-col gap-4 sm:gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-4 sm:p-6 rounded-2xl text-center hover:border-blue-400/50 transition-all duration-300"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-xl sm:text-2xl font-bold`}>
                  {member.initials}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{member.name}</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-2 sm:mb-3">{member.role}</p>
                {member.name === "Rajveer Khanvilkar" && (
                  <a
                    href="https://www.instagram.com/rajveer_khanvilkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-2 text-pink-400 hover:text-pink-300 transition-colors text-xs sm:text-sm"
                  >
                    <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>@rajveer_khanvilkar</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats - 2 columns on mobile, 4 on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { label: "Stories Shared", value: stats.storiesShared, icon: Heart },
            { label: "Locations", value: stats.countriesReached, icon: Globe },
            { label: "Contributors", value: stats.activeCommunity, icon: Users },
            { label: "Awards Won", value: stats.awardsWon, icon: Award }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center"
            >
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
