// app/page.js
'use client';

import { useState } from 'react';

export default function Home() {
  const [uid, setUid] = useState('');
  const [region, setRegion] = useState('IND');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`/api/player?uid=${uid}&region=${region}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>🔫 Free Fire Player Stats</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="Player UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
          style={{ padding: '0.5rem', flex: '1', minWidth: '150px' }}
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="IND">India</option>
          <option value="BR">Brazil</option>
          <option value="SG">Singapore</option>
          <option value="PK">Pakistan</option>
          <option value="BD">Bangladesh</option>
          <option value="ID">Indonesia</option>
          <option value="US">USA</option>
          <option value="RU">Russia</option>
          <option value="VN">Vietnam</option>
          <option value="TH">Thailand</option>
          <option value="ME">Middle East</option>
          <option value="CIS">CIS</option>
          <option value="TW">Taiwan</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Get Stats'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {data && (
        <pre
          style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
      }
