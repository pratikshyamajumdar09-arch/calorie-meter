import React from 'react';
import { Flame, Plus, Trash2 } from 'lucide-react';
import { ActivityEntry } from '../types';

interface ActivitySectionProps {
  activities: ActivityEntry[];
  onOpenAdd: () => void;
  onDeleteActivity: (id: string) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  onOpenAdd,
  onDeleteActivity,
}) => {
  const totalBurned = activities.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  return (
    <div
      id="activity-section-card"
      className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                Burned & Workouts
              </h3>
              <p className="text-[11px] text-stone-600 font-medium">
                {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600 font-mono bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              -{totalBurned} kcal
            </span>
            <button
              id="btn-add-activity-trigger"
              onClick={onOpenAdd}
              className="w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
              title="Add activity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {activities.length === 0 ? (
            <div
              onClick={onOpenAdd}
              className="py-4 text-center border border-dashed border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-50 transition-colors"
            >
              <p className="text-xs text-stone-600 font-medium">
                No exercise recorded today
              </p>
              <span className="text-[11px] text-rose-600 font-semibold mt-0.5 inline-block">
                + Log workout or burn
              </span>
            </div>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                id={`activity-item-${act.id}`}
                className="group flex items-center justify-between p-2.5 rounded-2xl bg-rose-50/30 hover:bg-rose-50/60 border border-rose-100 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-semibold text-stone-900 truncate">
                    {act.name}
                  </div>
                  {act.durationMinutes && (
                    <div className="text-[10px] text-stone-600 mt-0.5">
                      {act.durationMinutes} mins
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-rose-600 font-mono">
                    -{act.caloriesBurned} kcal
                  </span>
                  <button
                    id={`btn-delete-activity-${act.id}`}
                    onClick={() => onDeleteActivity(act.id)}
                    className="opacity-60 group-hover:opacity-100 text-stone-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-100/50 transition-all cursor-pointer"
                    title="Delete activity"
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
