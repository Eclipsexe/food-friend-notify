
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ChatRequest {
  history: any[];
  prompt: {
    text: string;
  };
  promptlanguage: string;
}

interface Dish {
  dishName: string;
  portions: Record<string, string>;
  preparationSteps: string[];
}

interface ChatResponse {
  dishes: Dish[];
}

const useChatAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sendChatRequest = async (ingredients: string[], language: string = 'ENG'): Promise<Dish[]> => {
    setLoading(true);
    setError(null);

    try {
      const requestBody: ChatRequest = {
        history: [],
        prompt: {
          text: ingredients.join(',')
        },
        promptlanguage: language
      };

      const response = await fetch('https://example.top/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      console.log('Chat API response:', data);
      
      return data.dishes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get recipe suggestions';
      setError(errorMessage);
      console.error('Error calling chat API:', err);
      
      toast({
        title: "Error",
        description: "Failed to get recipe suggestions. Please try again.",
        variant: "destructive"
      });
      
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    sendChatRequest,
    loading,
    error
  };
};

export default useChatAPI;
