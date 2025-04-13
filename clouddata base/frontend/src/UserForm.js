import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const showToastMessage = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
  
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !number.trim()) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }

    try {
      await onAddUser({ name, email, number });
      showToastMessage('User added successfully!', 'success');
      setName('');
      setEmail('');
      setNumber('');
    } catch (error) {
      showToastMessage('Error adding user', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <div>
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
      
      {showToast && (
        <div className={`toast-message ${toastType} ${showToast ? 'show' : 'hide'}`}>
          <i className={`fas fa-${toastType === 'success' ? 'check-circle' : 
            toastType === 'error' ? 'exclamation-circle' : 
            toastType === 'warning' ? 'exclamation-triangle' : 'info-circle'}`}>
          </i>
          <span>{toastMessage}</span>
          <button className="close-btn" onClick={() => setShowToast(false)}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForm;