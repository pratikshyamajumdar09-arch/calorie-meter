import React from 'react';
import { DailyGoals } from '../types';

interface MacroMeterProps {
  protein: number;
  carbs: number;
  fat: number;
  goals: DailyGoals;
}

export const MacroMeter: React.FC<MacroMeterProps> = ({
  protein,
  carbs,
  fat,
  goals,
}) => {
  const proteinKcal = Math.round(protein * 4);
  const carbsKcal = Math.round(carbs * 4);
  const fatKcal = Math.round(fat * 9);
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  const proteinRatio = totalMacroKcal > 0 ? Math.round((proteinKcal / totalMacroKcal) * 100) : 0;
  const carbsRatio = totalMacroKcal > 0 ? Math.round((carbsKcal / totalMacroKcal) * 100) : 0;
  const fatRatio = totalMacroKcal > 0 ? Math.round((fatKcal / totalMacroKcal) * 100) : 0;

  const macros = [
    {
      id: 'macro-protein',
      name: 'Protein',
      current: Math.round(protein),
      goal: goals.proteinGoal,
      unit: 'g',
      kcal: proteinKcal,
      ratio: proteinRatio,
      color: 'bg-sky-500',
      trackColor: 'bg-sky-100',
      textColor: 'text-sky-700',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'macro-carbs',
      name: 'Carbs',
      current: Math.round(carbs),
      goal: goals.carbsGoal,
      unit: 'g',
      kcal: carbsKcal,
      ratio: carbsRatio,
      color: 'bg-amber-500',
      trackColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'macro-fat',
      name: 'Fat',
      current: Math.round(fat),
      goal: goals.fatGoal,
      unit: 'g',
      kcal: fatKcal,
      ratio: fatRatio,
      color: 'bg-rose-500',
      trackColor: 'bg-rose-100',
      textColor: 'text-rose-700',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <div
      id="macro-meter-card"
      className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900 tracking-tight">Macronutrient Split</h2>
            <p className="text-xs text-stone-500">Grams consumed toward daily macro goals</p>
          </div>
          {totalMacroKcal > 0 && (
            <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              {proteinRatio}% P · {carbsRatio}% C · {fatRatio}% F
            </span>
          )}
        </div>

        {/* Stacked ratio visual bar */}
        {totalMacroKcal > 0 ? (
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden flex mb-6">
            <div
              style={{ width: `${proteinRatio}%` }}
              className="bg-sky-500 h-full transition-all duration-500"
              title={`Protein: ${proteinRatio}% (${proteinKcal} kcal)`}
            />
            <div
              style={{ width: `${carbsRatio}%` }}
              className="bg-amber-500 h-full transition-all duration-500"
              title={`Carbs: ${carbsRatio}% (${carbsKcal} kcal)`}
            />
            <div
              style={{ width: `${fatRatio}%` }}
              className="bg-rose-500 h-full transition-all duration-500"
              title={`Fat: ${fatRatio}% (${fatKcal} kcal)`}
            />
          </div>
        ) : (
          <div className="w-full h-2.5 bg-stone-100 rounded-full mb-6" />
        )}

        {/* Individual Macro Meters */}
        <div className="space-y-4">
          {macros.map((m) => {
            const pct = m.goal > 0 ? Math.min(Math.round((m.current / m.goal) * 100), 100) : 0;

            return (
              <div key={m.id} id={m.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">{m.name}</span>
                    <span className="text-[10px] text-stone-600 font-mono">
                      ({m.kcal} kcal)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-stone-900">{m.current}</span>
                    <span className="text-stone-600">/ {m.goal}{m.unit}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${m.badgeBg}`}>
                      {pct}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className={`w-full h-2 rounded-full ${m.trackColor} overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${m.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
        <span>Target: 4 kcal/g protein & carbs · 9 kcal/g fat</span>
        <span className="font-medium text-stone-700">Daily Balance</span>
      </div>
    </div>
  );
};
