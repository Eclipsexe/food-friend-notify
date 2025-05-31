
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Search, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  expiryDate: string;
  daysUntilExpiry: number;
  quantity: string;
}

const Foods = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      expiryDate: "2024-06-02",
      daysUntilExpiry: 2,
      quantity: "1 bottle"
    },
    {
      id: 2,
      name: "Bread",
      category: "Bakery",
      expiryDate: "2024-06-03",
      daysUntilExpiry: 3,
      quantity: "1 loaf"
    },
    {
      id: 3,
      name: "Apples",
      category: "Fruits",
      expiryDate: "2024-06-07",
      daysUntilExpiry: 7,
      quantity: "6 pieces"
    },
    {
      id: 4,
      name: "Chicken Breast",
      category: "Meat",
      expiryDate: "2024-05-31",
      daysUntilExpiry: -1,
      quantity: "500g"
    }
  ]);

  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    expiryDate: '',
    quantity: ''
  });

  const calculateDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) {
      return { color: 'bg-red-100 text-red-800 border-red-200', label: 'Expired', icon: '🚫' };
    } else if (daysUntilExpiry <= 2) {
      return { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Expires Soon', icon: '⚠️' };
    } else if (daysUntilExpiry <= 7) {
      return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Expires This Week', icon: '⏰' };
    } else {
      return { color: 'bg-green-100 text-green-800 border-green-200', label: 'Fresh', icon: '✅' };
    }
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
      quantity: newFood.quantity
    };

    setFoods([...foods, foodItem]);
    setNewFood({ name: '', category: '', expiryDate: '', quantity: '' });
    setShowAddForm(false);
    
    toast({
      title: "Food added!",
      description: `${newFood.name} has been added to your inventory.`,
    });
  };

  const handleDeleteFood = (id: number) => {
    setFoods(foods.filter(food => food.id !== id));
    toast({
      title: "Food removed",
      description: "The item has been removed from your inventory.",
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
              My Food Inventory
            </h1>
            <p className="text-gray-600">
              Track your groceries and never let food go to waste
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
                      <p className="text-sm text-gray-600">Total Items</p>
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
                      <p className="text-sm text-gray-600">Expiring Soon</p>
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
                      <p className="text-sm text-gray-600">Expired</p>
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
                placeholder="Search your foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Food
            </Button>
          </div>

          {/* Add Food Form */}
          {showAddForm && (
            <Card className="mb-6 border-orange-200 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Add New Food Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="food-name">Food Name</Label>
                    <Input
                      id="food-name"
                      value={newFood.name}
                      onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                      placeholder="e.g., Milk, Bread, Apples"
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="food-category">Category</Label>
                    <Input
                      id="food-category"
                      value={newFood.category}
                      onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                      placeholder="e.g., Dairy, Fruits, Meat"
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="food-expiry">Expiry Date</Label>
                    <Input
                      id="food-expiry"
                      type="date"
                      value={newFood.expiryDate}
                      onChange={(e) => setNewFood({...newFood, expiryDate: e.target.value})}
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="food-quantity">Quantity</Label>
                    <Input
                      id="food-quantity"
                      value={newFood.quantity}
                      onChange={(e) => setNewFood({...newFood, quantity: e.target.value})}
                      placeholder="e.g., 1 bottle, 500g, 6 pieces"
                      className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-2">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                    >
                      Add Food
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <p className="text-gray-600 text-sm">{food.category}</p>
                        <p className="text-gray-500 text-sm">{food.quantity}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="p-2 hover:bg-orange-50">
                          <Edit2 className="h-4 w-4 text-gray-600" />
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
                        Expires: {new Date(food.expiryDate).toLocaleDateString()}
                      </div>
                      
                      {food.daysUntilExpiry >= 0 && (
                        <p className="text-sm text-gray-600">
                          {food.daysUntilExpiry === 0 ? 'Expires today' : 
                           food.daysUntilExpiry === 1 ? 'Expires tomorrow' :
                           `Expires in ${food.daysUntilExpiry} days`}
                        </p>
                      )}
                      
                      {food.daysUntilExpiry < 0 && (
                        <p className="text-sm text-red-600 font-medium">
                          Expired {Math.abs(food.daysUntilExpiry)} day{Math.abs(food.daysUntilExpiry) !== 1 ? 's' : ''} ago
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                No food items found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first food item'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Food
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Foods;
