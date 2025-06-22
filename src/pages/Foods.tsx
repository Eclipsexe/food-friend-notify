
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Search, Edit2, Trash2, AlertTriangle, Target, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  expiryDate: string;
  daysUntilExpiry: number;
  quantity: string;
  questAccepted?: boolean;
  questFinished?: boolean;
}

const Foods = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [foods, setFoods] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      expiryDate: "2024-06-02",
      daysUntilExpiry: 2,
      quantity: "1 bottle",
      questAccepted: false,
      questFinished: false
    },
    {
      id: 2,
      name: "Bread",
      category: "Bakery",
      expiryDate: "2024-06-03",
      daysUntilExpiry: 3,
      quantity: "1 loaf",
      questAccepted: false,
      questFinished: false
    },
    {
      id: 3,
      name: "Apples",
      category: "Fruits",
      expiryDate: "2024-06-07",
      daysUntilExpiry: 7,
      quantity: "6 pieces",
      questAccepted: false,
      questFinished: false
    },
    {
      id: 4,
      name: "Chicken Breast",
      category: "Meat",
      expiryDate: "2024-05-31",
      daysUntilExpiry: -1,
      quantity: "500g",
      questAccepted: false,
      questFinished: false
    }
  ]);

  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    expiryDate: '',
    quantity: ''
  });

  const [editFood, setEditFood] = useState({
    name: '',
    category: '',
    expiryDate: '',
    quantity: ''
  });

  const categories = ['Dairy', 'Bakery', 'Fruits', 'Meat', 'Vegetables', 'Grains', 'Seafood'];

  const calculateDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) {
      return { color: 'bg-red-100 text-red-800 border-red-200', label: t('expiresEarlyExpired'), icon: '🚫' };
    } else if (daysUntilExpiry <= 2) {
      return { color: 'bg-orange-100 text-orange-800 border-orange-200', label: t('expiresEarlySoon'), icon: '⚠️' };
    } else if (daysUntilExpiry <= 7) {
      return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t('expiresEarlyThisWeek'), icon: '⏰' };
    } else {
      return { color: 'bg-green-100 text-green-800 border-green-200', label: t('expiresEarlyFresh'), icon: '✅' };
    }
  };

  const getQuestText = (category: string) => {
    const questTexts: { [key: string]: string } = {
      'Dairy': 'Create a creamy smoothie or milkshake using this dairy product!',
      'Bakery': 'Make a delicious sandwich or toast with this bakery item!',
      'Fruits': 'Prepare a fresh fruit salad or healthy snack!',
      'Meat': 'Cook a protein-rich meal with this meat ingredient!',
      'Vegetables': 'Create a nutritious vegetable dish or salad!',
      'Grains': 'Make a hearty grain-based meal or side dish!',
      'Seafood': 'Prepare a delicious seafood dish with fresh flavors!'
    };
    return questTexts[category] || `Create an amazing dish using this ${category.toLowerCase()} ingredient!`;
  };

  const handleAcceptQuest = (id: number) => {
    setFoods(foods.map(food => 
      food.id === id ? { ...food, questAccepted: true } : food
    ));
    
    const food = foods.find(f => f.id === id);
    toast({
      title: "Quest Accepted! 🎯",
      description: `You've accepted the ${food?.category} quest for ${food?.name}!`,
    });
  };

  const handleFinishQuest = (id: number) => {
    setFoods(foods.map(food => 
      food.id === id ? { ...food, questFinished: true } : food
    ));
    
    const food = foods.find(f => f.id === id);
    toast({
      title: "Quest Completed! 🏆",
      description: `Great job! You've completed the ${food?.category} quest with ${food?.name}!`,
    });
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    const daysUntilExpiry = calculateDaysUntilExpiry(newFood.expiryDate);
    
    const foodItem: FoodItem = {
      id: Date.now(),
      name: newFood.name,
      category: newFood.category,
      expiryDate: newFood.expiryDate,
      daysUntilExpiry,
      quantity: newFood.quantity,
      questAccepted: false,
      questFinished: false
    };

    setFoods([...foods, foodItem]);
    setNewFood({ name: '', category: '', expiryDate: '', quantity: '' });
    setShowAddForm(false);
    
    toast({
      title: t('foodAdded'),
      description: `${newFood.name} ${t('foodAddedDesc')}`,
    });
  };

  const handleEditFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingFood) return;

    const daysUntilExpiry = calculateDaysUntilExpiry(editFood.expiryDate);
    
    const updatedFood: FoodItem = {
      ...editingFood,
      name: editFood.name,
      category: editFood.category,
      expiryDate: editFood.expiryDate,
      daysUntilExpiry,
      quantity: editFood.quantity
    };

    setFoods(foods.map(food => 
      food.id === editingFood.id ? updatedFood : food
    ));
    
    setEditingFood(null);
    setEditFood({ name: '', category: '', expiryDate: '', quantity: '' });
    
    toast({
      title: t('foodUpdated'),
      description: `${editFood.name} ${t('foodUpdatedDesc')}`,
    });
  };

  const startEdit = (food: FoodItem) => {
    setEditingFood(food);
    setEditFood({
      name: food.name,
      category: food.category,
      expiryDate: food.expiryDate,
      quantity: food.quantity
    });
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingFood(null);
    setEditFood({ name: '', category: '', expiryDate: '', quantity: '' });
  };

  const handleDeleteFood = (id: number) => {
    setFoods(foods.filter(food => food.id !== id));
    toast({
      title: t('foodRemoved'),
      description: t('foodRemovedDesc'),
    });
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiringCount = foods.filter(food => food.daysUntilExpiry <= 2 && food.daysUntilExpiry >= 0).length;
  const expiredCount = foods.filter(food => food.daysUntilExpiry < 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navigation />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
              {t('myFoodInventory')}
            </h1>
            <p className="text-gray-600">
              {t('trackGroceries')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Card className="border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <span className="text-lg">📦</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{foods.length}</p>
                      <p className="text-sm text-gray-600">{t('totalItems')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{expiringCount}</p>
                      <p className="text-sm text-gray-600">{t('expiringSoon')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
                      <span className="text-lg">🚫</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
                      <p className="text-sm text-gray-600">{t('expired')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('searchFoods')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingFood(null);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('addFood')}
            </Button>
          </div>

          {/* Add Food Form */}
          {showAddForm && (
            <Card className="mb-6 border-orange-200 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{t('addNewFoodItem')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFood} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="food-name">{t('foodName')}</Label>
                      <Input
                        id="food-name"
                        value={newFood.name}
                        onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                        placeholder={t('foodNamePlaceholder')}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="food-expiry">{t('expiryDate')}</Label>
                      <Input
                        id="food-expiry"
                        type="date"
                        value={newFood.expiryDate}
                        onChange={(e) => setNewFood({...newFood, expiryDate: e.target.value})}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="food-quantity">{t('quantity')}</Label>
                      <Input
                        id="food-quantity"
                        value={newFood.quantity}
                        onChange={(e) => setNewFood({...newFood, quantity: e.target.value})}
                        placeholder={t('quantityPlaceholder')}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('category')}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={newFood.category === category ? "default" : "outline"}
                          onClick={() => setNewFood({...newFood, category})}
                          className={`rounded-xl ${
                            newFood.category === category 
                              ? "bg-orange-500 hover:bg-orange-600 text-white" 
                              : "border-orange-300 text-orange-600 hover:bg-orange-50"
                          }`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                      disabled={!newFood.category}
                    >
                      {t('addFood')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Edit Food Form */}
          {editingFood && (
            <Card className="mb-6 border-orange-200 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{t('editFoodItem')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEditFood} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-food-name">{t('foodName')}</Label>
                      <Input
                        id="edit-food-name"
                        value={editFood.name}
                        onChange={(e) => setEditFood({...editFood, name: e.target.value})}
                        placeholder={t('foodNamePlaceholder')}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-food-expiry">{t('expiryDate')}</Label>
                      <Input
                        id="edit-food-expiry"
                        type="date"
                        value={editFood.expiryDate}
                        onChange={(e) => setEditFood({...editFood, expiryDate: e.target.value})}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="edit-food-quantity">{t('quantity')}</Label>
                      <Input
                        id="edit-food-quantity"
                        value={editFood.quantity}
                        onChange={(e) => setEditFood({...editFood, quantity: e.target.value})}
                        placeholder={t('quantityPlaceholder')}
                        className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('category')}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={editFood.category === category ? "default" : "outline"}
                          onClick={() => setEditFood({...editFood, category})}
                          className={`rounded-xl ${
                            editFood.category === category 
                              ? "bg-orange-500 hover:bg-orange-600 text-white" 
                              : "border-orange-300 text-orange-600 hover:bg-orange-50"
                          }`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                      disabled={!editFood.category}
                    >
                      {t('updateFood')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredFoods.map((food, index) => {
              const status = getExpiryStatus(food.daysUntilExpiry);
              
              return (
                <Card key={food.id} className="border-orange-200 hover:shadow-lg transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">
                          {food.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{food.quantity}</p>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                          {food.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2 hover:bg-orange-50"
                          onClick={() => startEdit(food)}
                        >
                          <Edit2 className="h-4 w-4 text-orange-600" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2 hover:bg-red-50"
                          onClick={() => handleDeleteFood(food.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Badge className={`${status.color} px-3 py-1 text-xs font-medium border`}>
                        {status.icon} {status.label}
                      </Badge>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t('expires')} {new Date(food.expiryDate).toLocaleDateString()}
                      </div>
                      
                      {food.daysUntilExpiry >= 0 && (
                        <p className="text-sm text-gray-600">
                          {food.daysUntilExpiry === 0 ? t('expiresEarlyToday') : 
                           food.daysUntilExpiry === 1 ? t('expiresEarlyTomorrow') :
                           `${t('expiresIn')} ${food.daysUntilExpiry} ${food.daysUntilExpiry === 1 ? t('expiresInDay') : t('expiresInDays')}`}
                        </p>
                      )}
                      
                      {food.daysUntilExpiry < 0 && (
                        <p className="text-sm text-red-600 font-medium">
                          {t('expiresEarlyExpired')} {Math.abs(food.daysUntilExpiry)} {Math.abs(food.daysUntilExpiry) !== 1 ? t('expiredDaysAgo') : t('expiredDayAgo')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-12 animate-fade-in mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                {t('noFoodItemsFound')}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? t('tryAdjustingSearch') : t('startByAdding')}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('addYourFirstFood')}
                </Button>
              )}
            </div>
          )}

          {/* Quest Section - Bottom of Page */}
          <div className="mt-12">
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-800 flex items-center space-x-2">
                  <Target className="h-6 w-6" />
                  <span>Food Quests</span>
                </CardTitle>
                <p className="text-purple-700">Complete cooking quests with your food items!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foods.map((food) => (
                    <Card key={`quest-${food.id}`} className="bg-white border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <h4 className="font-bold text-lg text-purple-800">{food.category} Quest</h4>
                        </div>
                        
                        <div className="mb-3">
                          <p className="font-semibold text-gray-900">{food.name}</p>
                          <p className="text-sm text-gray-600">{food.quantity}</p>
                        </div>
                        
                        <p className="text-purple-700 text-sm mb-4 leading-relaxed">
                          {getQuestText(food.category)}
                        </p>
                        
                        {food.questFinished ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">Quest Completed! 🏆</span>
                          </div>
                        ) : food.questAccepted ? (
                          <Button 
                            onClick={() => handleFinishQuest(food.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Finish Quest
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleAcceptQuest(food.id)}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Accept Quest
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foods;
