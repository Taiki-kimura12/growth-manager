import React, { useState } from 'react';
import { Clock, Filter, Search, ChevronRight, MoreVertical, Circle } from 'lucide-react';
import useGoalStore from '../store/goalStore';
import GoalDetail from './GoalDetail';
import Modal from './Modal';
import GoalForm from './GoalForm';

const Goals = () => {
  const [selectedGoalType, setSelectedGoalType] = useState('all');
  const goals = useGoalStore((state) => state.goals);
  const getGoalsByType = useGoalStore((state) => state.getGoalsByType);
  
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // フィルタリングされた目標を取得
  const filteredGoals = getGoalsByType(selectedGoalType);

  // カテゴリ別にグループ化
  const personalGoals = filteredGoals.filter(g => g.category === '個人' && g.status === 'active');
  const workGoals = filteredGoals.filter(g => g.category === '仕事' && g.status === 'active');
  const privateGoals = filteredGoals.filter(g => g.category === 'プライベート' && g.status === 'active');

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
  };

  const handleEdit = (goal) => {
    setSelectedGoal(null);
    setEditingGoal(goal);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingGoal(null);
  };

  const GoalItem = ({ goal }) => (
    <div 
      onClick={() => handleGoalClick(goal)}
      className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <button className="mt-0.5" onClick={(e) => e.stopPropagation()}>
          <Circle className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              {goal.deadline}
            </div>
            <div className="flex-1 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600" 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{goal.progress}%</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          className="p-1 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(goal);
          }}
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* フィルター */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedGoalType('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedGoalType === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setSelectedGoalType('短期')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedGoalType === '短期'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              短期
            </button>
            <button
              onClick={() => setSelectedGoalType('中期')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedGoalType === '中期'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              中期
            </button>
            <button
              onClick={() => setSelectedGoalType('長期')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedGoalType === '長期'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              長期
            </button>
            <div className="flex-1" />
            <button className="p-2 hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-50">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* 目標リスト - 個人 */}
        {personalGoals.length > 0 && (
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">個人</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {personalGoals.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        )}

        {/* 目標リスト - 仕事 */}
        {workGoals.length > 0 && (
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">仕事</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {workGoals.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        )}

        {/* 目標リスト - プライベート */}
        {privateGoals.length > 0 && (
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">プライベート</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {privateGoals.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        )}

        {filteredGoals.length === 0 && (
          <div className="bg-white border border-gray-200 px-6 py-12 text-center">
            <p className="text-sm text-gray-500">目標がまだありません</p>
          </div>
        )}
      </div>

      {/* 目標詳細モーダル */}
      {selectedGoal && (
        <GoalDetail
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onEdit={handleEdit}
        />
      )}

      {/* 編集モーダル */}
      <Modal
        isOpen={isEditing}
        onClose={closeEdit}
        title="目標を編集"
      >
        <GoalForm 
          onClose={closeEdit}
          editGoal={editingGoal}
        />
      </Modal>
    </>
  );
};

export default Goals;