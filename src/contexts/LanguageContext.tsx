
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
    logout: 'Logout',
    level: 'Level',
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
    // Quest system translations
    foodQuests: 'Food Quests',
    foodQuestDesc: 'Complete cooking quests with your food items!',
    quest: 'Quest',
    questAccepted: 'Quest Accepted!',
    questAcceptedDesc: "You've accepted the",
    questFor: 'quest for',
    questCompleted: 'Quest Completed!',
    questCompletedDesc: 'Great job! You\'ve completed the',
    questWith: 'quest with',
    questCompletedBadge: 'Quest Completed!',
    acceptQuest: 'Accept Quest',
    finishQuest: 'Finish Quest',
    // Category translations
    categoryDairy: 'Dairy',
    categoryBakery: 'Bakery',
    categoryFruits: 'Fruits',
    categoryMeat: 'Meat',
    categoryVegetables: 'Vegetables',
    categoryGrains: 'Grains',
    categorySeafood: 'Seafood',
    // Quest text translations
    questDairy: 'Create a creamy smoothie or milkshake using this dairy product!',
    questBakery: 'Make a delicious sandwich or toast with this bakery item!',
    questFruits: 'Prepare a fresh fruit salad or healthy snack!',
    questMeat: 'Cook a protein-rich meal with this meat ingredient!',
    questVegetables: 'Create a nutritious vegetable dish or salad!',
    questGrains: 'Make a hearty grain-based meal or side dish!',
    questSeafood: 'Prepare a delicious seafood dish with fresh flavors!',
    questDefault: 'Create an amazing dish using this',
    questIngredient: 'ingredient',
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
    footerCopyright: '© 2025 CookFetch. Made with ❤️ for food lovers.',
    // Chatbot translations
    kitchenAssistant: 'Kitchen Assistant',
    askMeAboutRecipes: 'Ask me about recipes!',
    history: 'History',
    whatIngredientsDoYouHave: 'What ingredients do you have?',
    hiImYourKitchenAssistant: "Hi! I'm your kitchen assistant! 🍳 Tell me what ingredients you have, and I'll suggest delicious recipes you can make!",
    // Meal Input translations
    chooseMealFromSuggestions: 'Choose your meal from the suggestions above:',
    typeMealNamePlaceholder: 'Type the meal name you want to cook...',
    addToHistory: 'Add to History',
    adding: 'Adding...',
    pleaseEnterMealName: 'Please enter a meal name',
    pleaseChooseValidOption: 'Please choose a valid option from the suggested meals above',
    // Meal History translations
    mealHistory: 'Meal History',
    noMealsInHistory: 'No meals in your history yet. Start cooking and your choices will appear here! 🍽️',
    clearAll: 'Clear All',
    from: 'From:'
  },
  th: {
    home: 'หน้าแรก',
    myFoods: 'อาหารของฉัน',
    login: 'เข้าสู่ระบบ',
    logout: 'ออกจากระบบ',
    level: 'เลเวล',
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
    // Quest system translations
    foodQuests: 'เควสอาหาร',
    foodQuestDesc: 'ทำเควสทำอาหารด้วยอาหารของคุณ!',
    quest: 'เควส',
    questAccepted: 'รับเควสแล้ว!',
    questAcceptedDesc: 'คุณได้รับ',
    questFor: 'เควสสำหรับ',
    questCompleted: 'เควสสำเร็จ!',
    questCompletedDesc: 'เยี่ยมเลย! คุณได้ทำ',
    questWith: 'เควสด้วย',
    questCompletedBadge: 'เควสสำเร็จ!',
    acceptQuest: 'รับเควส',
    finishQuest: 'จบเควส',
    // Category translations
    categoryDairy: 'นม',
    categoryBakery: 'เบเกอรี่',
    categoryFruits: 'ผลไม้',
    categoryMeat: 'เนื้อสัตว์',
    categoryVegetables: 'ผัก',
    categoryGrains: 'ธัญพืช',
    categorySeafood: 'อาหารทะเล',
    // Quest text translations
    questDairy: 'สร้างสมูทตี้หรือมิลค์เชคครีมมี่โดยใช้ผลิตภัณฑ์นมนี้!',
    questBakery: 'ทำแซนด์วิชหรือขนมปังปิ้งอร่อยด้วयื่อเบเกอรี่นี้!',
    questFruits: 'เตรียมสลัดผลไม้สดหรือขนมเพื่อสุขภาพ!',
    questMeat: 'ทำอาหารที่อุดมด้วยโปรตีนด้วยส่วนผสมเนื้อสัตว์นี้!',
    questVegetables: 'สร้างอาหารผักหรือสลัดที่มีประโยชน์!',
    questGrains: 'ทำอาหารหรือเครื่องเคียงจากธัญพืช!',
    questSeafood: 'เตรียมอาหารทะเลอร่อยด้วยรสชาติสด!',
    questDefault: 'สร้างอาหารอันน่าทึ่งโดยใช้',
    questIngredient: 'ส่วนผสม',
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
    footerCopyright: '© 2025 CookFetch สร้างด้วย ❤️ สำหรับผู้รักอาหาร',
    // Chatbot translations
    kitchenAssistant: 'ผู้ช่วยในครัว',
    askMeAboutRecipes: 'ถามเกี่ยวกับสูตรอาหาร!',
    history: 'ประวัติ',
    whatIngredientsDoYouHave: 'คุณมีส่วนผสมอะไรบ้าง?',
    hiImYourKitchenAssistant: 'สวัสดี! ฉันเป็นผู้ช่วยในครัวของคุณ! 🍳 บอกฉันว่าคุณมีส่วนผสมอะไรบ้าง แล้วฉันจะแนะนำสูตรอาหารอร่อยที่คุณทำได้!',
    // Meal Input translations
    chooseMealFromSuggestions: 'เลือกอาหารของคุณจากคำแนะนำข้างต้น:',
    typeMealNamePlaceholder: 'พิมพ์ชื่ออาหารที่คุณต้องการทำ...',
    addToHistory: 'เพิ่มในประวัติ',
    adding: 'กำลังเพิ่ม...',
    pleaseEnterMealName: 'กรุณาใส่ชื่ออาหาร',
    pleaseChooseValidOption: 'กรุณาเลือกตัวเลือกที่ถูกต้องจากอาหารที่แนะนำข้างต้น',
    // Meal History translations
    mealHistory: 'ประวัติอาหาร',
    noMealsInHistory: 'ยังไม่มีอาหารในประวัติของคุณ เริ่มทำอาหารแล้วตัวเลือกของคุณจะปรากฏที่นี่! 🍽️',
    clearAll: 'ลบทั้งหมด',
    from: 'จาก:'
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
