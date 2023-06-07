import React, { useEffect, useState } from 'react';
import { Table, Button, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faCoins, faChildren, faEdit } from '@fortawesome/free-solid-svg-icons';
import cesar from "../imgPub/cesar2.png";
import './ProfileCesar.css'; // Import the CSS file for custom styling

const ProfileCesar = () => {
    const [userData, setUserData] = useState(null);
    const [conscriptValue, setConscriptValue] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setTimeout(() => {
                fetchUserData(token);
            }, 1000); // Add a delay of 1 second (adjust as needed)
        }
    }, []);

    const fetchUserData = (token) => {
        fetch('http://127.0.0.1:5000/api/v1/cesar/plebei', {
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

    const handleConscription = () => {
        console.log('Conscription value:', conscriptValue);
        const token = sessionStorage.getItem('token');
        if (token) {
            fetch('http://127.0.0.1:5000/api/v1/cesar/conscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ subtract_kids: parseInt(conscriptValue) }),
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        console.log('Conscription completed successfully');
                        // Refresh user data after conscription
                        fetchUserData(token);
                    } else {
                        throw new Error('Conscription failed');
                    }
                })
                .catch((error) => {
                    console.log('Conscription error:', error);
                });
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {userData ? (
                <div>
                    <h2>Cesar:</h2>

                    <Table striped bordered className="profile-table">
                        <tbody>
                            <tr>
                                <td>
                                    <Image className='plebei-img' src={cesar} alt="Cesar" thumbnail />
                                </td>
                                <td>Email</td>
                                <td>{userData.cesar.email}</td>
                            </tr>
                            <tr>
                                <div className="conscription-container">
                                    <Form.Group controlId="conscriptValue">
                                        <Form.Label>Conscript Value</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={conscriptValue}
                                            onChange={(e) => setConscriptValue(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" onClick={handleConscription}>
                                        Conscription
                                    </Button>
                                </div>
                                <td>Military</td>
                                <td>{userData.cesar.military}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h2>Plebei:</h2>
                    {userData.plebei.length > 0 ? (
                        userData.plebei.map((user) => (
                            <div key={user.cesar_id}>
                                <h3>Username: {user.username}</h3>
                                <Table striped bordered className="profile-table">
                                    <tbody>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Propieta User</td>
                                            <td>
                                                <Table striped bordered className="profile-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>{user.propietaUser.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <FontAwesomeIcon icon={faCoins} /> Gold
                                                            </td>
                                                            <td>{user.propietaUser.gold}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <FontAwesomeIcon icon={faCow} /> Bestiame
                                                            </td>
                                                            <td>{user.propietaUser.bestiame}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <FontAwesomeIcon icon={faChildren} /> Kids
                                                            </td>
                                                            <td>{user.propietaUser.kids}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ))
                    ) : (
                        <p>No plebei found</p>
                    )}


                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default ProfileCesar;