import React, { useEffect, useState } from 'react';
import UserForm from './Userfrom';
import './UserFrom.css'; // Ensure you import the CSS file

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const addUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cloud Data Base</h1>
            <UserForm addUser={addUser} />
            <h2>Users List</h2>
            <div className="user-lists">
                <div>
                    <h3>Names</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Emails</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>{user.email}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Phone Numbers</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>{user.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;