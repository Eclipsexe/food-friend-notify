
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SavedRecipe {
  id: string;
  ingredients: string[];
  name: string;
  steps: string[];
  time: string | null;
}

interface Schedule {
  date: string;
  is_soon: boolean;
  name: string;
  time: string;
}

interface UserData {
  email: string;
  savedrecipes: SavedRecipe[];
  schedules: Schedule[];
  username: string;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysUntilExpiry: number;
  quantity: string;
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Rate limiting: 30 seconds cooldown
  const RATE_LIMIT_MS = 30000;

  const calculateDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const transformSchedulesToInventory = (schedules: Schedule[]): InventoryItem[] => {
    return schedules.map((schedule, index) => ({
      id: `schedule-${index}`,
      name: schedule.name,
      category: 'Scheduled',
      expiryDate: schedule.date,
      daysUntilExpiry: calculateDaysUntilExpiry(schedule.date),
      quantity: '1 item'
    }));
  };

  const fetchUserData = useCallback(async () => {
    if (!currentUser?.uid) return;

    const now = Date.now();
    if (now - lastFetch < RATE_LIMIT_MS) {
      console.log('Rate limit: Skipping API call');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://example.top/user/${currentUser.uid}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserData = await response.json();
      setUserData(data);
      
      // Transform schedules to inventory items
      const inventory = transformSchedulesToInventory(data.schedules);
      setInventoryItems(inventory);
      
      setLastFetch(now);
      
      console.log('User data fetched successfully:', data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      setError(errorMessage);
      console.error('Error fetching user data:', err);
      
      toast({
        title: "Error",
        description: "Failed to fetch your data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, lastFetch, toast]);

  const refreshUserData = useCallback(async () => {
    setLastFetch(0); // Reset rate limit
    await fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (currentUser?.uid) {
      fetchUserData();
    }
  }, [currentUser?.uid, fetchUserData]);

  return {
    userData,
    inventoryItems,
    loading,
    error,
    refreshUserData,
    canRefresh: Date.now() - lastFetch >= RATE_LIMIT_MS
  };
};

export default useUserData;
