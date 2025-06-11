
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('myFoods'), path: '/foods' },
    { name: t('login'), path: '/login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg border border-orange-100">
              <img 
                src="/lovable-uploads/ec2acfae-5167-4dc8-b408-301389c24126.png" 
                alt="FreshKeeper Logo" 
                className="w-10 h-10"
              />
            </div>
            <span className="text-xl font-poppins font-semibold text-gray-800">{t('freshKeeper')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`rounded-full px-6 transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            
            {/* Language Switch */}
            <div className="flex items-center space-x-2 bg-orange-50 rounded-full px-4 py-2 border border-orange-200">
              <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-orange-600' : 'text-gray-400'}`}>
                EN
              </span>
              <Switch
                checked={language === 'th'}
                onCheckedChange={toggleLanguage}
                className="data-[state=checked]:bg-orange-500"
              />
              <span className={`text-sm font-medium transition-colors ${language === 'th' ? 'text-orange-600' : 'text-gray-400'}`}>
                TH
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-lg animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl ${
                      isActive(item.path)
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Language Switch */}
              <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3 border border-orange-200 mt-4">
                <span className="text-sm font-medium text-gray-700">Language / ภาษา</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-orange-600' : 'text-gray-400'}`}>
                    EN
                  </span>
                  <Switch
                    checked={language === 'th'}
                    onCheckedChange={toggleLanguage}
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <span className={`text-sm font-medium transition-colors ${language === 'th' ? 'text-orange-600' : 'text-gray-400'}`}>
                    TH
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
