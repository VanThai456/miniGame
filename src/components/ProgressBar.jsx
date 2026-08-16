import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round(((current) / total) * 100);

  return (
    <div className="mb-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
        <span>Câu {current} / {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
