
import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const translations = {
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
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
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
