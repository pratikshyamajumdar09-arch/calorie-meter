import React, { useState } from 'react';
import { X, Flame, Plus } from 'lucide-react';
import { ActivityEntry } from '../types';
import { ACTIVITY_PRESETS } from '../data/presets';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onAddActivity,
}) => {
  const [tab, setTab] = useState<'presets' | 'custom'>('presets');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [duration, setDuration] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof ACTIVITY_PRESETS[0]) => {
    onAddActivity({
      name: preset.name,
      caloriesBurned: preset.calories,
      durationMinutes: preset.duration,
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !calories) return;

    onAddActivity({
      name: name.trim(),
      caloriesBurned: Math.max(0, parseInt(calories, 10) || 0),
      durationMinutes: duration ? Math.max(0, parseInt(duration, 10) || 0) : undefined,
    });

    setName('');
    setCalories('');
    setDuration('');
    onClose();
  };

  return (
    <div
      id="add-activity-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="add-activity-modal-container"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Log Activity</h3>
              <p className="text-xs text-stone-500">Deduct burned calories from your meter</p>
            </div>
          </div>
          <button
            id="btn-close-activity-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 flex border-b border-stone-100 gap-4">
          <button
            id="tab-activity-presets"
            type="button"
            onClick={() => setTab('presets')}
            className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              tab === 'presets'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Quick Workouts
          </button>
          <button
            id="tab-activity-custom"
            type="button"
            onClick={() => setTab('custom')}
            className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              tab === 'custom'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Custom Activity
          </button>
        </div>

        <div className="p-5">
          {tab === 'presets' ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {ACTIVITY_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  id={`activity-preset-${idx}`}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-3 rounded-2xl border border-stone-200/70 hover:border-rose-300 bg-white hover:bg-rose-50/40 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <div className="font-semibold text-xs text-stone-900 group-hover:text-rose-900">
                      {preset.name}
                    </div>
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      {preset.duration} minutes
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-600 font-mono bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                      -{preset.calories} kcal
                    </span>
                    <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-rose-500 group-hover:text-white text-stone-500 flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="form-custom-activity" onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Activity Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-activity-name"
                  type="text"
                  required
                  placeholder="e.g. 5k Run, Badminton, Gardening"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Calories Burned <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-activity-calories"
                    type="number"
                    min="1"
                    max="5000"
                    required
                    placeholder="e.g. 250"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    id="input-activity-duration"
                    type="number"
                    min="1"
                    max="600"
                    placeholder="e.g. 30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                id="btn-submit-activity"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Log Burned Calories
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
