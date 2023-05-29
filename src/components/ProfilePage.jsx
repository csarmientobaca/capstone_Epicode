import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        fetch('http://127.0.0.1:5000/api/v1/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else throw new Error('Failed to fetch user data');
            })
            .then(userData => {
                console.log('User data from backend:', userData);
                setUserData(userData);
            })
            .catch(error => {
                console.log('User data fetch error:', error);
            });
    }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            {userData ? (
                <ul>
                    <li>Username: {userData.username}</li>
                    <li>Email: {userData.email}</li>
                    {userData.propietaUser && (
                        <li>
                            Propieta User:
                            <ul>
                                <li>ID: {userData.propietaUser.id}</li>
                                <li>Gold: {userData.propietaUser.gold}</li>
                                <li>Bestiame: {userData.propietaUser.bestiame}</li>
                                <li>Kids: {userData.propietaUser.kids}</li>
                            </ul>
                        </li>
                    )}
                </ul>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default ProfilePage;