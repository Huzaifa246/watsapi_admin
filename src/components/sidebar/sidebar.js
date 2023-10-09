import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faMoneyBill, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'; 
import './sidebar.css';
import { itsLogo } from '../imagesImport';


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isTradersSubMenuOpen, setIsTradersSubMenuOpen] = useState(false); // New state

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        toggleSidebar();
    };

    const handleToggleSubMenu = () => {
        setIsTradersSubMenuOpen(!isTradersSubMenuOpen);
    };



    return (
        <>
            {!isToggleActive && (
                <div className="its-heading-logo">
                    <img src={itsLogo} alt="ITS Logo" className="its-logo" />
                    <h1 className="its-heading">Watapi</h1>
                </div>
            )}
            <nav id="sidebar" className={isSidebarOpen ? "active" : ""}>
                <div className="p-4" style={{ marginTop: "50px" }}>
                    <ul className="list-unstyled">
                        {/* <Nav.Link href="/dashboard" activeClassName="active-link" className="mb-2 main-sidebar">*/}
                        <Nav.Link href="/dashboard" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Dashboard
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/users" className={`mb-2 main-sidebar ${window.location.pathname === '/users' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Users
                            </span>
                        </Nav.Link>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
