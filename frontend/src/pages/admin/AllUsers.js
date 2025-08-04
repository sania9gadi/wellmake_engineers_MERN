import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllUsers.css'; // optional CSS

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");


        const res = await fetch('http://localhost:9000/api/user/all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        } else {
          alert(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Something went wrong");
      }
    };

    fetchUsers();
  }, []);

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="all-users">
      <h2>All Registered Users</h2>
      <button onClick={handleBack}>← Back to Dashboard</button>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;
