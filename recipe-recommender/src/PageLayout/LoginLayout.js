import React, { useState } from 'react';
const LoginLayout = () => {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleLogin = () => {
        fetch('/api/user/login', {
            method: 'POST',
            credentials: "include", // Ensure cookies are included
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If login was successful
                alert(data.message);
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', data.data.username);
                window.location.href = '/'; // Redirect to home page or dashboard
            } else {
                // If login failed
                alert(`Login failed: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCreateAccount = () => {
        setShowCreateAccount(true);
    };

    const handleCreateAccountSubmit = () => {
        fetch('/api/user/create', {
            method: 'POST',
            credentials: "include", // Ensure cookies are included
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUsername, // Ensure this is defined
                email: email,          // Ensure this is defined
                password: newPassword, // Ensure this is defined
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If account creation was successful
                alert(data.message);
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', data.data.username);
                window.location.href = '/';

            } else {
                // If account creation failed
                alert(`Account creation failed: ${data.error}`);
                setShowCreateAccount(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div>
            <h1>Login</h1>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            {!showCreateAccount && (
                <button onClick={handleCreateAccount}>Create Account</button>
            )}
            {showCreateAccount && (
                <div>
                    <h2>Create Account</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <br />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={handleCreateAccountSubmit}>Create Account</button>
                </div>
            )}
        </div>
    );
};

export default LoginLayout;