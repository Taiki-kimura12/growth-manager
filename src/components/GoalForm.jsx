import React, { useState, useEffect } from 'react';
import useGoalStore from '../store/goalStore';

const GoalForm = ({ onClose, onSuccess, editGoal = null }) => {
  const addGoal = useGoalStore((state) => state.addGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '個人',
    type: '短期',
    deadline: '',
    progress: 0,
    description: ''
  });

  // 編集モードの場合、初期値を設定
  useEffect(() => {
    if (editGoal) {
      setFormData({
        title: editGoal.title,
        category: editGoal.category,
        type: editGoal.type,
        deadline: editGoal.deadline,
        progress: editGoal.progress,
        description: editGoal.description || ''
      });
    }
  }, [editGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.deadline) {
      alert('タイトルと期限を入力してください');
      return;
    }

    if (editGoal) {
      // 編集モード
      updateGoal(editGoal.id, formData);
    } else {
      // 新規作成モード
      addGoal(formData);
    }

    onSuccess?.();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          目標タイトル
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="達成したい目標..."
          required
        />
      </div>

      {/* カテゴリと期間タイプ */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="個人">個人</option>
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            期間
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="短期">短期（〜3ヶ月）</option>
            <option value="中期">中期（3〜12ヶ月）</option>
            <option value="長期">長期（1年以上）</option>
          </select>
        </div>
      </div>

      {/* 期限 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          期限
        </label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* 進捗率 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          進捗率: {formData.progress}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* 詳細説明 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          詳細説明（任意）
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          placeholder="目標の詳細や達成方法..."
        />
      </div>

      {/* ボタン */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          {editGoal ? '更新' : '作成'}
        </button>
      </div>
    </form>
  );
};

export default GoalForm;