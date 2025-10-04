import { useState } from 'react';

interface Reservation {
  id: string;
  subject: string;
  type: 'booked' | 'canceled';
  customerName: string | null;
  phone: string | null;
  email: string | null;
  date?: string | null;
  hour?: string | null;
  procedure?: string | null;
  service?: string | null;
  price?: string | null;
}

export default function GmailMessages() {
  const [messages, setMessages] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessageContent = async (id: string) => {
    const res = await fetch(`http://localhost:5500/message/${id}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  };

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      // const res = await fetch(`https://bettynails-backend.onrender.com/message-html/${id}`);
      const res = await fetch('http://localhost:5500/messages'); 
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: { id: string; subject: string }[] = await res.json();

      // Filter new bookings and cancellations
      const filtered = data.filter(msg =>
        msg.subject.includes('Нова резервация от') ||
        msg.subject.includes('Отменена резервация от')
      );

      // Fetch full content for each filtered message
      const detailedMessagesRaw = await Promise.all(
        filtered.map(msg => fetchMessageContent(msg.id))
      );

      // Add type based on subject
      const detailedMessages = detailedMessagesRaw.map(msg => ({
        ...msg,
        type: msg.subject.includes('Нова резервация от') ? 'booked' : 'canceled'
      }));

      setMessages(detailedMessages);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Latest Reservations</h2>
      <button onClick={fetchMessages} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Emails'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {messages.map(msg => (
          <li key={msg.id} style={{ marginBottom: '1em', border: '1px solid #ddd', padding: '10px' }}>
            <strong>{msg.subject}</strong> &nbsp;
            <span style={{ color: msg.type === 'booked' ? 'green' : 'red' }}>
              ({msg.type === 'booked' ? 'Booked' : 'Canceled'})
            </span>
            <p>📌 <strong>Customer:</strong> {msg.customerName}</p>
            <p>📞 <strong>Phone:</strong> {msg.phone}</p>
            <p>✉️ <strong>Email:</strong> {msg.email}</p>
            {msg.date && <p>📅 <strong>Date:</strong> {msg.date}</p>}
            {msg.hour && <p>⏰ <strong>Hour:</strong> {msg.hour}</p>}
            {msg.procedure && <p>💅 <strong>Procedure:</strong> {msg.procedure}</p>}
            {msg.price && <p>💰 <strong>Price:</strong> {msg.price}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
