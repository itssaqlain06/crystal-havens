import axios from 'axios';
import React, { useState } from 'react';
import '../../../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [catchError, setCatchError] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setError(null);
        setCatchError(null);

        const userData = {
            email: email,
            password: password
        };

        axios
            .post("http://127.0.0.1:8000/api/user/login", userData)
            .then((response) => {
                setSuccess(response.data.success);
                setError(null);
                setCatchError(null);
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.success.authorization)
                );
                navigate(-1)
            })
            .catch((error) => {
                console.warn(error)
                setError(error.response.data.errors);
                setCatchError(error.response)
            });
    }

    return (
        <div className="main-layout">
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <form className='mt-3' onSubmit={login}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingEmail"
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                    <label htmlFor="floatingEmail">Email address</label>
                                    <span className="loginErrors">
                                        {error && error.email ? error.email : null}
                                    </span>
                                </div>
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                    <span className="loginErrors">
                                        {error && error.password ? error.password : null}

                                    </span>
                                </div>
                                <button type="submit" className="btn btn-danger py-3 w-100 mb-3 button-color" >Login</button>
                                <span className="loginSuccess"></span>
                                <span className="loginErrors">
                                    {error && error.error ? error.error : null}<br/>
                                    {catchError && catchError.statusText ? catchError.statusText : null}
                                </span>
                                <div className="text-center">
                                    <p>Don't have an account? <Link to="/register" className="loginColor">Register</Link> here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
