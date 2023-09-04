import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import { Toast, toast } from "react-toastify";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:5001/get");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteEmp = (id) => {
    if (window.confirm("are you sure that you want to delete this employee?")) {
      axios.delete(`http://localhost:5001/remove/${id}`);
      toast.success("employee details successfully deleted");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150px"}}>
      <Link to="/addContact">
        <div  style={{display:"flex",justifyContent:"center"}} >
        <button className="btn btn-contact" > Add Employee</button>
        </div>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>id</th>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Mobile_Number</th>
            <th style={{ textAlign: "center" }}>DOB</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="rows">{index + 1}</th>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.mobilenumber}</td>
                <td>{item.dob}</td>
                <td>{item.address}</td>
                <td>
                  <Link to={`update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>

                  <Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => {
                        deleteEmp(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                  <Link to={`view/${item.id}`}>
                    <button className="btn btn-view">Read</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Home;
