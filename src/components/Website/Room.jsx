import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

export default function Room() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const tokenObj = JSON.parse(localStorage.getItem('token'));
    const token = tokenObj ? tokenObj.token : null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/room", { headers })
            .then((response) => {
                const data = response.data.success.details;
                setRooms(data);
                setError("");
            })
            .catch((err) => {
                setError(err.response);
                setRooms([]);
            });
    }, []);

    return (
        <div className="our_room">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlepage">
                            <h2>Our Room</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {rooms && rooms !== "" && rooms.map((room, index) => (
                        <div className="col-md-4 col-sm-6" key={index}>
                            <Link to={`/room-details?${room.id}`}>
                                <div id="serv_hover" className="room">
                                    <div className="room_img">
                                        <figure><img className='roomImg' src={`${publicUrl}room${index + 1}.jpg`} alt="#" /></figure>
                                    </div>
                                    <div className="bed_room">
                                        <h3>{room.type.toUpperCase()}</h3>
                                        <p className='roomData'>PKR {room.price} </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {error && error.statusText && <span className='serverError text-center'>{error.statusText}</span>}
                </div>
            </div>
        </div>
    )
}
