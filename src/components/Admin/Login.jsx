import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [catchError, setCatchError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/admin");
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        setError("");
        setCatchError("");
        let items = { email, password };
        try {
            let response = await fetch("http://127.0.0.1:8000/api/user/login", {
                method: "POST",
                body: JSON.stringify(items),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (response.ok) {
                let result = await response.json();
                setSuccess(result.success);
                if (
                    items.email !== "itssaqlain06@gmail.com" &&
                    items.email !== "admin123@gmail.com"
                ) {
                    setError({ OnlyAdmin: "Only Admin is allowed to access Dashboard" });
                } else {
                    localStorage.setItem(
                        "token",
                        JSON.stringify(result.success.authorization)
                    );
                    navigate("/admin");
                }
            } else {
                let errorData = await response.json();
                setError(errorData.errors);
                setSuccess("");
            }
        } catch (error) {
            console.log(error);
            setCatchError(error)
        }
    };

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <div className="container-fluid">
                <div
                    className="row h-100 align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <form onSubmit={login}>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to="/admin" className="">
                                        <h3 className="text-primary">
                                            <i className="fa fa-hashtag me-2"></i>DASHMIN
                                        </h3>
                                    </Link>
                                    <h3>Login In</h3>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
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
                                <button
                                    type="submit"
                                    className="btn btn-primary py-3 w-100 mb-4"
                                >
                                    Login In
                                </button>
                                <span className="loginSuccess">
                                    {success && success.message ? success.message : null}
                                </span>
                                <span className="loginErrors">
                                    {error && error.error ? error.error : null}
                                    {error && error.OnlyAdmin ? error.OnlyAdmin : null}
                                    {error && error.message ? error.message : null}
                                    {catchError && catchError.message ? catchError.message : null}
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
