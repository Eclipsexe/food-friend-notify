
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, Clock } from "lucide-react";
import { MealHistoryItem } from "@/hooks/useMealHistory";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";

interface MealHistoryProps {
  history: MealHistoryItem[];
  onClearHistory: () => void;
}

const MealHistory = ({ history, onClearHistory }: MealHistoryProps) => {
  const { t } = useLanguage();

  if (history.length === 0) {
    return (
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-600">
            <History className="h-5 w-5" />
            <span>{t('mealHistory')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            {t('noMealsInHistory')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2 text-orange-600">
          <History className="h-5 w-5" />
          <span>{t('mealHistory')} ({history.length})</span>
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearHistory}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          {t('clearAll')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.mealName}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {format(item.timestamp, "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {t('from')} {item.originalSuggestion.slice(0, 20)}
              {item.originalSuggestion.length > 20 ? '...' : ''}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MealHistory;
