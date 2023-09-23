import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../App.css';

export default function Users() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user", { headers })
      .then((response) => {
        const data = response.data.success.data;
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  
  const viewUser = ((index)=>{
   navigate(`/admin/manageUser?${index}`)
 })
  
  return (
    <div className="content">
      <div className="container-fluid pt-4 px-4">
        <div className="col-sm-12 col-xl-12">
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4 text-color">Users</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users !== null &&
                  users.map((user, index) => (
                    <tr key={index}>
                      <th className="py-3" scope="row">{index+1}</th>
                      <td className="py-3">{user.name}</td>
                      <td className="py-3">{user.email}</td>
                      <td className="py-3">{user.phone}</td>
                      <td>
                        {index !== 0 && index !== 1 && (
                          <>
                           <button
                           type="button"
                           className="btn btn-outline-success m-2"
                           onClick={()=>viewUser(user.id)}
                         >
                           View
                         </button>
                         </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
