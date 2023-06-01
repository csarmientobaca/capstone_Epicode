import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = (token) => {
        fetch('http://127.0.0.1:5000/api/v1/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                if (resp.status === 200) return resp.json();
                else throw new Error('Failed to fetch user data');
            })
            .then((userData) => {
                console.log('User data from backend:', userData);
                setUserData(userData);
            })
            .catch((error) => {
                console.log('User data fetch error:', error);
            });
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {userData ? (
                <Table striped bordered>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{userData.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{userData.email}</td>
                        </tr>
                        {userData.propietaUser && (
                            <tr>
                                <td>Propieta User</td>
                                <td>
                                    <Table striped bordered>
                                        <tbody>
                                            <tr>
                                                <td>ID</td>
                                                <td>{userData.propietaUser.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Gold</td>
                                                <td>{userData.propietaUser.gold}</td>
                                            </tr>
                                            <tr>
                                                <td>Bestiame</td>
                                                <td>{userData.propietaUser.bestiame}</td>
                                            </tr>
                                            <tr>
                                                <td>Kids</td>
                                                <td>{userData.propietaUser.kids}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default ProfilePage;