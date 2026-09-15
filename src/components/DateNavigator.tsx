import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw, Sparkles } from 'lucide-react';

interface DateNavigatorProps {
  currentDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
  onResetDay: () => void;
  onLoadSample: () => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onDateChange,
  onResetDay,
  onLoadSample,
}) => {
  const parseDate = (dStr: string) => {
    const [y, m, d] = dStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((checkDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays === 1) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const shiftDate = (offset: number) => {
    const current = parseDate(currentDate);
    current.setDate(current.getDate() + offset);
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    onDateChange(`${y}-${m}-${d}`);
  };

  const dateObj = parseDate(currentDate);
  const formattedTitle = formatDate(dateObj);
  const longSub = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      id="date-navigator-container"
      className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-5 py-3 rounded-3xl border border-stone-200/90 shadow-sm"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          id="btn-prev-day"
          onClick={() => shiftDate(-1)}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Previous day"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-2">
          <Calendar className="w-4 h-4 text-stone-600" />
          <div className="text-center sm:text-left">
            <span id="label-current-day" className="font-bold text-sm text-stone-900 leading-none block">
              {formattedTitle}
            </span>
            <span className="text-[11px] text-stone-600 font-medium leading-none block mt-1">
              {longSub}
            </span>
          </div>
        </div>

        <button
          id="btn-next-day"
          onClick={() => shiftDate(1)}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Next day"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="btn-load-sample-data"
          onClick={onLoadSample}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Fill with realistic sample meals to test meter"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Load Demo Day</span>
        </button>

        <button
          id="btn-clear-day"
          onClick={onResetDay}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 border border-stone-200/80 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Clear today's logs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Day</span>
        </button>
      </div>
    </div>
  );
};
