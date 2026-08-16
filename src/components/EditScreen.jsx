import React, { useState } from 'react';
import { Save, ArrowLeft, RefreshCw } from 'lucide-react';
import { questions as defaultQuestions } from '../data/questions';

export default function EditScreen({ questions, onSave, onBack, onRestore }) {
  // Use a deep copy to allow editing without mutating the original state immediately
  const [editedQuestions, setEditedQuestions] = useState(JSON.parse(JSON.stringify(questions)));
  const [hasChanges, setHasChanges] = useState(false);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...editedQuestions];
    newQuestions[index].question = value;
    setEditedQuestions(newQuestions);
    setHasChanges(true);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...editedQuestions];
    newQuestions[qIndex].options[optIndex] = value;
    setEditedQuestions(newQuestions);
    setHasChanges(true);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...editedQuestions];
    newQuestions[qIndex].correctAnswer = parseInt(value, 10);
    setEditedQuestions(newQuestions);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Validation
    for (let i = 0; i < editedQuestions.length; i++) {
      const q = editedQuestions[i];
      if (!q.question.trim()) {
        alert(`Lỗi: Câu ${i + 1} không được để trống nội dung!`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          alert(`Lỗi: Đáp án ${String.fromCharCode(65 + j)} của câu ${i + 1} không được để trống!`);
          return;
        }
      }
      if (q.correctAnswer === null || q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
        alert(`Lỗi: Câu ${i + 1} phải có 1 đáp án đúng!`);
        return;
      }
    }

    onSave(editedQuestions);
    setHasChanges(false);
    alert('Đã lưu thay đổi!');
    onBack(false); // Force back without confirm since we just saved
  };

  const handleBack = () => {
    if (hasChanges) {
      if (window.confirm('Bạn có thay đổi chưa được lưu. Bạn có muốn rời khỏi trang không?')) {
        onBack(true);
      }
    } else {
      onBack(true);
    }
  };

  const handleRestore = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục toàn bộ câu hỏi mặc định không?')) {
      onRestore(defaultQuestions);
      setEditedQuestions(JSON.parse(JSON.stringify(defaultQuestions)));
      setHasChanges(false);
      alert('Đã khôi phục câu hỏi mặc định!');
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Chỉnh Sửa Câu Hỏi</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }} onClick={handleRestore}>
            <RefreshCw size={16} /> KHÔI PHỤC MẶC ĐỊNH
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }} onClick={handleBack}>
            <ArrowLeft size={16} /> QUAY LẠI
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {editedQuestions.map((q, qIndex) => (
          <div key={q.id} className="review-item" style={{ backgroundColor: 'var(--neutral-bg)', border: '1px solid var(--neutral-border)' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '1rem' }}>CÂU {qIndex + 1}</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nội dung câu hỏi:</label>
              <textarea 
                className="edit-input" 
                rows="3" 
                value={q.question} 
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 'bold', width: '20px' }}>{String.fromCharCode(65 + optIndex)}.</span>
                  <input 
                    type="text" 
                    className="edit-input" 
                    value={opt} 
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    placeholder={`Đáp án ${String.fromCharCode(65 + optIndex)}`}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--neutral-hover)', borderRadius: '8px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Đáp án đúng:</label>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {q.options.map((_, optIndex) => (
                  <label key={optIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name={`correct-${qIndex}`} 
                      value={optIndex} 
                      checked={q.correctAnswer === optIndex}
                      onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                      style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                    />
                    <span style={{ fontWeight: q.correctAnswer === optIndex ? 'bold' : 'normal' }}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center" style={{ position: 'sticky', bottom: '20px', zIndex: 10 }}>
        <button className="btn" onClick={handleSave} style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <Save size={24} /> LƯU THAY ĐỔI
        </button>
      </div>
    </div>
  );
}
