import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/all-users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>Admin — All Users</h2>
      {users.map(user => (
        <div key={user._id}>{user.name} ({user.email})</div>
      ))}
    </div>
  );
};

export default AdminUsers;
