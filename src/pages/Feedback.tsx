
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Feedback = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [userXP, setUserXP] = useState(() => {
    const savedXP = localStorage.getItem('userXP');
    return savedXP ? parseInt(savedXP) : 0;
  });

  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    rating: 0,
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate feedback submission
    toast({
      title: "Feedback Submitted! 🎉",
      description: "Thank you for your feedback. We'll review it and get back to you soon!",
    });

    // Reset form
    setFeedback({
      name: '',
      email: '',
      rating: 0,
      subject: '',
      message: ''
    });
  };

  const handleRating = (rating: number) => {
    setFeedback({ ...feedback, rating });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navigation userXP={userXP} />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
              We'd Love Your Feedback
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help us improve FreshKeeper by sharing your thoughts, suggestions, or reporting any issues you've encountered.
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="border-orange-200 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-orange-600" />
                <span>Share Your Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      value={feedback.name}
                      onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                      placeholder="Your name"
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={feedback.email}
                      onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label>How would you rate your experience?</Label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= feedback.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                    {feedback.rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        {feedback.rating} out of 5 stars
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={feedback.subject}
                    onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
                    placeholder="Brief description of your feedback"
                    className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={feedback.message}
                    onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                    placeholder="Please share your detailed feedback, suggestions, or report any issues..."
                    className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400 min-h-32"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Be specific about the issue or suggestion</li>
                  <li>• Include steps to reproduce any bugs</li>
                  <li>• Let us know what device/browser you're using</li>
                  <li>• Screenshots are always helpful!</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Response Time</h3>
                <p className="text-sm text-gray-600 mb-2">
                  We typically respond to feedback within 24-48 hours.
                </p>
                <p className="text-sm text-gray-600">
                  For urgent issues, please include "URGENT" in your subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
