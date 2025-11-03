import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import useReadingStore from '../store/readingStore';
import ReadingDetail from './ReadingDetail';
import Modal from './Modal';
import ReadingForm from './ReadingForm';

const Reading = () => {
  const readings = useReadingStore((state) => state.readings);
  const [selectedReading, setSelectedReading] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReading, setEditingReading] = useState(null);

  const handleReadingClick = (reading) => {
    setSelectedReading(reading);
  };

  const handleEdit = (reading) => {
    setSelectedReading(null);
    setEditingReading(reading);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingReading(null);
  };

  // 今月の学び数を計算
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthReadings = readings.filter(r => new Date(r.date) >= firstDayOfMonth).length;

  // 読了した本の数（ユニークな本のタイトル）
  const uniqueBooks = [...new Set(readings.map(r => r.bookTitle))].length;

  return (
    <>
      <div className="space-y-6">
        {/* 統計 */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">今月の学び</p>
              <p className="text-2xl font-semibold text-gray-900">{thisMonthReadings}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">読了した本</p>
              <p className="text-2xl font-semibold text-gray-900">{uniqueBooks}冊</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">累計ノート</p>
              <p className="text-2xl font-semibold text-gray-900">{readings.length}</p>
            </div>
          </div>
        </div>

        {/* 読書ノートリスト */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">最近の学び</h3>
          </div>
          {readings.length > 0 ? (
            readings.map((note) => (
              <div 
                key={note.id} 
                onClick={() => handleReadingClick(note)}
                className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{note.bookTitle}</h4>
                      <span className="text-xs text-gray-400">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{note.learning}</p>
                    <div className="flex gap-1.5 mt-3">
                      {note.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              読書ノートがまだありません
            </div>
          )}
        </div>
      </div>

      {/* 読書ノート詳細モーダル */}
      {selectedReading && (
        <ReadingDetail
          reading={selectedReading}
          onClose={() => setSelectedReading(null)}
          onEdit={handleEdit}
        />
      )}

      {/* 編集モーダル */}
      <Modal
        isOpen={isEditing}
        onClose={closeEdit}
        title="読書ノートを編集"
      >
        <ReadingForm 
          onClose={closeEdit}
          editReading={editingReading}
        />
      </Modal>
    </>
  );
};

export default Reading;