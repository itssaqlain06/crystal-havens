import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function ManageRoom() {
  const [roomId, setRoomId] = useState(null);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [roomDel, setRoomDel] = useState(null);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setRoomId(key);
    }
    if (roomId) {
      const getUser = `http://127.0.0.1:8000/api/room/${roomId}`;

      axios
        .get(getUser, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setRoom(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [roomId, searchParam]);

  const deleteUser = (index) => {
    axios
      .delete(`http://127.0.0.1:8000/api/room/delete/${index}`)
      .then((response) => {
        const del = response.data.success;
        setRoomDel(del);
        setRoom(null);
        setTimeout(() => {
          navigate("/admin/rooms");
        }, 3000);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
    <div className="content">
      <Header />
      <div className="container-fluid pt-4 px-4">
        <div className="col-sm-12 col-xl-12">
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4 text-color">Manage Room</h3>
            <span className="delSuccess">
              {roomDel && roomDel.message ? roomDel.message : null}
            </span>
            {room !== null && (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Room No</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">Available</th>
                    <th scope="col">Smoking</th>
                    <th scope="col">Balcony</th>
                    <th scope="col">Pool</th>
                    <th scope="col">Room Service</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {room !== null && (
                    <tr key={room.id}>
                      <th className="py-3" scope="row">
                        1
                      </th>
                      <td className="py-3">{room.room_no}</td>
                      <td className="py-3">{room.price}</td>
                      <td className="py-3">{room.type}</td>
                      <td className="py-3">{room.available}</td>
                      <td className="py-3">{room.is_smoking_allowed}</td>
                      <td className="py-3">{room.has_balcony}</td>
                      <td className="py-3">{room.has_pool_access}</td>
                      <td className="py-3">{room.has_room_service}</td>
                      <td className="py-3">{room.description}</td>
                      <td className="py-3">
                        {room.created_at
                          ? room.created_at.substring(0, 10)
                          : null}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger m-2"
                          onClick={() => deleteUser(room.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    <Footer />
    </div>
    </div>
  );
}
