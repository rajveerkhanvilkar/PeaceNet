
import React, { useState } from "react";
import { base44 } from "./api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "./utils";
import { motion } from "framer-motion";
import { Send, Upload, Sparkles, CheckCircle } from "lucide-react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Label } from "./components/ui/label";

export default function SubmitPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
    author_email: "", // Added author_email field
    location: "",
    category: "kindness",
    image_url: "",
    status: "pending"
  });

  const createStoryMutation = useMutation({
    mutationFn: async (data) => {
      // Ensure author_email is set to current user's email
      const user = await base44.auth.me();
      return base44.entities.Story.create({
        ...data,
        author_email: user.email,
        author_name: data.author_name || user.username || user.full_name
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['user-stories'] }); // Invalidate user-stories
      setShowSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Browse"));
      }, 3000);
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({ ...prev, image_url: file_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createStoryMutation.mutate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-3xl text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Story Submitted!</h2>
          <p className="text-gray-400 text-lg mb-6">
            Thank you for spreading positivity! Your story is under review and will be published soon.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <span className="animate-pulse">Redirecting to browse page...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400" />
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white glow-text">
              Share Your Story
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-3">
            Every positive story matters. Share yours and inspire others around the world.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* Title */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="title" className="text-white font-medium text-sm sm:text-base">
              Story Title *
            </Label>
            <Input
              id="title"
              required
              placeholder="Give your story a captivating title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-11 sm:h-12 text-base sm:text-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="content" className="text-white font-medium text-sm sm:text-base">
              Your Story *
            </Label>
            <Textarea
              id="content"
              required
              placeholder="Share your inspiring story in detail. What happened? How did it make you feel? How did it impact others?"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 min-h-[150px] sm:min-h-[180px] md:min-h-[200px] text-base sm:text-lg leading-relaxed"
            />
          </div>

          {/* Author Name */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="author" className="text-white font-medium text-sm sm:text-base">
              Your Name *
            </Label>
            <Input
              id="author"
              required
              placeholder="How should we credit you?"
              value={formData.author_name}
              onChange={(e) => handleInputChange('author_name', e.target.value)}
              className="glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-11 sm:h-12 text-sm sm:text-base"
            />
          </div>

          {/* Author Email */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-white font-medium text-sm sm:text-base">
              Your Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.author_email}
              onChange={(e) => handleInputChange('author_email', e.target.value)}
              className="glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-11 sm:h-12 text-sm sm:text-base"
            />
            <p className="text-[10px] sm:text-xs text-gray-500">
              🔒 Your email is private and will only be visible to administrators
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="location" className="text-white font-medium text-sm sm:text-base">
              Location (Optional)
            </Label>
            <Input
              id="location"
              placeholder="Where did this happen? (e.g., New York, USA)"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="glass border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 h-11 sm:h-12 text-sm sm:text-base"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="category" className="text-white font-medium text-sm sm:text-base">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="glass border-white/10 text-white h-11 sm:h-12 text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="kindness">Acts of Kindness</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="community">Community Impact</SelectItem>
                <SelectItem value="environment">Environmental</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="image" className="text-white font-medium text-sm sm:text-base">
              Add an Image (Optional)
            </Label>
            <div className="glass-light border-2 border-dashed border-white/20 rounded-xl p-6 sm:p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                {uploadingImage ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-400 mb-3 sm:mb-4" />
                    <p className="text-gray-400 text-sm sm:text-base">Uploading image...</p>
                  </div>
                ) : formData.image_url ? (
                  <div className="flex flex-col items-center">
                    <img src={formData.image_url} alt="Preview" className="max-h-40 sm:max-h-48 rounded-lg mb-3 sm:mb-4" />
                    <p className="text-green-400 font-medium text-sm sm:text-base">Image uploaded successfully!</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Click to change</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
                    <p className="text-white font-medium mb-1 text-sm sm:text-base">Click to upload an image</p>
                    <p className="text-gray-500 text-xs sm:text-sm">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={createStoryMutation.isPending}
            className="w-full gradient-button text-white font-semibold py-3 sm:py-4 rounded-xl text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createStoryMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Submit Story for Review
              </>
            )}
          </motion.button>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Your story will be reviewed by our team before being published
          </p>
        </motion.form>
      </div>
    </div>
  );
}
