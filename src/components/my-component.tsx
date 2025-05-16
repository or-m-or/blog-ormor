'use client'

import { useState } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Hello from MyComponent 👋</h2>
      <p>버튼 클릭 횟수: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '0.5rem'
        }}
      >
        클릭하기
      </button>
    </div>
  );
}