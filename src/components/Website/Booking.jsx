import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Booking() {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(null);

    const tokenObj = JSON.parse(localStorage.getItem("token"));
    const token = tokenObj ? tokenObj.token : null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/booking", { headers })
            .then((response) => {
                const data = response.data.success.data;
                setBooking(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.response);
            });
    }, []);

    const viewBooking = (index) => {
        // navigate(`/admin/booking/view?${index}`);
    };
    return (
        <>
            <div className="our_room">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2>Booking</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-light rounded h-100 p-4">
                            {booking !== null && (
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="20px">#</th>
                                            <th scope="col" width="20px">Room No</th>
                                            <th scope="col" width="20px">Room Price</th>
                                            <th scope="col" width="20px">Number Of Guests</th>
                                            <th scope="col" width="20px">Total Amount</th>
                                            <th scope="col" width="20px">Start Date</th>
                                            <th scope="col" width="20px">End Date</th>
                                            <th scope="col" width="20px">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booking !== null &&
                                            booking.map((room, index) => (
                                                <tr key={index}>
                                                    <th className="py-3" scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td className="py-3">{room.room_id}</td>
                                                    <td className="py-3">{room.price}</td>
                                                    <td className="py-3">{room.number_of_guests}</td>
                                                    <td className="py-3">{room.total_amount}</td>
                                                    <td className="py-3">{room.start_date}</td>
                                                    <td className="py-3">{room.end_date}</td>
                                                    <td className="py-3">
                                                        {new Date(room.created_at).toLocaleDateString('en-US', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                            <span className="serverError">{error && error.statusText ? error.statusText : null}</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
