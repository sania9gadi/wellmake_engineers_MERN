
import React, { useEffect, useState } from 'react';
import './MyInquiries.css';

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchInquiries = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/inquiry/my', {
          headers: {
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

  return (
    <div className="my-inquiries">
      <h2 className="inquiries-heading">My Inquiries 📩</h2>

      {loading && <p className="inquiry-message">Loading inquiries...</p>}
      {error && <p className="inquiry-message error">{error}</p>}
      {!loading && !error && inquiries.length === 0 && (
        <p className="inquiry-message">No inquiries found.</p>
      )}

      <div className="inquiries-cards">
        {!loading &&
          !error &&
          inquiries.map((inq) => (
            <div key={inq._id} className="inquiry-card">
              <div className="inquiry-card-header">
                <strong>{inq.name}</strong>
                <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
              </div>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Phone:</strong> {inq.phone || '—'}</p>
              <p><strong>Product:</strong> {inq.product}</p>
              <p><strong>Message:</strong> {inq.message || '—'}</p>

              <a
                href={"https://r.search.yahoo.com/_ylt=Awrx_Rm47YpoXgIADwC7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1755144889/RO=10/RU=https%3a%2f%2fmail.google.com%2fmail%2f/RK=2/RS=BorvVrtXFScHgGgtgiB83iW9rbg-"}
                className="email-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 View Response in Email
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyInquiries;
