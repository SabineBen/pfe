import React from 'react';
import logo from '../images/Frame 8 (3).jpg';
import { FaPhoneAlt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavbarAuth() {
    const history = useNavigate();
    const email = localStorage.getItem('email')
    function handleLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        history("/");
    }
    return (
        <>
            <div className='top-nav'>
                <h4 style={{ cursor: 'pointer' }}><FaPhoneAlt /> +213 (0)27727061</h4>
                <h4 style={{ cursor: 'pointer' }}><FaPhoneAlt /> +213 (0)44 35 49 78</h4>
                <select>
                    <option>Langue</option>
                    <option>Arabe</option>
                    <option>Français</option>
                </select>
            </div>
            <div className="navbar">
                <img src={logo} alt='uhbc' className="logo" />
                <ul className="nav-links">
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Présentation</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className='avatar'>
                    <Menu >
                        <MenuButton as={Avatar}
                            style={{ height: "30px", backgroundColor: "#A0AEC0", borderRadius: "90px", cursor: "pointer" }}
                            src='https://bit.ly/broken-link'
                        />
                        <MenuList >
                            <MenuItem style={{ backgroundColor: 'white', border: "none", mt: "5px", paddingBottom: "15px", paddingTop: '10px', fontSize: '16px' }}>
                                {email}
                            </MenuItem>

                            <MenuItem onClick={handleLogout} style={{ color: "#F87272", backgroundColor: 'white', border: "none", paddingBottom: "10px", cursor: "pointer", fontSize: '16px' }}>
                                <FaSignOutAlt style={{ marginRight: "5px" }} />
                                <span>Logout</span>

                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div >
        </>
    );
}

export default NavbarAuth;
