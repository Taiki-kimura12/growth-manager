import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useReadingStore = create(
  persist(
    (set, get) => ({
      readings: [
        {
          id: 'reading_001',
          bookTitle: 'エンジニアリング組織論への招待',
          date: '2025-11-01',
          learning: '不確実性を減らすことがチームの生産性向上につながる。定期的なコミュニケーションの重要性を再認識。',
          tags: ['マネジメント', '組織'],
          createdAt: '2025-11-01T20:00:00'
        },
        {
          id: 'reading_002',
          bookTitle: 'リファクタリング 第2版',
          date: '2025-10-29',
          learning: 'コードの可読性は将来の自分への投資。小さなリファクタリングを積み重ねることで大きな改善につながる。',
          tags: ['プログラミング', '設計'],
          createdAt: '2025-10-29T21:00:00'
        },
        {
          id: 'reading_003',
          bookTitle: 'アトミックハビッツ',
          date: '2025-10-25',
          learning: '1%の改善を毎日続けることで、1年後には37倍の成長になる。小さな習慣の積み重ねこそが成功への道。',
          tags: ['習慣', '自己啓発'],
          createdAt: '2025-10-25T19:00:00'
        }
      ],

      addReading: (reading) => {
        const newReading = {
          ...reading,
          id: `reading_${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          readings: [newReading, ...state.readings]
        }));
      },

      updateReading: (id, updates) => {
        set((state) => ({
          readings: state.readings.map((reading) =>
            reading.id === id ? { ...reading, ...updates } : reading
          )
        }));
      },

      deleteReading: (id) => {
        set((state) => ({
          readings: state.readings.filter((reading) => reading.id !== id)
        }));
      },

      getReadingById: (id) => {
        return get().readings.find((reading) => reading.id === id);
      },

      getRecentReadings: (limit = 5) => {
        return get().readings.slice(0, limit);
      }
    }),
    {
      name: 'reading-storage',
    }
  )
);

export default useReadingStore;