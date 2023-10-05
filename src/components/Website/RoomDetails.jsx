import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../../App.css';

export default function RoomDetails() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';
    const [rooms, setRooms] = useState(null);
    const [error, setError] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [searchParam] = useSearchParams();
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [user_id, setUserId] = useState(null);
    const [hotel_id, setHotelId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const param = searchParam.entries();
        for (const [key, value] of param) {
            setRoomId(key);
        }
        if (roomId) {
            const getRoom = `http://127.0.0.1:8000/api/room/${roomId}`
            axios
                .get(getRoom)
                .then((response) => {
                    const data = response.data.success.data;
                    setRooms(data);
                    setHotelId(data.hotel_id);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err.response);
                    setRooms(null);
                });
        }
    }, [roomId]);
    useEffect(() => {
        const tokenObj = JSON.parse(localStorage.getItem("token"));
        const token = tokenObj ? tokenObj.token : null;
        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get("http://127.0.0.1:8000/api/user/details", { headers })
                .then((response) => {
                    const output = response.data.success.data;
                    setUserId(output.id)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("Token not found in localStorage");
        }
    }, []);


    const bookNow = async (e) => {
        e.preventDefault();
        // setStartDate("")
        // setEndDate("")
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }

        const fields = {
            start_date: start_date,
            end_date: end_date,
            user_id: user_id,
            hotel_id: hotel_id
        }
        axios
            .post("http://127.0.0.1:8000/api/reservation/store", { fields })
            .then((response) => {
                console.warn(response)
            })
            .catch((err) => {
                setError(err.response.data)
                console.log(err)
            })
        console.log(fields);

    }

    return (
        <div className="our_room">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlepage">
                            <h2>Room Details</h2>
                        </div>
                    </div>
                </div>
            </div>
            <section className="container">
                <div className="row">
                    <div className="col-lg-4 roomImgParent">
                        <img className="roomImg" src={`${publicUrl}room1.jpg`} alt="Room" />
                    </div>
                    <div className="col-lg-7">
                        {rooms && (
                            <div className='buyNowSection'>
                                <h2>{rooms.type.toUpperCase()}</h2>
                                <div className="text-danger">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i key={star} className="fa fa-star starColor"></i>
                                    ))}
                                </div>

                                <div className="container my-3">
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-wifi fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-car fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-television fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-bath fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-coffee fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-gift fa-2x" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="">PKR {rooms.price}</h2>
                                <div className="my-3">
                                    <form onSubmit={bookNow}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="checkinDate">Check-in Date</label>
                                                <input type="date" id="checkinDate" className="form-control"
                                                    value={start_date} onChange={(e) => setStartDate(e.target.value)}
                                                />
                                                <span className="loginErrors">
                                                    {error && error.errors.start_date ? error.errors.start_date : null}
                                                </span>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="checkoutDate">Check-out Date</label>
                                                <input type="date" id="checkoutDate" className="form-control"
                                                    value={end_date} onChange={(e) => setEndDate(e.target.value)}
                                                />
                                                <span className="loginErrors">
                                                    {error && error.errors.end_date ? error.errors.end_date : null}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger btn-sm w-50 p-3 mt-4 webColor" type="submit" >Book Now</button>
                                    </form>
                                </div>



                            </div>
                        )}
                    </div>
                </div>

                {rooms && (
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <h2>Facilities</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Facility</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Available</td>
                                        <td>{rooms.is_available ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Smoking</td>
                                        <td>{rooms.is_smoking_allowed ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Pool</td>
                                        <td>{rooms.has_pool_access ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Room Service</td>
                                        <td>{rooms.has_room_service ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Balcony</td>
                                        <td>{rooms.has_balcony ? "✓" : "✕"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {error && error.statusText && (
                    <div className="row">
                        <div className="col-lg-12">
                            <span className='serverError text-center'>{error.statusText}</span>
                        </div>
                    </div>
                )}

                {rooms && (
                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <h2>Description</h2>
                            <p>{rooms.description}</p>
                        </div>
                    </div>
                )}
            </section>


        </div>
    )
}
