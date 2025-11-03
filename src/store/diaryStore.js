import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDiaryStore = create(
  persist(
    (set, get) => ({
      // 初期データ
      diaries: [
        {
          id: 'diary_001',
          date: '2025-11-02',
          title: '新しい挑戦を始める決意',
          content: '今日から個人開発プロジェクトを本格的に始めることにした。毎日の積み重ねが大きな成果につながると信じて...',
          words: 1247,
          tags: ['目標', '決意'],
          createdAt: '2025-11-02T10:00:00',
          updatedAt: '2025-11-02T10:00:00'
        },
        {
          id: 'diary_002',
          date: '2025-11-01',
          title: '習慣化の力を実感',
          content: '継続は力なり。この言葉の意味が最近ようやく理解できるようになってきた。小さな行動の積み重ねが...',
          words: 1089,
          tags: ['習慣', '成長'],
          createdAt: '2025-11-01T09:00:00',
          updatedAt: '2025-11-01T09:00:00'
        },
        {
          id: 'diary_003',
          date: '2025-10-31',
          title: '月末の振り返りと学び',
          content: '10月を振り返って。目標に対する進捗は予定通りではないものの、多くの学びがあった1ヶ月だった...',
          words: 1523,
          tags: ['振り返り', '学び'],
          createdAt: '2025-10-31T20:00:00',
          updatedAt: '2025-10-31T20:00:00'
        }
      ],

      // 日記を追加
      addDiary: (diary) => {
        const newDiary = {
          ...diary,
          id: `diary_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          diaries: [newDiary, ...state.diaries]
        }));
      },

      // 日記を更新
      updateDiary: (id, updates) => {
        set((state) => ({
          diaries: state.diaries.map((diary) =>
            diary.id === id
              ? { ...diary, ...updates, updatedAt: new Date().toISOString() }
              : diary
          )
        }));
      },

      // 日記を削除
      deleteDiary: (id) => {
        set((state) => ({
          diaries: state.diaries.filter((diary) => diary.id !== id)
        }));
      },

      // IDで日記を取得
      getDiaryById: (id) => {
        return get().diaries.find((diary) => diary.id === id);
      },

      // 最近の日記を取得
      getRecentDiaries: (limit = 3) => {
        return get().diaries.slice(0, limit);
      }
    }),
    {
      name: 'diary-storage', // localStorageのキー名
    }
  )
);

export default useDiaryStore;