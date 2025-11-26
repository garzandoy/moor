'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

export default function ProfileCompletenessWidget({ profile }) {
  const router = useRouter();

  const completionItems = [
    {
      id: 'name',
      label: 'Add your name',
      completed: !!profile?.full_name,
      action: () => router.push('/dashboard/more'),
    },
    {
      id: 'lesson',
      label: 'Complete first lesson',
      completed: (profile?.lessons_completed || 0) > 0,
      action: () => router.push('/dashboard/lessons'),
    },
    {
      id: 'goal',
      label: 'Set daily goal',
      completed: profile?.daily_goal_minutes && profile.daily_goal_minutes !== 15,
      action: () => router.push('/dashboard/more'),
    },
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const totalCount = completionItems.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);
  const isFullyCompleted = completedCount === totalCount;

  // Don't show if fully completed
  if (isFullyCompleted) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Complete Your Profile</h3>
          <p className="text-xs text-gray-600">Unlock all features</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
          <div className="text-xs text-gray-600">{completedCount}/{totalCount}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Completion Items */}
      <div className="space-y-2">
        {completionItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            disabled={item.completed}
            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
              item.completed
                ? 'bg-white/50 cursor-default'
                : 'bg-white hover:bg-blue-50 cursor-pointer'
            }`}
          >
            {item.completed ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
            <span className={`text-sm flex-1 text-left ${
              item.completed ? 'text-gray-500 line-through' : 'text-gray-900 font-medium'
            }`}>
              {item.label}
            </span>
            {!item.completed && (
              <ArrowRight className="w-4 h-4 text-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}