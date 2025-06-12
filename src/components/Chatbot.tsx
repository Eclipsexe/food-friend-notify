
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle, AlertCircle } from "lucide-react";
import { useMealHistory } from "@/hooks/useMealHistory";
import MealInput from "./MealInput";
import MealHistory from "./MealHistory";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasMealSuggestions?: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your kitchen assistant! 🍳 Tell me what ingredients you have, and I'll suggest delicious recipes you can make!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const {
    history,
    updateSuggestions,
    addToHistory,
    clearHistory
  } = useMealHistory();

  // Enhanced bot responses with meal suggestions
  const botResponsesWithSuggestions = [
    "Great ingredients! Here are some delicious meals you can make:\n• Vegetable Stir-fry with garlic and ginger\n• Fresh Garden Salad with herbs\n• Hearty Vegetable Soup\n• Grilled Veggie Wrap",
    "Perfect! With those ingredients, you could make:\n• Creamy Pasta with fresh herbs\n• Italian-style Risotto\n• Garlic Butter Noodles\n• Mediterranean Pasta Salad",
    "Excellent choice! Try these tasty options:\n• Fluffy Scrambled Eggs with cheese\n• Classic French Omelet\n• Egg Fried Rice\n• Breakfast Burrito Bowl",
    "Wonderful ingredients! Here are some healthy options:\n• Tropical Smoothie Bowl\n• Berry Protein Smoothie\n• Fresh Fruit Parfait\n• Acai Bowl with granola",
    "Nice selection! You could whip up:\n• Colorful Buddha Bowl\n• Quinoa Power Salad\n• Roasted Veggie Bowl\n• Mediterranean Bowl with hummus"
  ];

  const extractMealSuggestions = (text: string): string[] => {
    const lines = text.split('\n');
    const suggestions: string[] = [];
    
    lines.forEach(line => {
      if (line.includes('•')) {
        const meal = line.replace('•', '').trim();
        if (meal) suggestions.push(meal);
      }
    });
    
    return suggestions;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setValidationError('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponseText = botResponsesWithSuggestions[Math.floor(Math.random() * botResponsesWithSuggestions.length)];
      const suggestions = extractMealSuggestions(botResponseText);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
        hasMealSuggestions: suggestions.length > 0
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (suggestions.length > 0) {
        updateSuggestions(suggestions);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMealSubmit = (meal: string): boolean => {
    const success = addToHistory(meal);
    if (success) {
      setValidationError('');
    }
    return success;
  };

  const handleValidationError = (message: string) => {
    setValidationError(message);
    setTimeout(() => setValidationError(''), 5000);
  };

  const lastMessage = messages[messages.length - 1];
  const showMealInput = lastMessage?.isBot && lastMessage?.hasMealSuggestions;

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col border-orange-200 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold">Kitchen Assistant</h3>
              <p className="text-sm text-orange-100">Ask me about recipes!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="text-white hover:bg-white/20"
          >
            History ({history.length})
          </Button>
        </div>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl whitespace-pre-line ${
                  message.isBot
                    ? 'bg-orange-50 text-gray-800 border border-orange-100'
                    : 'bg-orange-500 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t border-orange-100">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What ingredients do you have?"
              className="flex-1 rounded-full border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
            <Button
              onClick={handleSendMessage}
              className="rounded-full bg-orange-500 hover:bg-orange-600 px-4"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Meal Input - appears after AI suggests meals */}
      {showMealInput && (
        <div className="w-full max-w-2xl mx-auto">
          <MealInput
            suggestions={extractMealSuggestions(lastMessage.text)}
            onMealSubmit={handleMealSubmit}
            onValidationError={handleValidationError}
          />
        </div>
      )}

      {/* Validation Error */}
      {validationError && (
        <div className="w-full max-w-2xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{validationError}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History Display */}
      {showHistory && (
        <div className="w-full max-w-2xl mx-auto">
          <MealHistory
            history={history}
            onClearHistory={clearHistory}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
