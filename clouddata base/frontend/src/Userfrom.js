import React, { useState } from 'react';
import './UserFrom.css'; // Import the CSS file

const UserForm = ({ addUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, number };

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newUser = await response.json();
            addUser(newUser);
            console.log('User saved successfully!');
            setName('');
            setEmail('');
            setNumber('');
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Number" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;