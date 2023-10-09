import React, { useState, useEffect } from 'react';
import { Table, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';
import fetchAllUsers from '../../Services/getAllUser';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import adminActiveUser from '../../Services/getActiveUser';
import adminInActiveUser from '../../Services/getInActiveUser';
import Loader from '../Loader/Loader';
import deleteUserByAdmin from '../../Services/deleteUserByAdmin';
import ViewUserDetails from '../../Services/getViewUserDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTableComp = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false); // Define the error state
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const usersData = await fetchAllUsers();
                setUsers(usersData?.message);
                setError(false);
            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', paddingRight: '0' }} className='market-heading'>User List</span>
                    <div className='main-bar-calendar'>
                        <div class="form-group has-search">
                            <span className="form-control-feedback">
                                <FontAwesomeIcon icon={faSearch} style={{ color: "#c9c8c8" }} />
                            </span>
                            <input
                                type="text"
                                className="form-control search-form"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                        </div>
                    </div>
                </div>
                <div className='table-border-style'>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <div className="no-data-message">Error fetching data.</div>
                    ) : users?.length === 0 ? (
                        <div className="no-data-message">No user data found</div>
                    ) : (
                        <Table striped className="main-table">
                            <thead className="table-heading-style">
                                <tr>
                                    <th style={{ textAlign: "start" }}>Name</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Status</th>
                                    <th className="action-heading">Action</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody>
                                {users?.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="main-tableicon">
                                                <Image
                                                    src={user.profile_image?.url || defaultImageUrl}
                                                    width="30"
                                                    height="30"
                                                    alt="Profile"
                                                    roundedCircle
                                                    className="imagetable-style"
                                                />
                                                <large className="large-text">{user?.name}</large>
                                            </div>
                                        </td>
                                        <td style={{ color: 'black' }}>
                                            <small>{user?.email}</small>
                                        </td>
                                        <td>
                                            <large className="large-text">{user?.country || "Country"}</large>
                                        </td>
                                        <td>
                                            <large className="large-text">{user?.status}</large>
                                        </td>
                                        <td className="action-col-user">
                                            <large className="action-style">
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="delete-icon"
                                                />
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    className="view-icon"
                                                />
                                            </large>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Card>
        </>
    );
}

export default UserTableComp;
