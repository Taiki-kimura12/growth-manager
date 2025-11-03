import React from 'react';
import { X, Edit2, Trash2, Clock } from 'lucide-react';
import useGoalStore from '../store/goalStore';

const GoalDetail = ({ goal, onClose, onEdit }) => {
  const deleteGoal = useGoalStore((state) => state.deleteGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);

  const handleDelete = () => {
    if (window.confirm('本当にこの目標を削除しますか？')) {
      deleteGoal(goal.id);
      onClose();
    }
  };

  const handleProgressChange = (newProgress) => {
    updateGoal(goal.id, { progress: newProgress });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-2xl shadow-xl">
          {/* ヘッダー */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{goal.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(goal)}
                className="p-2 hover:bg-gray-100 transition-colors"
                title="編集"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-50 transition-colors"
                title="削除"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* コンテンツ */}
          <div className="p-6 space-y-6">
            {/* 基本情報 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">カテゴリ</p>
                <p className="text-sm font-medium text-gray-900">{goal.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">期間</p>
                <p className="text-sm font-medium text-gray-900">{goal.type}</p>
              </div>
            </div>

            {/* 期限 */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>期限: {goal.deadline}</span>
              </div>
            </div>

            {/* 進捗率 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">進捗率</p>
                <p className="text-lg font-semibold text-gray-900">{goal.progress}%</p>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* 説明 */}
            {goal.description && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">詳細説明</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {goal.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;