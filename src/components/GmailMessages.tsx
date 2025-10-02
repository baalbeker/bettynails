import { useState } from 'react';

interface GmailMessage {
  id: string;
  subject: string;
}

export default function GmailMessages() {
  const [messages, setMessages] = useState<GmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      // GmailMessages.tsx
      const res = await fetch('https://bettynails-backend.onrender.com/messages'); // full backend URL

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: GmailMessage[] = await res.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Latest Gmail Messages</h2>
      <button onClick={fetchMessages} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Emails'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>📧 {msg.subject}</li>
        ))}
      </ul>
    </div>
  );
}
