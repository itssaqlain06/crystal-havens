import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Admin/layout/Sidebar";
import Navbar from "./components/Admin/layout/Navbar";
import Login from "./components/Admin/Login";
import Users from "./components/Admin/Users";
import Hotels from "./components/Admin/Hotels";
import Rooms from "./components/Admin/Rooms";
import Bookings from "./components/Admin/Bookings";
import ViewUser from "./components/Admin/ViewUser";
import ViewHotel from "./components/Admin/ViewHotel";
import AddHotel from "./components/Admin/AddHotel";
import ViewRoom from "./components/Admin/ViewRoom";
import AddRoom from "./components/Admin/AddRoom";
import UpdateHotel from "./components/Admin/UpdateHotel";
import UpdateRoom from "./components/Admin/UpdateRoom";
import ViewBooking from "./components/Admin/ViewBooking";
import Reservations from "./components/Admin/Reservations";
import ViewReservation from "./components/Admin/ViewReservation"
import UpdateBooking from "./components/Admin/UpdateBooking";
import UpdateReservation from "./components/Admin/UpdateReservation";
import Index from "./components/Website/Index"
import About from "./components/Website/About";
import Room from "./components/Website/Room";
import Contact from "./components/Website/Contact";
import Header from "./components/Website/layout/Header";
import Footer from "./components/Website/layout/Footer";
import AboutHeader from "./components/Website/headers/AboutHeader";
import RoomHeader from "./components/Website/headers/RoomHeader";
import ContactHeader from "./components/Website/headers/ContactHeader";
import Registeration from "./components/Website/Auth/Registeration";
import UserLogin from "./components/Website/Auth/Login";
import RoomDetails from "./components/Website/RoomDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Index />}></Route>
        <Route path="/about" element={<><Header/><AboutHeader/><About /><Footer/></>}></Route>
        <Route path="/room" element={<><Header/><RoomHeader/><Room /><Footer/></>}></Route>
        <Route path="/room-details" element={<><Header/><RoomHeader/><RoomDetails /><Footer/></>}></Route>
        <Route path="/contact" element={<><Header/><ContactHeader/><Contact /><Footer/></>}></Route>
        <Route path="/register" element={<><Header/><Registeration/><Footer/></>}></Route>
        <Route path="/login" element={<><Header/><UserLogin/><Footer/></>}></Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<><Sidebar /><Navbar /></>}></Route>
        <Route path="/admin/login" element={<Login />} />
        {/* User Section */}
        <Route path="/admin/user" element={<><Sidebar /><Users /></>}></Route>
        <Route path="/admin/user/view" element={<><Sidebar /><ViewUser /></>}></Route>
        {/* Hotel Section */}
        <Route path="/admin/hotel" element={<><Sidebar /><Hotels /></>}></Route>
        <Route path="/admin/hotel/view" element={<><Sidebar /><ViewHotel /></>}></Route>
        <Route path="/admin/hotel/add" element={<><Sidebar /><AddHotel /></>}></Route>
        <Route path="/admin/hotel/update" element={<><Sidebar /><UpdateHotel /></>}></Route>
        {/* Room Section */}
        <Route path="/admin/room" element={<><Sidebar /><Rooms /></>}></Route>
        <Route path="/admin/room/view" element={<><Sidebar /><ViewRoom /></>}></Route>
        <Route path="/admin/room/add" element={<><Sidebar /><AddRoom /></>}></Route>
        <Route path="/admin/room/update" element={<><Sidebar /><UpdateRoom /></>}></Route>
        {/* Booking Section */}
        <Route path="/admin/booking" element={<><Sidebar /><Bookings /></>}></Route>
        <Route path="/admin/booking/view" element={<><Sidebar /><ViewBooking /></>}></Route>
        <Route path="/admin/booking/update" element={<><Sidebar/><UpdateBooking/></>}></Route>
        {/* Reservation Section */}
        <Route path="/admin/reservation" element={<><Sidebar /><Reservations /></>}></Route>
        <Route path="/admin/reservation/view" element={<><Sidebar /><ViewReservation /></>}></Route>
        <Route path="/admin/reservation/update" element={<><Sidebar /><UpdateReservation /></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
