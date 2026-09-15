import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Settings2, Flame, UtensilsCrossed, Gauge } from 'lucide-react';
import { MealType, FoodEntry, ActivityEntry, DailyGoals, DayData } from './types';
import { DEFAULT_GOALS } from './data/presets';
import { CalorieGauge } from './components/CalorieGauge';
import { MacroMeter } from './components/MacroMeter';
import { MealSection } from './components/MealSection';
import { ActivitySection } from './components/ActivitySection';
import { AddFoodModal } from './components/AddFoodModal';
import { AddActivityModal } from './components/AddActivityModal';
import { GoalSettingsModal } from './components/GoalSettingsModal';
import { DateNavigator } from './components/DateNavigator';

// Initial sample data for initial demonstration
const getSampleDayData = (dateStr: string): DayData => ({
  date: dateStr,
  foods: [
    {
      id: 'sample-1',
      name: 'Rolled Oats with Honey & Berries',
      calories: 280,
      protein: 9,
      carbs: 52,
      fat: 4,
      portion: '1 bowl',
      mealType: 'breakfast',
      timestamp: '08:30 AM',
    },
    {
      id: 'sample-2',
      name: 'Eggs (2 scrambled) with Olive Oil',
      calories: 210,
      protein: 14,
      carbs: 2,
      fat: 16,
      portion: '2 large eggs',
      mealType: 'breakfast',
      timestamp: '08:45 AM',
    },
    {
      id: 'sample-3',
      name: 'Grilled Chicken Breast with Brown Rice',
      calories: 450,
      protein: 44,
      carbs: 48,
      fat: 7,
      portion: '1 plate',
      mealType: 'lunch',
      timestamp: '01:15 PM',
    },
    {
      id: 'sample-4',
      name: 'Medium Banana',
      calories: 105,
      protein: 1,
      carbs: 27,
      fat: 0,
      portion: '1 medium',
      mealType: 'snack',
      timestamp: '04:00 PM',
    },
  ],
  activities: [
    {
      id: 'act-sample-1',
      name: 'Brisk Morning Walk',
      caloriesBurned: 140,
      durationMinutes: 30,
      timestamp: '07:30 AM',
    },
  ],
});

