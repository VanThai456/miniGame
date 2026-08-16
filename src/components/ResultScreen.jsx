import React from 'react';
import { RotateCcw, List } from 'lucide-react';

export default function ResultScreen({ score, total, onRestart, onReview }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="card text-center" style={{ padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
        HOÀN THÀNH!
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Bạn đã trả lời đúng {score}/{total} câu
      </p>
      
      <div style={{
        fontSize: '4rem', 
        fontWeight: 'bold', 
        color: percentage >= 50 ? 'var(--correct-border)' : 'var(--incorrect-border)',
        marginBottom: '3rem'
      }}>
        {percentage}%
      </div>

      <div className="flex-center gap-4" style={{ flexWrap: 'wrap' }}>
        <button className="btn" onClick={onRestart}>
          <RotateCcw size={20} /> LÀM LẠI
        </button>
        <button className="btn btn-secondary" onClick={onReview}>
          <List size={20} /> XEM LẠI ĐÁP ÁN
        </button>
      </div>
    </div>
  );
}
