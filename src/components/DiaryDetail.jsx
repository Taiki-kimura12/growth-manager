import React, { useState } from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import useDiaryStore from '../store/diaryStore';

const DiaryDetail = ({ diary, onClose, onEdit }) => {
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);

  const handleDelete = () => {
    if (window.confirm('本当にこの日記を削除しますか？')) {
      deleteDiary(diary.id);
      onClose();
    }
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
            <h2 className="text-lg font-semibold text-gray-900">{diary.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(diary)}
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
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span>{diary.date}</span>
                <span>•</span>
                <span>{diary.words}文字</span>
              </div>
              <div className="flex gap-2 mb-4">
                {diary.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {diary.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;