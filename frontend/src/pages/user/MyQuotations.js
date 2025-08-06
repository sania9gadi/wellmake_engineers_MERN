import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyQuotations.css'; 
import { Link } from 'react-router-dom';

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading ,setLoading] = useState(true);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.get('http://localhost:9000/api/quote/my', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuotations(res.data);
    } catch (err) {
      console.error('Failed to fetch quotations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  return (
    <div className="quotations-container">
      <h2>My Quotations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : quotations.length === 0 ? (
        <p>No quotations found.</p>
      ) : (
        <div className="quotation-list">
  {quotations.map((q) => (
    <div className="quotation-card" key={q._id}>
      <h3>{q.productName}</h3>
      
      <p><strong>Requested On:</strong> {new Date(q.createdAt).toLocaleDateString()}</p>
      <p><strong>Quantity:</strong> {q.quantity}</p>
      <p><strong>Message:</strong> {q.message || 'No message provided'}</p>
      <p><strong>Email:</strong> {q.email}</p>

      {q.brochureUrl && (
        <a href={q.brochureUrl} target="_blank" rel="noopener noreferrer">
          📄 View Brochure
        </a>
      )}

      <a href="https://mail.google.com/mail/">
        📧 Please check your email
      </a>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default MyQuotations;
