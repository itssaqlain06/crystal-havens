import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function ViewUser() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userDel, setUserDel] = useState(null);
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();

  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setUserId(key);
    }
    if (userId) {
      const getUser = `http://127.0.0.1:8000/api/user/${userId}`;

      const tokenObj = JSON.parse(localStorage.getItem("token"));
      const token = tokenObj ? tokenObj.token : null;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(getUser, {headers})
        .then((response) => {
          const data = response.data.success.data;
          setUser(data);
          setError(null);
        })
        .catch((err) => {
          console.log(err)
          setError(err.response);
        });
    }
  }, [userId, searchParam]);

  const deleteUser = (index) => {

    const tokenObj = JSON.parse(localStorage.getItem("token"));
    const token = tokenObj ? tokenObj.token : null;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`http://127.0.0.1:8000/api/user/delete/${index}`,{headers})
      .then((response) => {
        const del = response.data.success;
        setUserDel(del);
        setUser(null);
        setTimeout(() => {
          navigate("/admin/user");
        }, 3000);
      })
      .catch((err) => {
        console.log(err)
        setError(err);
      });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">View User</h3>
              <p className="delSuccess">
                {userDel && userDel.message ? userDel.message : null}
              </p>
              {user !== null && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user !== null && (
                      <tr key={user.id}>
                        <th className="py-3" scope="row">
                          1
                        </th>
                        <td className="py-3">{user.name}</td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{user.phone}</td>
                        <td className="py-3">
                          {user.created_at
                            ? user.created_at.substring(0, 10)
                            : null}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-2"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <p className="serverError">{error && error.data.errors.message ? error.data.errors.message : null}</p>
              <p className="serverError">{error && error.statusText ? error.statusText : null}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
