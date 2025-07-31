import React, { useState } from 'react';

const initialEvents = [
  { id: 1, title: 'سالگرد آشنایی', date: '2025-08-15' },
  { id: 2, title: 'تولد شریک زندگیت', date: '2025-12-10' },
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  function addEvent() {
    if (!newTitle || !newDate) return;
    const newEvent = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
    };
    setEvents([...events, newEvent]);
    setNewTitle('');
    setNewDate('');
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: 'auto',
        fontFamily: 'sans-serif',
        padding: 20,
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#d6336c' }}>خودم و خودش </h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="عنوان مناسبت"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{
            width: '60%',
            padding: 8,
            marginRight: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          style={{
            width: '35%',
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={addEvent}
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#d6336c',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        افزودن مناسبت
      </button>

      <ul style={{ marginTop: 30, listStyle: 'none', padding: 0 }}>
        {events.map(event => (
          <li
            key={event.id}
            style={{
              backgroundColor: '#ffe6f0',
              marginBottom: 10,
              padding: 12,
              borderRadius: 6,
              boxShadow: '0 2px 5px rgba(214, 51, 108, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              color: '#a3003e',
            }}
          >
            <span>{event.title}</span>
            <span>{event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
