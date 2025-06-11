
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
    language: 'Language'
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
    language: 'ภาษา'
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
