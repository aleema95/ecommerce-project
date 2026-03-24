import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/auth/authSlice.js";
import style from "./LoginForm.module.css"

function LoginForm() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });
    const user = useSelector((state) => state.auth.user)
    const status = useSelector((state) => state.auth.status)

  //  useEffect(() =>{
  //      localStorage.setItem("token", user.token)
  //  } ,[user])

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(fetchUser(formData));
    }
    return (
       <div className={style.mainContainer}>
        <form className={style.formContainer} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={style.inputContainer}>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                />

                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button className={style.loginBtn}>Login</button>
        </form>
       </div>
    )
}

export default LoginForm