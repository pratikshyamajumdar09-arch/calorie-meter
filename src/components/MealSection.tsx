import React from 'react';
import { Plus, Trash2, Coffee, Sun, Moon, Apple } from 'lucide-react';
import { FoodEntry, MealType } from '../types';

interface MealSectionProps {
  type: MealType;
  foods: FoodEntry[];
  onOpenAdd: (mealType: MealType) => void;
  onDeleteFood: (id: string) => void;
}

const mealConfig: Record<
  MealType,
  {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    emoji: string;
  }
> = {
  breakfast: {
    title: 'Breakfast',
    icon: Coffee,
    accentColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    emoji: '🌅',
  },
  lunch: {
    title: 'Lunch',
    icon: Sun,
    accentColor: 'text-orange-600',
    badgeBg: 'bg-orange-50 text-orange-800 border-orange-200',
    emoji: '☀️',
  },
  dinner: {
    title: 'Dinner',
    icon: Moon,
    accentColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    emoji: '🌙',
  },
  snack: {
    title: 'Snacks',
    icon: Apple,
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    emoji: '🍎',
  },
};

export const MealSection: React.FC<MealSectionProps> = ({
  type,
  foods,
  onOpenAdd,
  onDeleteFood,
}) => {
  const config = mealConfig[type];
  const totalMealCalories = foods.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <div
      id={`meal-section-${type}`}
      className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between hover:border-stone-300 transition-colors"
    >
      <div>
        {/* Meal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl" role="img" aria-label={config.title}>
              {config.emoji}
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                {config.title}
              </h3>
              <p className="text-[11px] text-stone-600 font-medium">
                {foods.length} {foods.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-900 font-mono bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              {totalMealCalories} kcal
            </span>
            <button
              id={`btn-add-to-${type}`}
              onClick={() => onOpenAdd(type)}
              className="w-7 h-7 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
              title={`Add food to ${config.title}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div className="mt-3 space-y-2">
          {foods.length === 0 ? (
            <div
              onClick={() => onOpenAdd(type)}
              className="py-4 text-center border border-dashed border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-50 transition-colors"
            >
              <p className="text-xs text-stone-600 font-medium">
                No items logged yet
              </p>
              <span className="text-[11px] text-amber-700 font-semibold mt-0.5 inline-block">
                + Tap to log {config.title.toLowerCase()}
              </span>
            </div>
          ) : (
            foods.map((food) => (
              <div
                key={food.id}
                id={`food-item-${food.id}`}
                className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-50/70 hover:bg-stone-100/80 border border-stone-200/60 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-semibold text-stone-900 truncate">
                    {food.name}
                  </div>
                  <div className="text-[10px] text-stone-600 flex items-center gap-2 mt-0.5">
                    {food.portion && <span>{food.portion}</span>}
                    {(food.protein > 0 || food.carbs > 0 || food.fat > 0) && (
                      <>
                        <span>·</span>
                        <span className="text-sky-600">{food.protein}g P</span>
                        <span className="text-amber-600">{food.carbs}g C</span>
                        <span className="text-rose-600">{food.fat}g F</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    {food.calories} kcal
                  </span>
                  <button
                    id={`btn-delete-food-${food.id}`}
                    onClick={() => onDeleteFood(food.id)}
                    className="opacity-60 group-hover:opacity-100 text-stone-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
