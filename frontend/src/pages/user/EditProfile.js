import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:9000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const fetchedUser = res.data?.user || {};
        setUser({
          name: fetchedUser.name || '',
          email: fetchedUser.email || '',
          phone: fetchedUser.phone || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setMessage("Error loading profile");
        setLoading(false);
      });
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = { ...user };
      if (newPassword.trim()) updatedData.password = newPassword.trim();

      const res = await axios.put("http://localhost:9000/api/user/update-profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("✅ Profile updated successfully");
      setNewPassword('');
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={user.phone}
            onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div>
          <label>New Password (optional):</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
