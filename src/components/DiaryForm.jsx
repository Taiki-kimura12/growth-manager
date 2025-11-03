import React, { useState, useEffect } from 'react';
import useDiaryStore from '../store/diaryStore';

const DiaryForm = ({ onClose, onSuccess, editDiary = null }) => {
  const addDiary = useDiaryStore((state) => state.addDiary);
  const updateDiary = useDiaryStore((state) => state.updateDiary);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // 編集モードの場合、初期値を設定
  useEffect(() => {
    if (editDiary) {
      setFormData({
        date: editDiary.date,
        title: editDiary.title,
        content: editDiary.content,
        tags: editDiary.tags || []
      });
    }
  }, [editDiary]);

  // 文字数カウント
  useEffect(() => {
    setWordCount(formData.content.length);
  }, [formData.content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('タイトルと内容を入力してください');
      return;
    }

    if (editDiary) {
      // 編集モード
      updateDiary(editDiary.id, {
        ...formData,
        words: wordCount
      });
    } else {
      // 新規作成モード
      addDiary({
        ...formData,
        words: wordCount
      });
    }

    onSuccess?.();
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 日付 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          日付
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          タイトル
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="今日の出来事..."
          required
        />
      </div>

      {/* 内容 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            内容
          </label>
          <span className="text-xs text-gray-500">{wordCount}文字</span>
        </div>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="10"
          placeholder="今日の出来事や気づきを記録しましょう..."
          required
        />
      </div>

      {/* タグ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          タグ
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="タグを入力してEnter"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
          >
            追加
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ボタン */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          {editDiary ? '更新' : '保存'}
        </button>
      </div>
    </form>
  );
};

export default DiaryForm;