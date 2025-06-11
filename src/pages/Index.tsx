
import React from 'react';
import Navigation from '@/components/Navigation';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Calendar, MessageCircle, Plus, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: "Add Your Foods",
      description: "Easily track all your groceries with expiration dates"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Notifications",
      description: "Get reminded before your food expires"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Recipe Assistant",
      description: "Find recipes based on your available ingredients"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Expiry Dashboard",
      description: "Visual overview of all your food items"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-lg">
                <img 
                  src="/lovable-uploads/0ccbf492-a843-4398-a0fd-1fc92d034797.png" 
                  alt="FreshKeeper Logo" 
                  className="w-16 h-16"
                />
              </div>
              <h1 className="text-4xl sm:text-6xl font-poppins font-bold text-gray-900 mb-6">
                Never Waste
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"> Food </span>
                Again
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Track your groceries, get expiration reminders, and discover amazing recipes 
                with ingredients you already have. Smart food management made simple.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/foods">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group">
                  Start Managing Food
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-6 rounded-2xl text-lg font-semibold">
                  <Shield className="mr-2 h-5 w-5" />
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-orange-100 hover:border-orange-200 transition-all duration-200 hover:shadow-lg group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600 group-hover:bg-orange-200 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Meet Your Kitchen Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chat with our AI assistant to discover delicious recipes using the ingredients you have at home.
            </p>
          </div>
          
          <div className="animate-slide-up">
            <Chatbot />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to smart food management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Add Your Food",
                description: "Scan or manually add your groceries with expiration dates",
                emoji: "📝"
              },
              {
                step: "2", 
                title: "Get Reminders",
                description: "Receive notifications before your food expires",
                emoji: "🔔"
              },
              {
                step: "3",
                title: "Cook & Enjoy",
                description: "Use our recipe suggestions to create delicious meals",
                emoji: "👨‍🍳"
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.emoji}
                </div>
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center">
              <img 
                src="/lovable-uploads/0ccbf492-a843-4398-a0fd-1fc92d034797.png" 
                alt="FreshKeeper Logo" 
                className="w-6 h-6"
              />
            </div>
            <span className="text-xl font-poppins font-semibold text-gray-800">FreshKeeper</span>
          </div>
          <p className="text-gray-600 mb-4">Smart food management for a sustainable kitchen</p>
          <p className="text-sm text-gray-500">© 2025 FreshKeeper. Made with ❤️ for food lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
