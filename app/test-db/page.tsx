'use client';
import { useState } from 'react';

export default function TestDB() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/service-requests');
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to connect' });
    }
    setLoading(false);
  };

  const createTest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '555-1234',
          service: 'Engine Diagnostics',
          message: 'Test message from MongoDB!',
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to create' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'monospace' }}>
      <h1>🍃 MongoDB Connection Test</h1>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ padding: '10px 20px', margin: '5px', cursor: 'pointer' }}
        >
          📋 Get All Requests
        </button>
        <button 
          onClick={createTest} 
          disabled={loading}
          style={{ padding: '10px 20px', margin: '5px', cursor: 'pointer' }}
        >
          ➕ Create Test Request
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {result && (
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          marginTop: '20px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
