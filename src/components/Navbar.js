import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Navbar = (props) => {

    const manageLogout = (e) => {
        e.preventDefault();

        axios.post('https://akademia108.pl/api/social-app/user/logout')
            .then((res) => {
                if (res.data.message) {
                    props.setUser(null);
                    localStorage.setItem('user', null);
                }
            })
            .catch((error) => {
                console.log(error);
                props.setUser(null);
                localStorage.setItem('user', null);
            });

    }

    return (
        <nav className='navbarContainer'>
            <ul className='navigationList'>
                <li className="listItem">
                    <Link to='/'>Home</Link>
                </li>
                {!props.user && (
                    <li className="listItem">
                        <Link to='/SignUp'>Sign Up</Link>
                    </li>
                )}
                {!props.user && (
                    <li className="listItem">
                        <Link to='/Login'>Login</Link>
                    </li>
                )}
                {props.user && (
                    <li className="listItem">
                        <Link to='/' onClick={manageLogout}>Logout</Link>
                    </li>
                )}
            </ul>
            {/* onClick={manageLoginState} */}

        </nav>
    )
}

export default Navbar;