
import { useState, useCallback } from 'react';

export interface MealHistoryItem {
  id: string;
  mealName: string;
  timestamp: Date;
  originalSuggestion: string;
}

export const useMealHistory = () => {
  const [history, setHistory] = useState<MealHistoryItem[]>([]);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const updateSuggestions = useCallback((suggestions: string[]) => {
    setCurrentSuggestions(suggestions);
  }, []);

  const validateMeal = useCallback((input: string): string | null => {
    if (!currentSuggestions.length) return null;
    
    const normalizedInput = input.toLowerCase().trim();
    
    // Find exact or partial match
    const matchedSuggestion = currentSuggestions.find(suggestion => {
      const normalizedSuggestion = suggestion.toLowerCase();
      return normalizedSuggestion.includes(normalizedInput) || 
             normalizedInput.includes(normalizedSuggestion);
    });

    return matchedSuggestion || null;
  }, [currentSuggestions]);

  const addToHistory = useCallback((mealName: string): boolean => {
    const matchedSuggestion = validateMeal(mealName);
    
    if (!matchedSuggestion) {
      return false;
    }

    const newHistoryItem: MealHistoryItem = {
      id: Date.now().toString(),
      mealName: mealName.trim(),
      timestamp: new Date(),
      originalSuggestion: matchedSuggestion
    };

    setHistory(prev => [newHistoryItem, ...prev]);
    return true;
  }, [validateMeal]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    currentSuggestions,
    updateSuggestions,
    validateMeal,
    addToHistory,
    clearHistory
  };
};