function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function App() {
  const todayStr = useMemo(() => getTodayString(), []);
  const [currentDate, setCurrentDate] = useState<string>(todayStr);

  // Goals loaded from localStorage
  const [goals, setGoals] = useState<DailyGoals>(() => {
    try {
      const saved = localStorage.getItem('calorie_meter_goals');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_GOALS;
  });

  // Days data loaded from localStorage
  const [daysRecord, setDaysRecord] = useState<Record<string, DayData>>(() => {
    try {
      const saved = localStorage.getItem('calorie_meter_days');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Pre-populate today with friendly sample data so user sees active meter immediately
    return {
      [todayStr]: getSampleDayData(todayStr),
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('calorie_meter_goals', JSON.stringify(goals));
    } catch {
      // ignore
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem('calorie_meter_days', JSON.stringify(daysRecord));
    } catch {
      // ignore
    }
  }, [daysRecord]);

  // Current day's data
  const currentDayData = daysRecord[currentDate] || {
    date: currentDate,
    foods: [],
    activities: [],
  };

  // Modals state
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [addFoodMealType, setAddFoodMealType] = useState<MealType>('breakfast');
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Aggregated totals
  const totalCaloriesConsumed = currentDayData.foods.reduce((acc, f) => acc + f.calories, 0);
  const totalCaloriesBurned = currentDayData.activities.reduce((acc, a) => acc + a.caloriesBurned, 0);
  const totalProtein = currentDayData.foods.reduce((acc, f) => acc + f.protein, 0);
  const totalCarbs = currentDayData.foods.reduce((acc, f) => acc + f.carbs, 0);
  const totalFat = currentDayData.foods.reduce((acc, f) => acc + f.fat, 0);

  // Handlers
  const handleOpenAddFood = (mealType: MealType = 'breakfast') => {
    setAddFoodMealType(mealType);
    setIsAddFoodOpen(true);
  };

  const handleAddFood = (foodData: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...foodData,
      id: 'food_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setDaysRecord((prev) => {
      const existing = prev[currentDate] || { date: currentDate, foods: [], activities: [] };
      return {
        ...prev,
        [currentDate]: {
          ...existing,
          foods: [...existing.foods, newEntry],
        },
      };
    });
  };

  const handleDeleteFood = (foodId: string) => {
    setDaysRecord((prev) => {
      const existing = prev[currentDate];
      if (!existing) return prev;
      return {
        ...prev,
        [currentDate]: {
          ...existing,
          foods: existing.foods.filter((f) => f.id !== foodId),
        },
      };
    });
  };

  const handleAddActivity = (activityData: Omit<ActivityEntry, 'id' | 'timestamp'>) => {
    const newActivity: ActivityEntry = {
      ...activityData,
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setDaysRecord((prev) => {
      const existing = prev[currentDate] || { date: currentDate, foods: [], activities: [] };
      return {
        ...prev,
        [currentDate]: {
          ...existing,
          activities: [...existing.activities, newActivity],
        },
      };
    });
  };

  const handleDeleteActivity = (actId: string) => {
    setDaysRecord((prev) => {
      const existing = prev[currentDate];
      if (!existing) return prev;
      return {
        ...prev,
        [currentDate]: {
          ...existing,
          activities: existing.activities.filter((a) => a.id !== actId),
        },
      };
    });
  };

  const handleResetDay = () => {
    setDaysRecord((prev) => ({
      ...prev,
      [currentDate]: {
        date: currentDate,
        foods: [],
        activities: [],
      },
    }));
  };

  const handleLoadSample = () => {
    setDaysRecord((prev) => ({
      ...prev,
      [currentDate]: getSampleDayData(currentDate),
    }));
  };

  return (
    <div id="calorie-meter-app" className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header
        id="app-header"
        className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 shadow-2xs"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-stone-900 leading-tight">
                  Calorie Meter
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-none mt-0.5">
                Daily Caloric Balance & Macro Tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-header-settings"
              onClick={() => setIsGoalModalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200/70"
              title="Configure Daily Calorie Goals"
            >
              <Settings2 className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">Daily Targets</span>
            </button>

            <button
              id="btn-header-log-food"
              onClick={() => handleOpenAddFood('lunch')}
              className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Food</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main id="main-content-dashboard" className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Date Selector Banner */}
        <DateNavigator
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onResetDay={handleResetDay}
          onLoadSample={handleLoadSample}
        />

        {/* Meter Section & Macro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calorie Gauge Radial Card */}
          <div className="lg:col-span-7">
            <CalorieGauge
              consumed={totalCaloriesConsumed}
              burned={totalCaloriesBurned}
              goal={goals.calorieGoal}
              onEditGoal={() => setIsGoalModalOpen(true)}
              onAddBurned={() => setIsAddActivityOpen(true)}
            />
          </div>

          {/* Macro Split Progress Card */}
          <div className="lg:col-span-5">
            <MacroMeter
              protein={totalProtein}
              carbs={totalCarbs}
              fat={totalFat}
              goals={goals}
            />
          </div>
        </div>

        {/* Meal Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">Daily Meal Log</h2>
              <p className="text-xs text-stone-500">Record food items across your daily meals</p>
            </div>
            <button
              id="btn-add-food-banner"
              onClick={() => handleOpenAddFood('breakfast')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Food Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <MealSection
              type="breakfast"
              foods={currentDayData.foods.filter((f) => f.mealType === 'breakfast')}
              onOpenAdd={handleOpenAddFood}
              onDeleteFood={handleDeleteFood}
            />
            <MealSection
              type="lunch"
              foods={currentDayData.foods.filter((f) => f.mealType === 'lunch')}
              onOpenAdd={handleOpenAddFood}
              onDeleteFood={handleDeleteFood}
            />
            <MealSection
              type="dinner"
              foods={currentDayData.foods.filter((f) => f.mealType === 'dinner')}
              onOpenAdd={handleOpenAddFood}
              onDeleteFood={handleDeleteFood}
            />
            <MealSection
              type="snack"
              foods={currentDayData.foods.filter((f) => f.mealType === 'snack')}
              onOpenAdd={handleOpenAddFood}
              onDeleteFood={handleDeleteFood}
            />
          </div>
        </div>

        {/* Workouts & Activity Log */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">Burned Calories & Activity</h2>
              <p className="text-xs text-stone-500">Exercise deducts from your net calorie meter</p>
            </div>
            <button
              id="btn-log-exercise-banner"
              onClick={() => setIsAddActivityOpen(true)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Workout</span>
            </button>
          </div>

          <ActivitySection
            activities={currentDayData.activities}
            onOpenAdd={() => setIsAddActivityOpen(true)}
            onDeleteActivity={handleDeleteActivity}
          />
        </div>
      </main>

      {/* Footer */}
      <footer id="app-footer" className="bg-white border-t border-stone-200/80 py-4 px-4 text-center text-xs text-stone-500">
        <p>Calorie Meter · Accurate visual caloric balance, macro tracking, and net energy balance</p>
      </footer>

      {/* Modals */}
      <AddFoodModal
        isOpen={isAddFoodOpen}
        onClose={() => setIsAddFoodOpen(false)}
        onAddFood={handleAddFood}
        defaultMealType={addFoodMealType}
      />

      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAddActivity={handleAddActivity}
      />

      <GoalSettingsModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoals={goals}
        onSaveGoals={setGoals}
      />
    </div>
  );
}
