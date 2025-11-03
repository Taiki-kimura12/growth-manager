import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import useDiaryStore from '../store/diaryStore';
import DiaryDetail from './DiaryDetail';
import Modal from './Modal';
import DiaryForm from './DiaryForm';

const Diary = () => {
  const diaries = useDiaryStore((state) => state.diaries);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDiary, setEditingDiary] = useState(null);

  const handleDiaryClick = (diary) => {
    setSelectedDiary(diary);
  };

  const handleEdit = (diary) => {
    setSelectedDiary(null);
    setEditingDiary(diary);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingDiary(null);
  };

  return (
    <>
      <div className="space-y-6">
        {/* 検索バー */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="日記を検索..."
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 日記エントリーリスト */}
        <div className="bg-white border border-gray-200">
          {diaries.length > 0 ? (
            diaries.map((entry) => (
              <div 
                key={entry.id} 
                onClick={() => handleDiaryClick(entry)}
                className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{entry.title}</h3>
                      <span className="text-xs text-gray-500">{entry.words}語</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{entry.date}</span>
                      <div className="flex gap-1.5">
                        {entry.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              日記がまだありません
            </div>
          )}
        </div>
      </div>

      {/* 日記詳細モーダル */}
      {selectedDiary && (
        <DiaryDetail
          diary={selectedDiary}
          onClose={() => setSelectedDiary(null)}
          onEdit={handleEdit}
        />
      )}

      {/* 編集モーダル */}
      <Modal
        isOpen={isEditing}
        onClose={closeEdit}
        title="日記を編集"
      >
        <DiaryForm 
          onClose={closeEdit}
          editDiary={editingDiary}
        />
      </Modal>
    </>
  );
};

export default Diary;