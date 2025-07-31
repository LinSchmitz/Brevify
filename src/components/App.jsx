import React, { useState } from 'react';

// const VITE_OPENAI_API_KEY = sk - XXXXXXXXXXXXXXXXXXXXXXXX;

function App() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('short');

  async function handleSummarize() {
    if (!input) return;
    setLoading(true);
    try {
      const prompt =
        type === 'short'
          ? `Summarize this text in 2–3 sentences:\n\n${input}`
          : `Provide a detailed bullet-point summary of the following:\n\n${input}`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.choices && data.choices.length > 0) {
        setSummary(data.choices[0].message.content.trim());
      } else {
        setSummary('❌ No summary returned. Check your API key or input.');
      }
    } catch (err) {
      console.error(err);
      setSummary('❌ Error calling OpenAI API. Check console.');
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Intelisum 🧠</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your text here..."
      />
      <br />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="short">Short Summary</option>
        <option value="detailed">Detailed Summary</option>
      </select>
      <br />
      <button onClick={handleSummarize}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>🧾 Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
