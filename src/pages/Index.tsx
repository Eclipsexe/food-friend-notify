
import React from 'react';
import Navigation from '@/components/Navigation';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Calendar, MessageCircle, Plus, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: t('addYourFoods'),
      description: t('addYourFoodsDesc')
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: t('smartNotifications'),
      description: t('smartNotificationsDesc')
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: t('recipeAssistant'),
      description: t('recipeAssistantDesc')
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: t('expiryDashboard'),
      description: t('expiryDashboardDesc')
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
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-2xl bg-white">
                <img 
                  src="/lovable-uploads/ec2acfae-5167-4dc8-b408-301389c24126.png" 
                  alt="CookFetch Logo" 
                  className="w-20 h-20"
                />
              </div>
              <h1 className="text-4xl sm:text-6xl font-poppins font-bold text-gray-900 mb-6">
                {t('neverWasteFoodAgain')}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('heroDescription')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/foods">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group">
                  {t('startManagingFood')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-6 rounded-2xl text-lg font-semibold">
                  <Shield className="mr-2 h-5 w-5" />
                  {t('signUpFree')}
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
              {t('meetYourKitchenAssistant')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('kitchenAssistantDesc')}
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
              {t('howItWorks')}
            </h2>
            <p className="text-xl text-gray-600">{t('howItWorksDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: t('addYourFood'),
                description: t('addYourFoodDesc'),
                emoji: "📝"
              },
              {
                step: "2", 
                title: t('getReminders'),
                description: t('getRemindersDesc'),
                emoji: "🔔"
              },
              {
                step: "3",
                title: t('cookAndEnjoy'),
                description: t('cookAndEnjoyDesc'),
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-md">
              <img 
                src="/lovable-uploads/ec2acfae-5167-4dc8-b408-301389c24126.png" 
                alt="CookFetch Logo" 
                className="w-8 h-8"
              />
            </div>
            <span className="text-xl font-poppins font-semibold text-gray-800">CookFetch</span>
          </div>
          <p className="text-gray-600 mb-4">{t('smartFoodManagement')}</p>
          <p className="text-sm text-gray-500">{t('footerCopyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
