import React from 'react';
import { Calendar, BookOpen, Target, Clock, ChevronRight } from 'lucide-react';
import useDiaryStore from '../store/diaryStore';
import useGoalStore from '../store/goalStore';
import useReadingStore from '../store/readingStore';

const Dashboard = () => {
  // ストアからデータを取得
  const diaries = useDiaryStore((state) => state.diaries);
  const goals = useGoalStore((state) => state.goals);
  const readings = useReadingStore((state) => state.readings);
  const getRecentDiaries = useDiaryStore((state) => state.getRecentDiaries);
  const getUpcomingGoals = useGoalStore((state) => state.getUpcomingGoals);

  // 今日の日記の文字数を計算
  const today = new Date().toISOString().split('T')[0];
  const todayDiary = diaries.find(d => d.date === today);
  const todayWords = todayDiary ? todayDiary.words : 0;

  // 今週の読書ノート数を計算
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekReadings = readings.filter(r => new Date(r.date) >= oneWeekAgo).length;

  // 目標の達成率を計算
  const activeGoals = goals.filter(g => g.status === 'active');
  const totalProgress = activeGoals.reduce((sum, g) => sum + g.progress, 0);
  const avgProgress = activeGoals.length > 0 ? Math.round(totalProgress / activeGoals.length) : 0;
  const completedGoals = activeGoals.filter(g => g.progress === 100).length;

  // 最近の日記を取得
  const recentDiaries = getRecentDiaries(3);

  // 期限が近い目標を取得
  const upcomingGoals = getUpcomingGoals(3);

  return (
    <div className="space-y-6">
      {/* 今日のサマリー */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
          <p className="text-sm text-gray-500 mt-1">今日も着実に成長しています</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">日記</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{todayWords}</p>
              <p className="text-xs text-gray-500 mt-1">今日の文字数</p>
            </div>
            <div className="bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">読書</span>
                <BookOpen className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{thisWeekReadings}</p>
              <p className="text-xs text-gray-500 mt-1">今週の学び</p>
            </div>
            <div className="bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">目標</span>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{completedGoals}/{activeGoals.length}</p>
              <p className="text-xs text-gray-500 mt-1">達成率 {avgProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 期限が近い目標 */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">期限が近い目標</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            すべて表示
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {upcomingGoals.length > 0 ? (
            upcomingGoals.map((goal) => (
              <div key={goal.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                        {goal.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {goal.deadline}まで
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
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-sm text-gray-500">
              目標がまだありません
            </div>
          )}
        </div>
      </div>

      {/* 最近の日記 */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">最近の日記</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            すべて表示
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentDiaries.length > 0 ? (
            recentDiaries.map((entry) => (
              <div key={entry.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{entry.title}</h4>
                      <span className="text-xs text-gray-500">{entry.words}語</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{entry.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{entry.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-sm text-gray-500">
              日記がまだありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;