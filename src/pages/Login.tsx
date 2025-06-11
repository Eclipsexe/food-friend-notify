
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const content = {
    en: {
      welcome: "Welcome to FreshKeeper",
      subtitle: "Start your journey to smarter food management",
      getStarted: "Get Started",
      continueWithGoogle: "Continue with Google",
      backToHome: "← Back to home",
      signingIn: "Signing in...",
      welcomeBack: "Welcome back!",
      loginSuccess: "You've been successfully logged in.",
      connectSupabase: "Please connect to Supabase to enable Google authentication."
    },
    th: {
      welcome: "ยินดีต้อนรับสู่เฟรชคีปเปอร์",
      subtitle: "เริ่มต้นการจัดการอาหารอย่างชาญฉลาด",
      getStarted: "เริ่มต้นใช้งาน",
      continueWithGoogle: "เข้าสู่ระบบด้วย Google",
      backToHome: "← กลับหน้าแรก",
      signingIn: "กำลังเข้าสู่ระบบ...",
      welcomeBack: "ยินดีต้อนรับกลับ!",
      loginSuccess: "เข้าสู่ระบบสำเร็จแล้ว",
      connectSupabase: "กรุณาเชื่อมต่อกับ Supabase เพื่อเปิดใช้งานการยืนยันตัวตนด้วย Google"
    }
  };

  const t = content[language];

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: t.welcomeBack,
      description: t.connectSupabase,
      variant: "destructive"
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navigation />
      
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle bg-white shadow-2xl border border-orange-100">
              <img 
                src="/lovable-uploads/ec2acfae-5167-4dc8-b408-301389c24126.png" 
                alt="FreshKeeper Logo" 
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
              {t.welcome}
            </h1>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="border-orange-200 shadow-lg animate-slide-up">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-gray-800">
                {t.getStarted}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Sign-in Button */}
              <Button
                onClick={handleGoogleLogin}
                className="w-full py-6 bg-white hover:bg-gray-50 text-gray-700 border-2 border-orange-200 hover:border-orange-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? t.signingIn : (
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">{t.continueWithGoogle}</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>

              {/* Feature highlights */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>{language === 'en' ? 'Track food expiration dates' : 'ติดตามวันหมดอายุของอาหาร'}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>{language === 'en' ? 'Get smart notifications' : 'รับการแจ้งเตือนอัจฉริยะ'}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>{language === 'en' ? 'Discover recipe suggestions' : 'ค้นหาสูตรอาหารแนะนำ'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to home link */}
          <div className="text-center mt-6">
            <Link to="/" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
