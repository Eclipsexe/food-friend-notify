
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    myFoods: 'My Foods',
    login: 'Login',
    freshKeeper: 'CookFetch',
    myFoodInventory: 'My Food Inventory',
    trackGroceries: 'Track your groceries and never let food go to waste',
    totalItems: 'Total Items',
    expiringSoon: 'Expiring Soon',
    expired: 'Expired',
    searchFoods: 'Search your foods...',
    addFood: 'Add Food',
    addNewFoodItem: 'Add New Food Item',
    editFoodItem: 'Edit Food Item',
    foodName: 'Food Name',
    category: 'Category',
    expiryDate: 'Expiry Date',
    quantity: 'Quantity',
    updateFood: 'Update Food',
    cancel: 'Cancel',
    noFoodItemsFound: 'No food items found',
    tryAdjustingSearch: 'Try adjusting your search terms',
    startByAdding: 'Start by adding your first food item',
    addYourFirstFood: 'Add Your First Food',
    foodNamePlaceholder: 'e.g., Milk, Bread, Apples',
    categoryPlaceholder: 'e.g., Dairy, Fruits, Meat',
    quantityPlaceholder: 'e.g., 1 bottle, 500g, 6 pieces',
    expires: 'Expires:',
    expiresIn: 'Expires in',
    expiresInDays: 'days',
    expiresInDay: 'day',
    expiresEarlyFresh: 'Fresh',
    expiresEarlyThisWeek: 'Expires This Week',
    expiresEarlySoon: 'Expires Soon',
    expiresEarlyExpired: 'Expired',
    expiresEarlyToday: 'Expires today',
    expiresEarlyTomorrow: 'Expires tomorrow',
    expiredDaysAgo: 'days ago',
    expiredDayAgo: 'day ago',
    foodAdded: 'Food added!',
    foodAddedDesc: 'has been added to your inventory.',
    foodUpdated: 'Food updated!',
    foodUpdatedDesc: 'has been updated successfully.',
    foodRemoved: 'Food removed',
    foodRemovedDesc: 'The item has been removed from your inventory.',
    language: 'Language',
    // Index page translations
    neverWasteFoodAgain: 'Never Waste Food Again',
    heroDescription: 'Track your groceries, get expiration reminders, and discover amazing recipes with ingredients you already have. Smart food management made simple.',
    startManagingFood: 'Start Managing Food',
    signUpFree: 'Sign Up Free',
    addYourFoods: 'Add Your Foods',
    addYourFoodsDesc: 'Easily track all your groceries with expiration dates',
    smartNotifications: 'Smart Notifications',
    smartNotificationsDesc: 'Get reminded before your food expires',
    recipeAssistant: 'Recipe Assistant',
    recipeAssistantDesc: 'Find recipes based on your available ingredients',
    expiryDashboard: 'Expiry Dashboard',
    expiryDashboardDesc: 'Visual overview of all your food items',
    meetYourKitchenAssistant: 'Meet Your Kitchen Assistant',
    kitchenAssistantDesc: 'Chat with our AI assistant to discover delicious recipes using the ingredients you have at home.',
    howItWorks: 'How It Works',
    howItWorksDesc: 'Simple steps to smart food management',
    addYourFood: 'Add Your Food',
    addYourFoodDesc: 'Scan or manually add your groceries with expiration dates',
    getReminders: 'Get Reminders',
    getRemindersDesc: 'Receive notifications before your food expires',
    cookAndEnjoy: 'Cook & Enjoy',
    cookAndEnjoyDesc: 'Use our recipe suggestions to create delicious meals',
    smartFoodManagement: 'Smart food management for a sustainable kitchen',
    footerCopyright: '© 2025 CookFetch. Made with ❤️ for food lovers.'
  },
  th: {
    home: 'หน้าแรก',
    myFoods: 'อาหารของฉัน',
    login: 'เข้าสู่ระบบ',
    freshKeeper: 'CookFetch',
    myFoodInventory: 'คลังอาหารของฉัน',
    trackGroceries: 'ติดตามของชำและไม่ให้อาหารเสีย',
    totalItems: 'รายการทั้งหมด',
    expiringSoon: 'ใกล้หมดอายุ',
    expired: 'หมดอายุแล้ว',
    searchFoods: 'ค้นหาอาหารของคุณ...',
    addFood: 'เพิ่มอาหาร',
    addNewFoodItem: 'เพิ่มรายการอาหารใหม่',
    editFoodItem: 'แก้ไขรายการอาหาร',
    foodName: 'ชื่ออาหาร',
    category: 'หมวดหมู่',
    expiryDate: 'วันหมดอายุ',
    quantity: 'จำนวน',
    updateFood: 'อัปเดตอาหาร',
    cancel: 'ยกเลิก',
    noFoodItemsFound: 'ไม่พบรายการอาหาร',
    tryAdjustingSearch: 'ลองปรับเงื่อนไขการค้นหา',
    startByAdding: 'เริ่มต้นด้วยการเพิ่มรายการอาหารแรกของคุณ',
    addYourFirstFood: 'เพิ่มอาหารแรกของคุณ',
    foodNamePlaceholder: 'เช่น นม, ขนมปัง, แอปเปิล',
    categoryPlaceholder: 'เช่น นม, ผลไม้, เนื้อสัตว์',
    quantityPlaceholder: 'เช่น 1 ขวด, 500 กรัม, 6 ชิ้น',
    expires: 'หมดอายุ:',
    expiresIn: 'หมดอายุใน',
    expiresInDays: 'วัน',
    expiresInDay: 'วัน',
    expiresEarlyFresh: 'สด',
    expiresEarlyThisWeek: 'หมดอายุสัปดาห์นี้',
    expiresEarlySoon: 'ใกล้หมดอายุ',
    expiresEarlyExpired: 'หมดอายุแล้ว',
    expiresEarlyToday: 'หมดอายุวันนี้',
    expiresEarlyTomorrow: 'หมดอายุพรุ่งนี้',
    expiredDaysAgo: 'วันที่แล้ว',
    expiredDayAgo: 'วันที่แล้ว',
    foodAdded: 'เพิ่มอาหารแล้ว!',
    foodAddedDesc: 'ถูกเพิ่มในคลังของคุณแล้ว',
    foodUpdated: 'อัปเดตอาหารแล้ว!',
    foodUpdatedDesc: 'อัปเดตเรียบร้อยแล้ว',
    foodRemoved: 'ลบอาหารแล้ว',
    foodRemovedDesc: 'รายการถูกลบออกจากคลังของคุณแล้ว',
    language: 'ภาษา',
    // Index page translations
    neverWasteFoodAgain: 'ไม่เสียอาหารอีกต่อไป',
    heroDescription: 'ติดตามของชำ รับการแจ้งเตือนก่อนหมดอายุ และค้นพบสูตรอาหารอันน่าทึ่งด้วยส่วนผสมที่คุณมีอยู่แล้ว การจัดการอาหารอัจฉริยะทำได้ง่ายๆ',
    startManagingFood: 'เริ่มจัดการอาหาร',
    signUpFree: 'สมัครฟรี',
    addYourFoods: 'เพิ่มอาหารของคุณ',
    addYourFoodsDesc: 'ติดตามของชำทั้งหมดพร้อมวันหมดอายุได้อย่างง่ายดาย',
    smartNotifications: 'การแจ้งเตือนอัจฉริยะ',
    smartNotificationsDesc: 'รับการแจ้งเตือนก่อนอาหารหมดอายุ',
    recipeAssistant: 'ผู้ช่วยสูตรอาหาร',
    recipeAssistantDesc: 'ค้นหาสูตรอาหารตามส่วนผสมที่มีอยู่',
    expiryDashboard: 'แดชบอร์ดหมดอายุ',
    expiryDashboardDesc: 'ภาพรวมของอาหารทั้งหมด',
    meetYourKitchenAssistant: 'พบกับผู้ช่วยในครัว',
    kitchenAssistantDesc: 'แชทกับผู้ช่วย AI เพื่อค้นพบสูตรอาหารอร่อยโดยใช้วัตถุดิบที่คุณมีอยู่ในบ้าน',
    howItWorks: 'วิธีการใช้งาน',
    howItWorksDesc: 'ขั้นตอนง่ายๆ สู่การจัดการอาหารอัจฉริยะ',
    addYourFood: 'เพิ่มอาหารของคุณ',
    addYourFoodDesc: 'สแกนหรือเพิ่มของชำด้วยตนเองพร้อมวันหมดอายุ',
    getReminders: 'รับการแจ้งเตือน',
    getRemindersDesc: 'รับการแจ้งเตือนก่อนอาหารหมดอายุ',
    cookAndEnjoy: 'ทำอาหารและเพลิดเพลิน',
    cookAndEnjoyDesc: 'ใช้คำแนะนำสูตรอาหารของเราเพื่อสร้างอาหารอร่อย',
    smartFoodManagement: 'การจัดการอาหารอัจฉริยะเพื่อครัวที่ยั่งยืน',
    footerCopyright: '© 2025 CookFetch สร้างด้วย ❤️ สำหรับผู้รักอาหาร'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
