import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGoalStore = create(
  persist(
    (set, get) => ({
      goals: [
        {
          id: 'goal_001',
          title: 'React完全理解のための学習',
          category: '個人',
          type: '短期',
          deadline: '2025-11-15',
          progress: 65,
          status: 'active',
          description: 'Reactの基礎から応用まで完全に理解する',
          createdAt: '2025-10-01T10:00:00',
          updatedAt: '2025-11-02T15:00:00'
        },
        {
          id: 'goal_002',
          title: 'プロジェクトα フェーズ1完了',
          category: '仕事',
          type: '短期',
          deadline: '2025-11-08',
          progress: 80,
          status: 'active',
          description: 'プロジェクトの第一フェーズを完了させる',
          createdAt: '2025-10-15T10:00:00',
          updatedAt: '2025-11-02T16:00:00'
        },
        {
          id: 'goal_003',
          title: '月次振り返りドキュメント作成',
          category: '個人',
          type: '短期',
          deadline: '2025-11-05',
          progress: 40,
          status: 'active',
          description: '毎月の振り返りを習慣化する',
          createdAt: '2025-10-20T10:00:00',
          updatedAt: '2025-11-01T14:00:00'
        },
        {
          id: 'goal_004',
          title: 'フルスタック開発スキル習得',
          category: '個人',
          type: '中期',
          deadline: '2026-03-31',
          progress: 25,
          status: 'active',
          description: 'フロントエンドとバックエンドの両方を習得',
          createdAt: '2025-09-01T10:00:00',
          updatedAt: '2025-11-01T10:00:00'
        },
        {
          id: 'goal_005',
          title: 'チームリーダーとしてのスキル向上',
          category: '仕事',
          type: '長期',
          deadline: '2026-06-30',
          progress: 35,
          status: 'active',
          description: 'リーダーシップスキルを磨く',
          createdAt: '2025-08-01T10:00:00',
          updatedAt: '2025-10-30T10:00:00'
        },
        {
          id: 'goal_006',
          title: '健康的な生活習慣の確立',
          category: 'プライベート',
          type: '短期',
          deadline: '2025-12-31',
          progress: 50,
          status: 'active',
          description: '運動と食事管理を習慣化',
          createdAt: '2025-09-15T10:00:00',
          updatedAt: '2025-11-01T09:00:00'
        },
        {
          id: 'goal_007',
          title: '月1回の新しい体験',
          category: 'プライベート',
          type: '短期',
          deadline: '2025-12-31',
          progress: 70,
          status: 'active',
          description: '新しいことに挑戦する習慣をつける',
          createdAt: '2025-10-01T10:00:00',
          updatedAt: '2025-11-02T10:00:00'
        }
      ],

      addGoal: (goal) => {
        const newGoal = {
          ...goal,
          id: `goal_${Date.now()}`,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          goals: [...state.goals, newGoal]
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
              : goal
          )
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        }));
      },

      getGoalById: (id) => {
        return get().goals.find((goal) => goal.id === id);
      },

      getGoalsByCategory: (category) => {
        if (category === 'all') return get().goals;
        return get().goals.filter((goal) => goal.category === category);
      },

      getGoalsByType: (type) => {
        if (type === 'all') return get().goals;
        return get().goals.filter((goal) => goal.type === type);
      },

      getUpcomingGoals: (limit = 5) => {
        const now = new Date();
        return get()
          .goals.filter((goal) => goal.status === 'active')
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, limit);
      }
    }),
    {
      name: 'goal-storage',
    }
  )
);

export default useGoalStore;