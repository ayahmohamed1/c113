import React from 'react';

interface MenuProps {
  onBack: () => void;
  onNext: () => void;
  onSelect: (page: string) => void;
}

export default function MenuPage({ onBack, onNext, onSelect }: MenuProps) {
  return (
    <div className="content-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="gift-title">اختر <span>مفاجأة</span></h1>
        <p className="description">اضغط على أي ذكرى لاكتشافها</p>
      </div>

      {/* شبكة الاختيار بـ 4 مربعات */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px', 
        width: '100%', 
        maxWidth: '360px',
        marginBottom: '1.5rem' 
      }}>
        {/* 1. الكيك */}
        <div 
          onClick={() => onSelect('cake')}
          className="polaroid-card"
          style={{ cursor: 'pointer', textAlign: 'center', padding: '15px 10px' }}
        >
          <span style={{ fontSize: '1.8rem' }}>🎂</span>
          <p style={{ color: '#f472b6', marginTop: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>كيكة العيد</p>
        </div>
        
        {/* 2. الرسالة */}
        <div 
          onClick={() => onSelect('message')}
          className="polaroid-card"
          style={{ cursor: 'pointer', textAlign: 'center', padding: '15px 10px' }}
        >
          <span style={{ fontSize: '1.8rem' }}>💌</span>
          <p style={{ color: '#f472b6', marginTop: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>الرسالة</p>
        </div>

        {/* 3. الصور / Moments */}
        <div 
          onClick={() => onSelect('moments')}
          className="polaroid-card"
          style={{ cursor: 'pointer', textAlign: 'center', padding: '15px 10px' }}
        >
          <span style={{ fontSize: '1.8rem' }}>📸</span>
          <p style={{ color: '#f472b6', marginTop: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>ذكرياتنا</p>
        </div>

        {/* 4. الفيديو */}
        <div 
          onClick={() => onSelect('video')}
          className="polaroid-card"
          style={{ cursor: 'pointer', textAlign: 'center', padding: '15px 10px' }}
        >
          <span style={{ fontSize: '1.8rem' }}>🎬</span>
          <p style={{ color: '#f472b6', marginTop: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>فيديو خاص</p>
        </div>
      </div>

      {/* زراير الـ Back والـ Next */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button className="btn-secondary" onClick={onBack} style={{ margin: 0 }}>
          السابق ←
        </button>
        <button className="btn-primary" onClick={onNext}>
          → التالي
        </button>
      </div>
    </div>
  );
}