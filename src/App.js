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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<><Sidebar /><Navbar/></>} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/users" element={<><Sidebar/><Users/></>}></Route>
        <Route path="/admin/manageUser" element={<><Sidebar/><ManageUser/></>}></Route>
        <Route path="/admin/hotels" element={<><Sidebar/><Hotels/></>}></Route>
        <Route path="/admin/manageHotel" element={<><Sidebar/><ManageHotel/></>}></Route>
        <Route path="/admin/rooms" element={<><Sidebar/><Rooms/></>}></Route>
        <Route path="/admin/bookings" element={<><Sidebar/><Bookings/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
