import React, { useState } from "react";
import { base44 } from "./api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Heart, MapPin, User, Calendar, Filter } from "lucide-react";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

import StoryCard from "./components/browse/StoryCard";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: () => base44.entities.Story.filter({ status: 'approved' }, '-created_date'),
    initialData: [],
  });

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || story.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 glow-text px-2">
            Browse Positive Stories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Discover inspiring tales of kindness, hope, and positive change from around the world
          </p>
        </motion.div>

        {/* Search and Filter - Stack vertically on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search stories, authors, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-11 sm:h-12 text-sm sm:text-base w-full"
              />
            </div>
            <div className="relative w-full">
              <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none z-10" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="pl-10 sm:pl-12 glass border-white/10 text-white h-11 sm:h-12 text-sm sm:text-base w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="glass border-white/10">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="kindness">Kindness</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Stories Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Showing <span className="text-blue-400 font-semibold">{filteredStories.length}</span> inspiring {filteredStories.length === 1 ? 'story' : 'stories'}
          </p>
        </motion.div>

        {/* Stories Grid - Single column on mobile, 2 on tablet, 3 on desktop */}
        {isLoading ? (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl animate-pulse w-full">
                <div className="h-36 sm:h-44 md:h-48 bg-white/5 rounded-xl mb-3 sm:mb-4" />
                <div className="h-5 sm:h-6 bg-white/5 rounded mb-2 sm:mb-3" />
                <div className="h-3 sm:h-4 bg-white/5 rounded mb-1.5 sm:mb-2" />
                <div className="h-3 sm:h-4 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 md:py-20"
          >
            <div className="glass p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl max-w-md mx-auto">
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">No stories found</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Try adjusting your search or filters to find more stories
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
