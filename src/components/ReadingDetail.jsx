import React from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import useReadingStore from '../store/readingStore';

const ReadingDetail = ({ reading, onClose, onEdit }) => {
  const deleteReading = useReadingStore((state) => state.deleteReading);

  const handleDelete = () => {
    if (window.confirm('本当にこの読書ノートを削除しますか？')) {
      deleteReading(reading.id);
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
            <h2 className="text-lg font-semibold text-gray-900">{reading.bookTitle}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(reading)}
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
              <p className="text-sm text-gray-500 mb-3">{reading.date}</p>
              <div className="flex gap-2 mb-4">
                {reading.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">学んだこと</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {reading.learning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDetail;