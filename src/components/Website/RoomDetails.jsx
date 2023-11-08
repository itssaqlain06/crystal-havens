import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../../App.css';

export default function RoomDetails() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [getRoomId, setGetRoomId] = useState(null);
    const [searchParam] = useSearchParams();
    const [start_date, setStartDate] = useState(null)
    const [end_date, setEndDate] = useState(null)
    const [user_id, setUserId] = useState(null);
    const [hotel_id, setHotelId] = useState(null);
    const [room_id, setRoomId] = useState(null);
    const [number_of_guests, setNumberOfGuests] = useState(null);
    const navigate = useNavigate();

    const tokenObj = JSON.parse(localStorage.getItem("token"));
    const token = tokenObj ? tokenObj.token : null;
    const headers = {
        Authorization: `Bearer ${token}`
    };

    useEffect(() => {
        const param = searchParam.entries();
        for (const [key, value] of param) {
            setGetRoomId(key);
        }
        if (getRoomId) {
            const getRoom = `http://127.0.0.1:8000/api/room/${getRoomId}`
            axios
                .get(getRoom, { headers })
                .then((response) => {
                    const data = response.data.success.data;
                    setRooms(data);
                    setHotelId(data.hotel_id);
                    setRoomId(data.id)
                    setError(null);
                })
                .catch((err) => {
                    setError(err.response);
                    setHotelId(null);
                    setRoomId(null)
                    setRooms([]);
                });
        }
    }, [getRoomId]);

    // Getting user_id from user details api request
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/details", { headers })
            .then((response) => {
                const output = response.data.success.data;
                setUserId(output.id)
            })
            .catch((err) => {
                setUserId(null)
            });
    }, []);

    const bookNow = async (e) => {
        e.preventDefault();
        setError(null)
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
        axios
            .post("http://127.0.0.1:8000/api/reservation/store", {
                start_date: start_date,
                end_date: end_date,
                user_id: user_id,
                hotel_id: hotel_id,
                room_id: room_id,
                number_of_guests: number_of_guests
            }, { headers })
            .then((response) => {
                console.warn(response)
            })
            .catch((err) => {
                setError(err.response.data)
                console.log(err)
            })

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
                                {rooms.type && (
                                    <>
                                        <h2>Room No: <span className='starColor'>{rooms.room_no}</span></h2>
                                        <h2>Type: <span className='starColor'>{rooms.type.charAt(0).toUpperCase() + rooms.type.slice(1)}</span></h2>
                                    </>
                                )}
                                
                                <div className="text-danger my-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i key={star} className="fa fa-star starColor fa-2x pr-1 cursor"></i>
                                    ))}
                                </div>

                                <h2>PKR <span className='starColor'>{rooms.price}</span></h2>

                                <div className="container my-2">
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success "><i className="fa fa-wifi fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-car fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-television fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-bath fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-coffee fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                        <div className="col-6 col-md-5">
                                            <h6 className="text-success"><i className="fa fa-gift fa-2x cursor starColor" aria-hidden="true"></i></h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-2">
                                    <form onSubmit={bookNow}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="checkInDate">Check-in Date</label>
                                                <input type="date" id="checkInDate" className="form-control"
                                                    value={start_date} onChange={(e) => setStartDate(e.target.value)}
                                                />
                                                <span className="loginErrors">
                                                    {error && error.errors.start_date ? error.errors.start_date : null}
                                                </span>
                                            </div>

                                            <div className="col-md-3 ml-3">
                                                <label htmlFor="checkOutDate">Check-out Date</label>
                                                <input type="date" id="checkOutDate" className="form-control"
                                                    value={end_date} onChange={(e) => setEndDate(e.target.value)}
                                                />
                                                <span className="loginErrors">
                                                    {error && error.errors.end_date ? error.errors.end_date : null}
                                                </span>
                                            </div>

                                            <div className="col-md-3">
                                                <label htmlFor="select_guests">Number of Guests</label>
                                                <select
                                                    className="form-select"
                                                    value={number_of_guests}
                                                    onChange={(e) => setNumberOfGuests(e.target.value)}
                                                >
                                                    <option disabled>
                                                        Guests
                                                    </option>
                                                    {Array.from({ length: rooms.capacity }, (_, i) => (
                                                        <option key={i} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>

                                                <span className="loginErrors">
                                                    {error && error.errors.number_of_guests ? error.errors.number_of_guests : null}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="loginErrors">
                                            {error && error.errors.message ? error.errors.message : null}

                                            {/* {error && error.errors.start_date && error.errors.end_date ? alert("done") : null} */}
                                        </span>

                                        <button className="btn btn-danger btn-sm w-25 p-3 mt-4 webColor" type="submit" >Book Now</button>
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
                                        <td className='starColor'>{rooms.is_available ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Smoking</td>
                                        <td className='starColor'>{rooms.is_smoking_allowed ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Pool</td>
                                        <td className='starColor'>{rooms.has_pool_access ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Room Service</td>
                                        <td className='starColor'>{rooms.has_room_service ? "✓" : "✕"}</td>
                                    </tr>
                                    <tr>
                                        <td>Balcony</td>
                                        <td className='starColor'>{rooms.has_balcony ? "✓" : "✕"}</td>
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
