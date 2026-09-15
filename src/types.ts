export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  mealType: MealType;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  portion?: string;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  name: string;
  caloriesBurned: number;
  durationMinutes?: number;
  timestamp: string;
}

export interface DailyGoals {
  calorieGoal: number;
  proteinGoal: number; // grams
  carbsGoal: number;   // grams
  fatGoal: number;     // grams
}

export interface DayData {
  date: string; // YYYY-MM-DD
  foods: FoodEntry[];
  activities: ActivityEntry[];
}

export interface FoodPreset {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  portion: string;
}
