import React from "react";
import style from './Navbar.module.css'

function Navbar() {

    return(
        <>
            <div className={style.container}>
                <div className={style.home}>
                    <h2>Home</h2>
                </div>
                <div className={style.navigation}>
                    <h2>Products</h2>
                    <h2>About</h2>
                </div>
                <div className={style.userNavigation}>
                    <h2>Login</h2>
                    <h2>Register</h2>
                </div>
            </div>
        </>
    )

}


export default Navbar