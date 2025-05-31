
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
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

  const botResponses = [
    "That sounds delicious! With those ingredients, you could make a wonderful stir-fry! 🥘",
    "Great choice! How about a fresh salad or maybe a hearty soup? 🥗",
    "Perfect! Those ingredients would make an amazing pasta dish! 🍝",
    "Wonderful! You could whip up a tasty omelet or scrambled eggs! 🥚",
    "Excellent! Those would be perfect for a healthy smoothie bowl! 🍓",
    "Nice selection! How about making a colorful Buddha bowl? 🥙"
  ];

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

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col border-orange-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-lg">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <MessageCircle className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-poppins font-semibold">Kitchen Assistant</h3>
          <p className="text-sm text-orange-100">Ask me about recipes!</p>
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
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
  );
};

export default Chatbot;
