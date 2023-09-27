import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Rooms() {
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/room", { headers })
      .then((response) => {
        const data = response.data.success.details;
        setRooms(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const viewRoom = (index) => {
    navigate(`/admin/manageRoom?${index}`);
  };

  const updateRoom = (index) => {
    navigate(`/admin/room/update?${index}`);
  };

  const addRoom = () => {
    navigate("/admin/room/add");
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <button
            type="button"
            className="btn btn-primary mb-4 px-5"
            onClick={() => addRoom()}
          >
            Add
          </button>
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">Rooms</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" width="20px">#</th>
                    <th scope="col" width="20px">Room No</th>
                    <th scope="col" width="20px">type</th>
                    <th scope="col" width="20px">Price</th>
                    <th scope="col" width="20px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms !== null &&
                    rooms.map((room, index) => (
                      <tr key={index}>
                        <th className="py-3" scope="row">
                          {index + 1}
                        </th>
                        <td className="py-3">{room.room_no}</td>
                        <td className="py-3">{room.type}</td>
                        <td className="py-3">{room.price}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                            onClick={() => viewRoom(room.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning m-2"
                            onClick={() => updateRoom(room.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
