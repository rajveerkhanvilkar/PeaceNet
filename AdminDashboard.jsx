
import React, { useState } from "react";
import { base44 } from "./api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Eye, Trash2, Filter, Clock, Lock, Shield } from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

import StoryReviewCard from "./components/admin/StoryReviewCard";

const ADMIN_PASSWORD = "rajveer09"; // In production, this would be handled server-side

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedStory, setSelectedStory] = useState(null);
  const queryClient = useQueryClient();

  const { data: stories, isLoading } = useQuery({
    queryKey: ['admin-stories', statusFilter],
    queryFn: () => {
      if (statusFilter === "all") {
        return base44.entities.Story.list('-created_date');
      }
      return base44.entities.Story.filter({ status: statusFilter }, '-created_date');
    },
    initialData: [],
    enabled: isAuthenticated,
  });

  const updateStoryMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Story.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setSelectedStory(null);
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: (id) => base44.entities.Story.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setSelectedStory(null);
    },
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput("");
    }
  };

  const handleApprove = (storyId) => {
    updateStoryMutation.mutate({ id: storyId, status: 'approved' });
  };

  const handleReject = (storyId) => {
    updateStoryMutation.mutate({ id: storyId, status: 'rejected' });
  };

  const handleDelete = (storyId) => {
    if (window.confirm('Are you sure you want to permanently delete this story?')) {
      deleteStoryMutation.mutate(storyId);
    }
  };

  // Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="relative z-10">
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Admin Access</h2>
            <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
              Enter the admin password to access the dashboard
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    className={`pl-10 sm:pl-12 glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-12 sm:h-14 text-base sm:text-lg ${passwordError ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2"
                  >
                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Incorrect password. Please try again.
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full gradient-button text-white font-semibold py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-xl"
              >
                Access Dashboard
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const statusCounts = {
    pending: stories.filter(s => s.status === 'pending').length,
    approved: stories.filter(s => s.status === 'approved').length,
    rejected: stories.filter(s => s.status === 'rejected').length,
    all: stories.length
  };

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 glow-text">
                Admin Dashboard
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400">
                Review and moderate submitted stories to maintain quality content
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="glass text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Lock className="w-4 h-4" />
              Lock Dashboard
            </button>
          </div>
        </motion.div>

        {/* Stats Cards - 2 columns on mobile, 4 on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
        >
          {[
            { label: "Pending Review", value: statusCounts.pending, color: "from-yellow-500 to-orange-500", icon: Clock },
            { label: "Approved", value: statusCounts.approved, color: "from-green-500 to-emerald-500", icon: CheckCircle },
            { label: "Rejected", value: statusCounts.rejected, color: "from-red-500 to-pink-500", icon: XCircle },
            { label: "Total Stories", value: statusCounts.all, color: "from-blue-500 to-purple-500", icon: Eye }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-2xl relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
              <stat.icon className={`w-8 h-8 mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters - Stack vertically on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-white font-medium text-sm sm:text-base">Filter by status:</span>
            </div>
            <div className="flex gap-2 flex-wrap w-full sm:w-auto">
              {['pending', 'approved', 'rejected', 'all'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${statusFilter === status
                      ? 'gradient-button text-white'
                      : 'glass-light text-gray-400 hover:text-white'
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <Badge variant="secondary" className="ml-2 bg-white/10 text-xs">
                    {status === 'all' ? statusCounts.all : statusCounts[status]}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stories List - Single column on mobile, 2 on desktop */}
        {isLoading ? (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass p-6 rounded-2xl animate-pulse">
                <div className="h-6 bg-white/5 rounded mb-4" />
                <div className="h-4 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : stories.length > 0 ? (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-2">
            {stories.map((story, i) => (
              <StoryReviewCard
                key={story.id}
                story={story}
                index={i}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onViewDetails={setSelectedStory}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass p-12 rounded-3xl max-w-md mx-auto">
              <Eye className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No stories found</h3>
              <p className="text-gray-400">
                No stories match your current filter
              </p>
            </div>
          </motion.div>
        )}

        {/* Story Details Dialog */}
        {selectedStory && (
          <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
            <DialogContent className="glass border-white/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-4">
                  {selectedStory.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <Badge className={`
                  ${selectedStory.status === 'pending' ? 'bg-yellow-500' : ''}
                  ${selectedStory.status === 'approved' ? 'bg-green-500' : ''}
                  ${selectedStory.status === 'rejected' ? 'bg-red-500' : ''}
                `}>
                  {selectedStory.status.toUpperCase()}
                </Badge>

                {selectedStory.image_url && (
                  <img
                    src={selectedStory.image_url}
                    alt={selectedStory.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Story Content</h4>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedStory.content}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Author</h4>
                      <p className="text-white font-medium">{selectedStory.author_name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Email (Admin Only)</h4>
                      <p className="text-blue-400 font-medium">{selectedStory.author_email || 'Not provided'}</p>
                    </div>
                    {selectedStory.location && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Location</h4>
                        <p className="text-white font-medium">{selectedStory.location}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Category</h4>
                      <p className="text-white font-medium capitalize">{selectedStory.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Submitted</h4>
                      <p className="text-white font-medium">
                        {format(new Date(selectedStory.created_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {selectedStory.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(selectedStory.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve
                    </button>
                  )}
                  {selectedStory.status !== 'rejected' && (
                    <button
                      onClick={() => handleReject(selectedStory.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedStory.id)}
                    className="flex-1 glass border-red-500/50 text-red-400 font-semibold py-3 rounded-xl hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
