import React, { useState } from 'react';
import { X, Target, Check } from 'lucide-react';
import { DailyGoals } from '../types';

interface GoalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoals: DailyGoals;
  onSaveGoals: (goals: DailyGoals) => void;
}

export const GoalSettingsModal: React.FC<GoalSettingsModalProps> = ({
  isOpen,
  onClose,
  currentGoals,
  onSaveGoals,
}) => {
  const [calorieGoal, setCalorieGoal] = useState(currentGoals.calorieGoal);
  const [proteinGoal, setProteinGoal] = useState(currentGoals.proteinGoal);
  const [carbsGoal, setCarbsGoal] = useState(currentGoals.carbsGoal);
  const [fatGoal, setFatGoal] = useState(currentGoals.fatGoal);

  if (!isOpen) return null;

  // Preset plans that automatically adjust calories and macros
  const presets = [
    { label: 'Weight Loss (Deficit)', calories: 1700, p: 130, c: 165, f: 55 },
    { label: 'Maintenance (Balanced)', calories: 2000, p: 130, c: 220, f: 65 },
    { label: 'Muscle Gain (Surplus)', calories: 2500, p: 170, c: 280, f: 75 },
    { label: 'High Protein / Cut', calories: 1800, p: 160, c: 150, f: 60 },
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setCalorieGoal(p.calories);
    setProteinGoal(p.p);
    setCarbsGoal(p.c);
    setFatGoal(p.f);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGoals({
      calorieGoal: Math.max(500, Number(calorieGoal) || 2000),
      proteinGoal: Math.max(10, Number(proteinGoal) || 120),
      carbsGoal: Math.max(10, Number(carbsGoal) || 200),
      fatGoal: Math.max(5, Number(fatGoal) || 60),
    });
    onClose();
  };

  return (
    <div
      id="goal-settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="goal-settings-modal-container"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Meter Targets</h3>
              <p className="text-xs text-stone-500">Configure your daily calorie budget & macros</p>
            </div>
          </div>
          <button
            id="btn-close-goal-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Goal Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`btn-preset-goal-${idx}`}
                  onClick={() => applyPreset(preset)}
                  className={`p-2.5 text-left rounded-2xl border transition-all text-xs cursor-pointer ${
                    calorieGoal === preset.calories
                      ? 'bg-amber-50/70 border-amber-400 text-stone-900 font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className="font-bold">{preset.label}</div>
                  <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                    {preset.calories} kcal · {preset.p}g P
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Calorie Goal Slider + Input */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-700">
                Daily Calorie Target
              </label>
              <span className="text-sm font-extrabold text-stone-900 font-mono bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                {calorieGoal} kcal
              </span>
            </div>
            <input
              id="slider-calorie-goal"
              type="range"
              min="1200"
              max="4000"
              step="50"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-600 mt-1 font-mono">
              <span>1,200 kcal</span>
              <span>2,600 kcal</span>
              <span>4,000 kcal</span>
            </div>
          </div>

          {/* Macros Targets Grid */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Macro Targets (grams)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-sky-50/50 border border-sky-200/80 rounded-2xl p-2.5">
                <span className="block text-[11px] font-semibold text-sky-700 mb-1">Protein</span>
                <div className="flex items-center gap-1">
                  <input
                    id="input-target-protein"
                    type="number"
                    min="20"
                    max="400"
                    value={proteinGoal}
                    onChange={(e) => setProteinGoal(Number(e.target.value))}
                    className="w-full bg-white px-2 py-1 text-xs rounded-lg border border-sky-200 font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] font-medium text-stone-500">g</span>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-2.5">
                <span className="block text-[11px] font-semibold text-amber-700 mb-1">Carbs</span>
                <div className="flex items-center gap-1">
                  <input
                    id="input-target-carbs"
                    type="number"
                    min="20"
                    max="600"
                    value={carbsGoal}
                    onChange={(e) => setCarbsGoal(Number(e.target.value))}
                    className="w-full bg-white px-2 py-1 text-xs rounded-lg border border-amber-200 font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] font-medium text-stone-500">g</span>
                </div>
              </div>

              <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-2.5">
                <span className="block text-[11px] font-semibold text-rose-700 mb-1">Fat</span>
                <div className="flex items-center gap-1">
                  <input
                    id="input-target-fat"
                    type="number"
                    min="10"
                    max="200"
                    value={fatGoal}
                    onChange={(e) => setFatGoal(Number(e.target.value))}
                    className="w-full bg-white px-2 py-1 text-xs rounded-lg border border-rose-200 font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] font-medium text-stone-500">g</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="btn-save-goals"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Update Calorie Target
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
