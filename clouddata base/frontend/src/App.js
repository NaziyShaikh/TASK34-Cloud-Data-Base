import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UsersList from './UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define functions first
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://task34-cloud-data-base-3.onrender.com/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch('https://task34-cloud-data-base-3.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      setUsers(prevUsers => [...prevUsers, newUser]);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

const deleteUser = async (userId) => {
  if (!window.confirm('Are you sure you want to delete this user?')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get the response text first
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: 'Invalid JSON response' };
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    // Update local state and refresh from server
    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    fetchUsers(); // Refresh from server to ensure consistency

    alert('User deleted successfully');
  } catch (error) {
    console.error('Error details:', error);
    alert(`Failed to delete user: ${error.message}`);
  }
};
  // Use useEffect after defining functions
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>Cloud Data Base</h1>
      {isAuthenticated ? (
        <>
          <UserForm onAddUser={addUser} />
          <UsersList 
            users={users} 
            onDelete={deleteUser}
          />
        </>
      ) : (
        <p>Please log in to view users</p>
      )}
    </div>
  );
}

export default App;