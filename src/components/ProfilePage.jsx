import React, { useEffect, useState } from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faCoins, faChildren, faEdit } from '@fortawesome/free-solid-svg-icons';
import plebei from "../imgPub/plebei.png"


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



    const handleInputChange = (field, event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setUserData((prevData) => ({
                ...prevData,
                propietaUser: {
                    ...prevData.propietaUser,
                    [field]: value,
                },
            }));
        }
    };

    const handleKidsEdit = () => {
        const token = sessionStorage.getItem('token');
        const { kids } = userData.propietaUser;

        fetch('http://127.0.0.1:5000/api/v1/propietautente/changekids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ kids }),
        })
            .then((resp) => {
                if (resp.status === 200) {
                    console.log('Kids updated');
                    fetchUserData(token); // Fetch updated data
                } else {
                    throw new Error('Failed to update kids');
                }
            })
            .catch((error) => {
                console.log('Kids update error:', error);
            });
    };

    const handleBestiameEdit = () => {
        const token = sessionStorage.getItem('token');
        const { bestiame } = userData.propietaUser;

        if (bestiame === 0) {
            alert('There is not enough bestiame to sell.');
            return;
        }

        fetch('http://127.0.0.1:5000/api/v1/propietautente/changebestiame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bestiame }),
        })
            .then((resp) => {
                if (resp.status === 200) {
                    console.log('Bestiame updated');
                    fetchUserData(token); // Fetch updated data
                } else {
                    throw new Error('Failed to update bestiame');
                }
            })
            .catch((error) => {
                console.log('Bestiame update error:', error);
            });
    };


    const handleGoldEdit = () => {
        const token = sessionStorage.getItem('token');
        const { gold } = userData.propietaUser;

        if (gold === 0) {
            alert('There is not enough gold to buy bestiame.');
            return;
        }

        fetch('http://127.0.0.1:5000/api/v1/propietautente/changegold', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ gold }),
        })
            .then((resp) => {
                if (resp.status === 200) {
                    console.log('Gold updated');
                    fetchUserData(token); // Fetch updated data
                } else {
                    throw new Error('Failed to update gold');
                }
            })
            .catch((error) => {
                console.log('Gold update error:', error);
            });
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {userData ? (
                <Table striped bordered>
                    <tbody>
                        <tr>
                            <td rowSpan={4}>
                                <div className='plebei-img'>
                                    <Image src={plebei} rounded width={200} height={300} />
                                </div>
                            </td>
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
                                                <td>
                                                    <FontAwesomeIcon icon={faCoins} /> Gold
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={userData.propietaUser.gold}
                                                        onChange={(e) => handleInputChange('gold', e)}
                                                    />

                                                    <Button variant="secondary" className="ml-2" onClick={handleGoldEdit}>
                                                        <FontAwesomeIcon icon={faCow} /> Buy Bestiame
                                                    </Button>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FontAwesomeIcon icon={faCow} /> Bestiame
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={userData.propietaUser.bestiame}
                                                        onChange={(e) => handleInputChange('bestiame', e)}
                                                    />
                                                    <Button
                                                        variant="secondary"
                                                        onClick={handleBestiameEdit}
                                                    >
                                                        <FontAwesomeIcon icon={faCoins} />Sell Bestiame
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FontAwesomeIcon icon={faChildren} /> Kids
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={userData.propietaUser.kids}
                                                        onChange={(e) => handleInputChange('kids', e)}
                                                    />
                                                    <Button
                                                        variant="secondary"
                                                        onClick={handleKidsEdit}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </td>
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