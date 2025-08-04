import React, { useEffect, useState } from 'react';
import './Inquiries.css';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
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
        const response = await fetch('http://localhost:9000/api/inquiry/all-inquiries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch inquiries');
        }

        setInquiries(data);
      } catch (err) {
        console.error('Error fetching inquiries:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) return <p className="inquiry-message">Loading inquiries...</p>;
  if (error) return <p className="inquiry-message">{error}</p>;

  return (
    <div className="inquiry-page">
      <h2 className="inquiry-heading">All Inquiries</h2>
      {inquiries.length === 0 ? (
        <p className="inquiry-message">No inquiries found.</p>
      ) : (
        <div className="inquiry-cards-container">
          {inquiries.map((inq) => (
            <div className="inquiry-card" key={inq._id}>
              <div className="inquiry-header">
                <span className="user-name">{inq.name}</span>
                <span className="inquiry-date">{new Date(inq.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="user-email">{inq.email}</div>
              <div className="user-phone">📞 {inq.phone}</div>

              <div className="inquiry-product-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{inq.product}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inquiry-message-box">
                <strong>Message:</strong>
                {inq.message}
              </div>

              <div className="inquiry-actions">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inq.email}&su=Re: Respond to your inquiry related to ${encodeURIComponent(inq.product)}`}
                  className="respond-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Respond
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inquiries;
