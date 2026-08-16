import React from 'react';
import { Play, Settings } from 'lucide-react';

export default function StartScreen({ onStart, onEdit }) {
  return (
    <div className="card text-center" style={{ padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
        ÔN LẠI KIẾN THỨC
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        10 câu hỏi trắc nghiệm – Kiểm tra mức độ hiểu bài
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <button className="btn" onClick={onStart} style={{ width: '100%', maxWidth: '300px' }}>
          BẮT ĐẦU <Play size={24} />
        </button>
        <button className="btn btn-secondary" onClick={onEdit} style={{ width: '100%', maxWidth: '300px' }}>
          CHỈNH SỬA CÂU HỎI <Settings size={24} />
        </button>
      </div>
    </div>
  );
}
