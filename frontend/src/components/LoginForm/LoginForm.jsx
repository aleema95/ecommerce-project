import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/auth/authSlice.js";

function LoginForm() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });
    const user = useSelector((state) => state.auth.user)
    const status = useSelector((state) => state.auth.status)

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("asd")
        dispatch(fetchUser(formData));
    }
    return (
       <div className="container">
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

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

            <button type="submit">Login</button>
        </form>
       </div>
    )
}

export default LoginForm