import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../images/Frame 8 (3).jpg';
import bg from '../images/bg.jpg';
import './Navbar.css';

function Navbar() {
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
                <div className="button-container">
                    <NavLink to="/login"> <button type='submit'>Connexion </button></NavLink>
                    <NavLink to="/signup"> <button type='submit' style={{ backgroundColor: "#17a27f" }}>Inscription</button></NavLink>
                </div>
            </div>
            <div className="background-container">
                <img className="background" src={bg} alt='' />
                <div className="centered-text">
                    <p>Trouvez les marchés publics en un seul clic !</p>
                </div>
            </div>
        </>
    );
}

export default Navbar;
