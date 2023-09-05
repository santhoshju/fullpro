import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Addinfo.css";
import {
  emailValidation,
  mblNumberValidation,
  nameValidation,
  lnameValidation,
  addressValidation,
} from "./Validation";

const Addinfo = () => {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile_number: "",
    dob: "",
    address: "",
  });
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/get/${id}`);
        const data = res.data[0];
        setValues({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile_number: data.mobile_number,
          dob: data.dob,
          address: data.address,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values.mobile_number);
    if (
      values.firstname === "" ||
      values.lastname === "" ||
      values.email === "" ||
      values.mobile_number === "" ||
      values.dob === "" ||
      values.address === ""
    ) {
      toast.error("please fill all the fileds");
      return;
    }
    if (!isEmailValid(values.email)) {
      setEmailError("Invalid email");
      return;
    } else {
      if (!id) {
        axios
          .post("http://localhost:5001/api/post", values)
          .then((res) => setUser(res))
          .catch((err) => console.log(err));
      } else {
        axios
          .put(`http://localhost:5001/put/${id}`, values)
          .then((res) => {
            console.log(res);
            toast.success("record successfully updated");
            Navigate("/");
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setEmailError("");

    if (name === "email" && value !== "") {
      if (!isEmailValid(value)) {
        setEmailError("Invalid email");
      }
    }
  };
  return (
    <div className="whole">
      <div className="main">
        <form style={{}} onSubmit={handleSubmit}>
          <div className="design">
            <div className="names">
              <div className="details">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={values.firstname || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="details">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  value={values.lastname || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="info">
              <div className="details">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email || ""}
                  onChange={handleChange}
                />
                {emailError && (
                  <div className="error" style={{ color: "red" }}>
                    {emailError}
                  </div>
                )}
              </div>
              <div className="details">
                <input
                  type="number"
                  name="mobile_number"
                  id="mobile_number"
                  placeholder="Mobile Number"
                  maxLength={10}
                  value={values.mobile_number || ""}
                  onChange={handleChange}
                />
                {!mblNumberValidation && (
                  <div className="error" style={{ color: "red" }}>
                    error
                  </div>
                )}
              </div>
            </div>

            <div className="basic">
              <div className="details">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Date of Birth"
                  value={values.dob || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="details">
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={values.address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <input type="submit" id="save" value={id ? "Update" : "Save"} />

            <Link to="/">
              <input type="button" id="goback" value="Go Back" />
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addinfo;
