import React, { useEffect, useState } from 'react';
import './QuoteResponse.css'; // Create this CSS like Inquiries.css

const QuoteResponse = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token) {
        setError('Unauthorized: No token found');
        setLoading(false);
        return;
      }

      if (role !== 'admin') {
        setError('Access denied: Not an admin');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:9000/api/quote', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch quotations');
        }

        setQuotes(data);
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <p className="quote-message">Loading quotations...</p>;
  if (error) return <p className="quote-message">{error}</p>;

  return (
    <div className="quote-page">
  <h2 className="quote-heading">All Quotations</h2>
  {quotes.length === 0 ? (
    <p className="quote-message">No quotations found.</p>
  ) : (
    <div className="quote-cards-container">
  {quotes.map((q) => (
    <div className="quote-card" key={q._id}>
      <div className="quote-header">
        <span className="user-name">{q.userName}</span>
        <span className="quote-date">{new Date(q.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="user-email">{q.email}</p>

      <div className="quote-product-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{q.productName}</td>
              <td>{q.quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="quote-message-box">
        <strong>Message:</strong>
        <p>{q.message || '—'}</p>
      </div>

      <div className="quote-actions">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${q.email}&su=Re: Quotation Request for ${encodeURIComponent(q.productName)}`}
          className="respond-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          📩 Respond via Email
        </a>
      </div>
    </div>
  ))}
</div>

  )}
</div>

  );
};

export default QuoteResponse;
