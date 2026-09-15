import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { MealType, FoodEntry } from '../types';
import { POPULAR_FOOD_PRESETS, ExtendedFoodPreset } from '../data/presets';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  defaultMealType: MealType;
}

type CategoryFilter = 'all' | 'breakfast' | 'meals' | 'proteins' | 'fruits-veg' | 'grains' | 'dairy' | 'snacks' | 'drinks';

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  onAddFood,
  defaultMealType,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [selectedMeal, setSelectedMeal] = useState<MealType>(defaultMealType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1);

  // Custom food form state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [customPortion, setCustomPortion] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: ExtendedFoodPreset) => {
    const mult = portionMultiplier;
    onAddFood({
      name: mult === 1 ? preset.name : `${preset.name} (${mult}x)`,
      calories: Math.round(preset.calories * mult),
      protein: Math.round(preset.protein * mult * 10) / 10,
      carbs: Math.round(preset.carbs * mult * 10) / 10,
      fat: Math.round(preset.fat * mult * 10) / 10,
      portion: mult === 1 ? preset.portion : `${mult}x ${preset.portion}`,
      mealType: selectedMeal,
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customCalories) return;

    const cal = Math.max(0, parseInt(customCalories, 10) || 0);
    const p = Math.max(0, parseFloat(customProtein) || 0);
    const c = Math.max(0, parseFloat(customCarbs) || 0);
    const f = Math.max(0, parseFloat(customFat) || 0);

    onAddFood({
      name: customName.trim(),
      calories: cal,
      protein: p,
      carbs: c,
      fat: f,
      portion: customPortion.trim() || '1 serving',
      mealType: selectedMeal,
    });

    // Reset and close
    setCustomName('');
    setCustomCalories('');
    setCustomProtein('');
    setCustomCarbs('');
    setCustomFat('');
    setCustomPortion('');
    onClose();
  };

  const handleSwitchToCustomWithName = (nameToPreFill: string) => {
    setCustomName(nameToPreFill);
    setActiveTab('custom');
  };

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'meals', label: 'Meals & Mains' },
    { id: 'proteins', label: 'Proteins & Meats' },
    { id: 'fruits-veg', label: 'Fruits & Veggies' },
    { id: 'grains', label: 'Grains & Breads' },
    { id: 'dairy', label: 'Dairy & Milks' },
    { id: 'snacks', label: 'Snacks & Treats' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredPresets = POPULAR_FOOD_PRESETS.filter((item) => {
    // Category check
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchesName = item.name.toLowerCase().includes(query);
    const matchesPortion = item.portion.toLowerCase().includes(query);
    const matchesTags = item.tags ? item.tags.some((tag) => tag.toLowerCase().includes(query)) : false;

    return matchesName || matchesPortion || matchesTags;
  });

  const mealTypes: { type: MealType; label: string; icon: string }[] = [
    { type: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { type: 'lunch', label: 'Lunch', icon: '☀️' },
    { type: 'dinner', label: 'Dinner', icon: '🌙' },
    { type: 'snack', label: 'Snack', icon: '🍎' },
  ];

  return (
    <div
      id="add-food-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="add-food-modal-container"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Food Database & Logger</h3>
              <p className="text-xs text-stone-500">Search over 100+ foods or enter custom items</p>
            </div>
          </div>
          <button
            id="btn-close-add-food-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meal Selector Row */}
        <div className="px-5 sm:px-6 pt-4">
          <label className="block text-xs font-semibold text-stone-600 mb-1.5">
            Log to Meal
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 rounded-2xl">
            {mealTypes.map(({ type, label, icon }) => (
              <button
                key={type}
                id={`btn-select-meal-${type}`}
                type="button"
                onClick={() => setSelectedMeal(type)}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  selectedMeal === type
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Quick Presets vs Custom Item */}
        <div className="px-5 sm:px-6 pt-3 flex border-b border-stone-100 gap-4">
          <button
            id="tab-presets"
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Food Search & Presets ({POPULAR_FOOD_PRESETS.length})
          </button>
          <button
            id="tab-custom"
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Custom Food
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'presets' ? (
            <div className="space-y-3.5">
              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-search-presets"
                  type="text"
                  placeholder="Search any food (e.g. egg, chicken, salmon, apple, pasta, coffee, pizza)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      id={`filter-cat-${cat.id}`}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap font-medium text-[11px] transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Serving size multiplier control */}
              <div className="flex items-center justify-between px-2 py-1 text-xs text-stone-500 bg-stone-50 rounded-xl border border-stone-200/60">
                <span className="font-medium text-[11px]">Portion size:</span>
                <div className="flex items-center gap-1">
                  {[0.5, 1, 1.5, 2].map((multiplier) => (
                    <button
                      key={multiplier}
                      type="button"
                      onClick={() => setPortionMultiplier(multiplier)}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold font-mono transition-colors cursor-pointer ${
                        portionMultiplier === multiplier
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {multiplier}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick helper when search text is active */}
              {searchQuery.trim() && (
                <div
                  onClick={() => handleSwitchToCustomWithName(searchQuery.trim())}
                  className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-semibold text-stone-900">
                      Add &ldquo;{searchQuery.trim()}&rdquo; as custom food
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-800">
                    <span>Enter macros</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Presets List */}
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {filteredPresets.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <p className="text-xs text-stone-600 font-medium">
                      No matching presets for &ldquo;{searchQuery}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSwitchToCustomWithName(searchQuery)}
                      className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add &ldquo;{searchQuery}&rdquo; as a custom food
                    </button>
                  </div>
                ) : (
                  filteredPresets.map((preset, idx) => {
                    const scaledCalories = Math.round(preset.calories * portionMultiplier);
                    const scaledProtein = Math.round(preset.protein * portionMultiplier * 10) / 10;
                    const scaledCarbs = Math.round(preset.carbs * portionMultiplier * 10) / 10;
                    const scaledFat = Math.round(preset.fat * portionMultiplier * 10) / 10;

                    return (
                      <div
                        key={idx}
                        id={`preset-item-${idx}`}
                        onClick={() => handleSelectPreset(preset)}
                        className="p-2.5 rounded-2xl border border-stone-200/70 hover:border-amber-300 bg-white hover:bg-amber-50/40 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="font-semibold text-xs text-stone-900 group-hover:text-amber-900 truncate">
                            {preset.name}
                          </div>
                          <div className="text-[11px] text-stone-600 flex items-center gap-2 mt-0.5">
                            <span>{portionMultiplier !== 1 ? `${portionMultiplier}x ` : ''}{preset.portion}</span>
                            <span>·</span>
                            <span className="text-sky-600">{scaledProtein}g P</span>
                            <span className="text-amber-600">{scaledCarbs}g C</span>
                            <span className="text-rose-600">{scaledFat}g F</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-stone-900 font-mono bg-stone-100 group-hover:bg-amber-100 px-2.5 py-1 rounded-full">
                            {scaledCalories} kcal
                          </span>
                          <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-amber-500 group-hover:text-white text-stone-500 flex items-center justify-center transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <form id="form-custom-food" onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Food Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-custom-food-name"
                  type="text"
                  required
                  placeholder="e.g. Greek Salad with Grilled Salmon"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Calories (kcal) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-custom-calories"
                    type="number"
                    min="0"
                    max="10000"
                    required
                    placeholder="e.g. 350"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Portion Size
                  </label>
                  <input
                    id="input-custom-portion"
                    type="text"
                    placeholder="e.g. 1 bowl, 200g, 1 slice"
                    value={customPortion}
                    onChange={(e) => setCustomPortion(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Optional Macros */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Macronutrients (Optional)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <span className="block text-[11px] font-medium text-sky-700 mb-1">Protein (g)</span>
                    <input
                      id="input-custom-protein"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-sky-50/50 border border-sky-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-amber-700 mb-1">Carbs (g)</span>
                    <input
                      id="input-custom-carbs"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-amber-50/50 border border-amber-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-rose-700 mb-1">Fat (g)</span>
                    <input
                      id="input-custom-fat"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={customFat}
                      onChange={(e) => setCustomFat(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-rose-50/50 border border-rose-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-custom-food"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
