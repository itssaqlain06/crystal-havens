import axios from 'axios';
import React, { useState } from 'react';
import '../../../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [catchError, setCatchError] = useState("");

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        setError(null);
        setCatchError(null);

        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: password_confirmation,
        };

        axios
            .post("http://127.0.0.1:8000/api/user/register", userData)
            .then((response) => {
                console.log(response.data.success);
                setSuccess(response.data.success);
                setError(null);
                setCatchError(null);
                navigate('/')
            })
            .catch((error) => {
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
                                <h2>Register</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <form className='mt-2' onSubmit={register}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="Name"
                                        className="form-control"
                                        id="floatingName"
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                    <label htmlFor="floatingName">Name</label>
                                    <span className="loginErrors">
                                        {error && error.name ? error.name : null}
                                    </span>
                                </div>
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
                                <div className="form-floating mb-3">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="floatingPhone"
                                        placeholder="Phone Number"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                    <label htmlFor="floatingPhone">Phone Number</label>
                                    <span className="loginErrors">
                                        {error && error.phone ? error.phone : null}
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
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingConfirmPassword"
                                        placeholder="Password Confirmation"
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        value={password_confirmation}
                                    />
                                    <label htmlFor="floatingConfirmPassword">Password Confirmation</label>
                                    <span className="loginErrors">
                                        {error && error.password_confirmation ? error.password_confirmation : null}
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-danger py-3 w-100 mb-3 button-color" >Register</button>
                                <span className="loginSuccess"></span>
                                <span className="loginErrors">
                                    {catchError && catchError.statusText ? catchError.statusText : null}
                                </span>
                                <div className="text-center mt-4">
                                    <p>Already have an account? <Link to="/login" className="loginColor">Login</Link> here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
