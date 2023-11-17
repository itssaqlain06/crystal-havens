import React from 'react'
import { useLocation } from 'react-router-dom'

export default function AllHeaders() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className="main-layout">
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>{currentPath === '/about' ? 'About Us' : currentPath === '/room' ? 'Room' : currentPath === '/room-details' ? 'Room Details' : currentPath === '/contact' ? 'Contact Us' : currentPath === '/booking' ? 'Booking' : ''}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
