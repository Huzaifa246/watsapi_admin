import React, { useState, useEffect } from 'react';
import { Table, Image, Card, Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';
import fetchAllUsers from '../../Services/getAllUser';
import Loader from '../Loader/Loader';
import deleteUserByAdmin from '../../Services/deleteUserByAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewUserDetails from './../../Services/getViewUserDetails';
import adminActiveUser from '../../Services/getAdminActiveUser';

const UserTableComp = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false); // Define the error state
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const usersData = await fetchAllUsers();
                setUsers(usersData?.message || []);
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
    const handleDeleteUser = async (_id) => {
        try {
            setIsLoading(true);
            await deleteUserByAdmin(_id);
            setUsers(users.filter(user => user?._id !== _id));
            setError(false);

            setShowDeleteModal(false);
            toast.success('User deleted successfully', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
            });

            // Reload the page after a short delay (2 seconds in this example)
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };
    const handleViewUser = async (_id) => {
        try {
            const userData = await ViewUserDetails(_id);
            setSelectedUser(userData?.message);
            setShowViewModal(true);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(true);
            setIsLoading(false);
        }
    };
    const openDeleteModal = (_id) => {
        setShowDeleteModal(true);
        setUserToDelete(_id);
    };

    // Function to close the modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };
    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedUser(null); // Clear the selected user details when closing the modal
    };

    //status
    const getStatusLabel = (status) => {
        return status === "active" ? "Inactive" : "Active";
    };
    const handleStatusChange = async (user_id, newStatus) => {
        try {
          setIsLoading(true);
          const updatedStatus = newStatus === 'active' ? 'inactive' : 'active'; // Toggle the status
    
          const response = await adminActiveUser(user_id, updatedStatus);
    
          if (response && response.success) {
            const updatedUserStatus = users.map((user) =>
              user._id === user_id ? { ...user, status: updatedStatus } : user
            );
            setUsers(updatedUserStatus);
            toast.success("Status updated successfully", {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
            });

            setError(false);
            setIsLoading(false);
          } else {
            setError(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error changing user status:', error);
          setError(true);
          setIsLoading(false);
        }
      };


    return (
        <>
            <Modal show={showViewModal} onHide={closeViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser ? (
                        // Display user details here
                        <div>
                            <p>Name: {selectedUser?.name}</p>
                            <p>Email: {selectedUser?.email}</p>
                            <p>Country: {selectedUser?.country || 'Country'}</p>
                            <p>Status: {selectedUser?.status}</p>
                            {/* Add more user details as needed */}
                        </div>
                    ) : (
                        // Display a loading message or error message if needed
                        <p>Loading user details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={closeViewModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleDeleteUser(userToDelete);
                        setShowDeleteModal(false)
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                            <DropdownButton
                                                title={user?.status}
                                                className="dropdown-button"
                                                variant={(user?.status === "active" ? "success" : "danger")}
                                            >

                                                <Dropdown.Item eventKey="1"
                                                    onClick={() => handleStatusChange(user?._id, user?.status)}
                                                    className="dropdown-item"
                                                >
                                                    {getStatusLabel(user?.status)}
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                        <td className="action-col-user">
                                            <large className="action-style">
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="delete-icon"
                                                    onClick={() => openDeleteModal(user._id)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    className="view-icon"
                                                    onClick={() => {
                                                        setShowViewModal(true)
                                                        handleViewUser(user._id)
                                                    }}
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
