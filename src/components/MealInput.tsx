
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MealInputProps {
  suggestions: string[];
  onMealSubmit: (meal: string) => boolean;
  onValidationError: (message: string) => void;
}

const MealInput = ({ suggestions, onMealSubmit, onValidationError }: MealInputProps) => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      onValidationError(t('pleaseEnterMealName'));
      return;
    }

    setIsSubmitting(true);
    
    const isValid = onMealSubmit(inputValue);
    
    if (isValid) {
      setInputValue('');
    } else {
      onValidationError(t('pleaseChooseValidOption'));
    }
    
    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!suggestions.length) return null;

  return (
    <Card className="mt-4 border-green-200 bg-green-50">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{t('chooseMealFromSuggestions')}</span>
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMealNamePlaceholder')}
              className="flex-1 border-green-300 focus:border-green-500"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !inputValue.trim()}
              className="bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? t('adding') : t('addToHistory')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealInput;
