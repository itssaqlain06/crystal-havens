import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Admin/layout/Sidebar";
import Navbar from "./components/Admin/layout/Navbar";
import Login from "./components/Admin/Login";
import Users from "./components/Admin/Users";
import Hotels from "./components/Admin/Hotels";
import Rooms from "./components/Admin/Rooms";
import Bookings from "./components/Admin/Bookings";
import ManageUser from "./components/Admin/ManageUser";
import ManageHotel from "./components/Admin/ManageHotel";
import AddHotel from "./components/Admin/AddHotel";
import ManageRoom from "./components/Admin/ManageRoom";
import AddRoom from "./components/Admin/AddRoom";
import UpdateHotel from "./components/Admin/UpdateHotel";
import UpdateRoom from "./components/Admin/UpdateRoom";
import ViewBooking from "./components/Admin/ViewBooking";
import Reservations from "./components/Admin/Reservations";
import ViewReservation from "./components/Admin/ViewReservation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/admin" element={<><Sidebar /><Navbar/></>} />
        <Route path="/admin/login" element={<Login />} />
        {/* User Section */}
        <Route path="/admin/users" element={<><Sidebar/><Users/></>}></Route>
        <Route path="/admin/manageUser" element={<><Sidebar/><ManageUser/></>}></Route>
        {/* Hotel Section */}
        <Route path="/admin/hotels" element={<><Sidebar/><Hotels/></>}></Route>
        <Route path="/admin/manageHotel" element={<><Sidebar/><ManageHotel/></>}></Route>
        <Route path="/admin/hotel/add" element={<><Sidebar/><AddHotel/></>}></Route>
        <Route path="/admin/hotel/update" element={<><Sidebar/><UpdateHotel/></>}></Route>
        {/* Room Section */}
        <Route path="/admin/rooms" element={<><Sidebar/><Rooms/></>}></Route>
        <Route path="/admin/manageRoom" element={<><Sidebar/><ManageRoom/></>}></Route>
        <Route path="/admin/room/add" element={<><Sidebar/><AddRoom/></>}></Route>
        <Route path="/admin/room/update" element={<><Sidebar/><UpdateRoom/></>}></Route>
        {/* Booking Section */}
        <Route path="/admin/bookings" element={<><Sidebar/><Bookings/></>}></Route>
        <Route path="/admin/viewBooking" element={<><Sidebar/><ViewBooking/></>}></Route>
        {/* Reservation Section */}
        <Route path="/admin/reservations" element={<><Sidebar/><Reservations/></>}></Route>
        <Route path="/admin/viewReservation" element={<><Sidebar/><ViewReservation/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
