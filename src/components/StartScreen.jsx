import React from 'react';
import { Play } from 'lucide-react';

export default function StartScreen({ onStart }) {
  return (
    <div className="card text-center" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '8px', height: '40px', backgroundColor: 'var(--accent-color)', borderRadius: '4px' }}></div>
        <h1 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-heading)', fontWeight: 'bold' }}>
          ÔN LẠI KIẾN THỨC
        </h1>
      </div>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: '500' }}>
        10 câu hỏi trắc nghiệm – Kiểm tra mức độ hiểu bài
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <button className="btn" onClick={onStart} style={{ width: '100%', maxWidth: '300px' }}>
          BẮT ĐẦU <Play size={24} />
        </button>
      </div>
    </div>
  );
}
