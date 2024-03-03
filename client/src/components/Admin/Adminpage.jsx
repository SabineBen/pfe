import React from 'react'
import Sidebar from './sidebar'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import Card from './Card'

function Adminpage() {
    return (
        <><div className='NavBar'>
            <NavLink to="/besoins" className="Titles">
                Dashborad
            </NavLink>
            <Card>

            </Card>

        </div><Sidebar /></>
    )
}

export default Adminpage