import React from 'react';
import './UsersList.css';

const UsersList = ({ users, onDelete }) => {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div className="users-list">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(user._id)}
                  title="Delete User"
                >
                  <span className="delete-icon">🗑️</span> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;