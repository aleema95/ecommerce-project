import React, { useEffect, useState } from "react";
import style from './Navbar.module.css'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

function Navbar() {

    const [userLoggedIn, setUserLoggedIn] = useState(false)
    useEffect(() => {
        if(localStorage.getItem("token")) setUserLoggedIn(true)
        else setUserLoggedIn(false)
    }, [])

    return(
        <>
            <div className={style.container}>
                <div className={style.home}>
                    <Link>
                        <h2>Home</h2>
                    </Link>
                </div>
                <div className={style.navigation}>
                    <Link to={"/products"}>
                        <h2>Products</h2>
                    </Link>
                    <h2>About</h2>
                </div>
                <div className={style.userNavigation}>
                    {userLoggedIn ? 
                    <h2>Profile</h2>: 
                    <div>
                        <h2>Login</h2>
                        <h2>Register</h2>
                    </div>}
                </div>
            </div>
        </>
    )

}


export default Navbar