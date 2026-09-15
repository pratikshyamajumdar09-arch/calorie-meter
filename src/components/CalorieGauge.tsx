import React from 'react';
import { Flame, UtensilsCrossed, TrendingUp, AlertTriangle, CheckCircle2, Dumbbell } from 'lucide-react';

interface CalorieGaugeProps {
  consumed: number;
  burned: number;
  goal: number;
  onEditGoal: () => void;
  onAddBurned: () => void;
}

export const CalorieGauge: React.FC<CalorieGaugeProps> = ({
  consumed,
  burned,
  goal,
  onEditGoal,
  onAddBurned,
}) => {
  const netCalories = Math.max(0, consumed - burned);
  const remaining = goal - netCalories;
  const isOver = remaining < 0;
  const overAmount = Math.abs(remaining);
  
  // Percentage of goal consumed (net)
  const percent = goal > 0 ? (netCalories / goal) * 100 : 0;
  const clampedPercentForArc = Math.min(Math.max(percent, 0), 125); // Cap arc visualization at 125%

  // Arc math: 260 degree arc centered at 150, 150 with r = 105
  // Start at 140° (bottom-left), End at 400° (bottom-right)
  const cx = 150;
  const cy = 150;
  const r = 105;
  const arcSweepDeg = 260;
  const startAngleDeg = 140;
  
  // Circumference of full circle = 2 * PI * 105 = 659.734
  // Arc length = 659.734 * (260 / 360) = 476.47
  const arcLength = 2 * Math.PI * r * (arcSweepDeg / 360);
  const strokeOffset = arcLength - (clampedPercentForArc / 100) * (arcLength * (100 / 125));

  // Pointer position at current percentage
  const pointerAngleDeg = startAngleDeg + (clampedPercentForArc / 125) * arcSweepDeg;
  const pointerRad = (pointerAngleDeg * Math.PI) / 180;
  const pointerX = cx + r * Math.cos(pointerRad);
  const pointerY = cy + r * Math.sin(pointerRad);

  // Status color logic
  let meterToneColor = '#10b981'; // emerald-500
  let meterGradientId = 'meterGradientNormal';
  let statusBadgeText = 'On Track';
  let StatusIcon = CheckCircle2;
  let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';

  if (percent >= 100) {
    meterToneColor = '#f43f5e'; // rose-500
    meterGradientId = 'meterGradientOver';
    statusBadgeText = `${overAmount} kcal over budget`;
    StatusIcon = AlertTriangle;
    statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (percent >= 85) {
    meterToneColor = '#f59e0b'; // amber-500
    meterGradientId = 'meterGradientWarm';
    statusBadgeText = `${remaining} kcal remaining`;
    StatusIcon = TrendingUp;
    statusBadgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
  } else {
    statusBadgeText = `${remaining} kcal remaining`;
    statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  // Ticks at 0%, 25%, 50%, 75%, 100%, 125%
  const ticks = [0, 25, 50, 75, 100, 125];

  return (
    <div 
      id="calorie-meter-card"
      className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 flex flex-col items-center relative overflow-hidden"
    >
      {/* Top Controls Header */}
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-stone-500">Live Meter</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="btn-edit-daily-goal"
            onClick={onEditGoal}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-200/70 cursor-pointer"
            title="Adjust daily calorie target"
          >
            Target: <span className="text-stone-900 font-bold">{goal.toLocaleString()}</span> kcal
          </button>
        </div>
      </div>

      {/* Main Radial Meter Graphic */}
      <div className="relative w-[280px] h-[260px] sm:w-[320px] sm:h-[290px] flex items-center justify-center">
        <svg
          viewBox="0 0 300 290"
          className="w-full h-full transform transition-transform"
          aria-hidden="true"
        >
          <defs>
            {/* Standard Green-Teal Gradient */}
            <linearGradient id="meterGradientNormal" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Approaching Budget Amber Gradient */}
            <linearGradient id="meterGradientWarm" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Over Budget Crimson Gradient */}
            <linearGradient id="meterGradientOver" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 69.5 217.4 A 105 105 0 1 1 230.5 217.4"
            fill="none"
            stroke="#f5f5f4"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Budget Mark Indicator (at 100% position = 80% along 125% sweep = 348°) */}
          {/* 140° + (100 / 125) * 260° = 348° */}
          <circle
            cx={cx + r * Math.cos((348 * Math.PI) / 180)}
            cy={cy + r * Math.sin((348 * Math.PI) / 180)}
            r="4"
            fill="#a8a29e"
            className="transition-all"
            title="100% Goal Target Mark"
          />

          {/* Active Meter Fill Arc */}
          <path
            d="M 69.5 217.4 A 105 105 0 1 1 230.5 217.4"
            fill="none"
            stroke={`url(#${meterGradientId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={Math.max(0, strokeOffset)}
            style={{
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.4s ease',
            }}
          />

          {/* Radial Tick Lines & Numbers */}
          {ticks.map((tickVal) => {
            const tickAngleDeg = startAngleDeg + (tickVal / 125) * arcSweepDeg;
            const tickRad = (tickAngleDeg * Math.PI) / 180;
            const innerR = tickVal === 100 ? 86 : 89;
            const outerR = 95;
            const textR = 75;

            const x1 = cx + innerR * Math.cos(tickRad);
            const y1 = cy + innerR * Math.sin(tickRad);
            const x2 = cx + outerR * Math.cos(tickRad);
            const y2 = cy + outerR * Math.sin(tickRad);
            const tx = cx + textR * Math.cos(tickRad);
            const ty = cy + textR * Math.sin(tickRad) + 3;

            return (
              <g key={tickVal}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={tickVal === 100 ? '#78716c' : '#d6d3d1'}
                  strokeWidth={tickVal === 100 ? 2 : 1.5}
                  strokeLinecap="round"
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  fontSize={tickVal === 100 ? "9" : "8"}
                  fontWeight={tickVal === 100 ? "700" : "500"}
                  fill={tickVal === 100 ? "#57534e" : "#a8a29e"}
                >
                  {tickVal}%
                </text>
              </g>
            );
          })}

          {/* Glowing Needle / Pointer Head */}
          {clampedPercentForArc > 0 && (
            <g
              style={{
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <circle
                cx={pointerX}
                cy={pointerY}
                r="11"
                fill="#ffffff"
                stroke={meterToneColor}
                strokeWidth="4"
                filter="url(#glow)"
              />
              <circle
                cx={pointerX}
                cy={pointerY}
                r="4"
                fill={meterToneColor}
              />
            </g>
          )}
        </svg>

        {/* Central Display Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6 pointer-events-none select-none">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-600 mb-0.5">
            Net Consumed
          </span>
          <div className="flex items-baseline gap-1">
            <span 
              id="calorie-meter-primary-val" 
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 font-mono"
            >
              {netCalories.toLocaleString()}
            </span>
            <span className="text-stone-600 font-medium text-sm">kcal</span>
          </div>

          {/* Status badge */}
          <div 
            id="calorie-meter-status-pill"
            className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs ${statusBadgeClass}`}
          >
            <StatusIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{statusBadgeText}</span>
          </div>

          {/* Percentage badge */}
          <span className="mt-1 text-[11px] font-medium text-stone-600">
            {Math.round(percent)}% of {goal} kcal goal
          </span>
        </div>
      </div>

      {/* Sub-metrics breakdown bar */}
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 mt-2 pt-4 border-t border-stone-100">
        {/* Total Food Logged */}
        <div 
          id="stat-box-food"
          className="bg-stone-50/80 rounded-2xl p-3 border border-stone-200/60 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-medium">Food</span>
          </div>
          <span className="text-lg font-bold text-stone-900 font-mono">
            {consumed.toLocaleString()}
          </span>
          <span className="text-[10px] text-stone-600 font-medium">kcal logged</span>
        </div>

        {/* Calories Burned */}
        <div 
          id="stat-box-burned"
          className="bg-stone-50/80 rounded-2xl p-3 border border-stone-200/60 flex flex-col items-center text-center relative group"
        >
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-medium">Burned</span>
          </div>
          <span className="text-lg font-bold text-rose-600 font-mono">
            -{burned.toLocaleString()}
          </span>
          <button
            id="btn-quick-add-activity"
            onClick={onAddBurned}
            className="mt-1 text-[10px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
            title="Log workout or activity"
          >
            + Log Activity
          </button>
        </div>

        {/* Budget Remaining */}
        <div 
          id="stat-box-remaining"
          className={`rounded-2xl p-3 border flex flex-col items-center text-center ${
            isOver 
              ? 'bg-rose-50/50 border-rose-200/60' 
              : 'bg-stone-50/80 border-stone-200/60'
          }`}
        >
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium">{isOver ? 'Surplus' : 'Remaining'}</span>
          </div>
          <span className={`text-lg font-bold font-mono ${isOver ? 'text-rose-600' : 'text-emerald-700'}`}>
            {isOver ? `+${overAmount}` : remaining.toLocaleString()}
          </span>
          <span className="text-[10px] text-stone-600 font-medium">kcal {isOver ? 'over' : 'left'}</span>
        </div>
      </div>
    </div>
  );
};
