import React, { useState } from 'react';
import { Calendar, BookOpen, Target, TrendingUp, Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import Diary from './components/Diary';
import Reading from './components/Reading';
import Modal from './components/Modal';
import DiaryForm from './components/DiaryForm';
import GoalForm from './components/GoalForm';
import ReadingForm from './components/ReadingForm';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('diary'); // 'diary' | 'goal' | 'reading'

  const openCreateModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'diary':
        return '新しい日記を作成';
      case 'goal':
        return '新しい目標を作成';
      case 'reading':
        return '新しい読書ノートを作成';
      default:
        return '新規作成';
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'diary':
        return <DiaryForm onClose={() => setIsModalOpen(false)} />;
      case 'goal':
        return <GoalForm onClose={() => setIsModalOpen(false)} />;
      case 'reading':
        return <ReadingForm onClose={() => setIsModalOpen(false)} />;
      default:
        return null;
    }
  };

  // アクティブなタブに応じて適切な作成タイプを決定
  const getCreateType = () => {
    switch (activeTab) {
      case 'diary':
        return 'diary';
      case 'goals':
        return 'goal';
      case 'reading':
        return 'reading';
      default:
        return 'diary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-900">Growth Tracker</h1>
            </div>
            <button 
              onClick={() => openCreateModal(getCreateType())}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              新規作成
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* サイドナビゲーション */}
          <nav className="w-56 flex-shrink-0">
            <div className="bg-white border border-gray-200 sticky top-24">
              {[
                { id: 'dashboard', label: 'ダッシュボード', icon: TrendingUp },
                { id: 'goals', label: '目標管理', icon: Target },
                { id: 'diary', label: '日記', icon: Calendar },
                { id: 'reading', label: '読書ノート', icon: BookOpen }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-gray-50 text-gray-900 border-l-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* メインコンテンツ */}
          <main className="flex-1 min-w-0">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'goals' && <Goals />}
            {activeTab === 'diary' && <Diary />}
            {activeTab === 'reading' && <Reading />}
          </main>
        </div>
      </div>

      {/* フローティングアクションボタン */}
      <button 
        onClick={() => openCreateModal(getCreateType())}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default App;