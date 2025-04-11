// UserForm.js
import React, { useState } from 'react';
import './UserForm.css';
const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !number.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await onAddUser({ name, email, number });
      setName('');
      setEmail('');
      setNumber('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;