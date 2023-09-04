import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Addinfo.css";
import {emailValidation,mblNumberValidation,nameValidation,lnameValidation,addressValidation} from "./Validation";


const Addinfo = () => {
    const Navigate = useNavigate();
const[values,setValues] = useState({
    firstname: '',
    lastname: '',
    email:'',
    mobile_number:'',
    dob:'',
    address:'',
});
const { id } = useParams();

useEffect(() => {
   axios.get(`http://localhost:5001/get/${id}`)
     .then((res) => {
       const data = res.data[0];
       setValues({
         firstname: data.firstname,
         lastname: data.lastname,
         email: data.email,
         mobile_number: data.mobile_number,
         dob: data.dob,
         address: data.address,
       });
     })
     .catch((err) => {
       console.log(err);
     });
}, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
  if(!firstname || !lastname || !email || !mobile_number || !dob || !address){
    toast.error("please fill all the fileds");
  }else{
    if(!id){
      axios
        .post("http://localhost:5001/api/post", values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }else{
      axios
        .put(`http://localhost:5001/put/${id}`, values)
        .then((res) => {
          console.log(res)
          toast.success("record successfully updated");
          Navigate("/");
        })
        .catch((err) => console.log(err));
      }
  }  

    
  };
  const handleChange = (e) =>{
    const{name, value} = e.target;
    setValues({
      ...values,[name] : value,
    });
  }
  return (
    <div className="whole">
      <div className="main">
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div className="heading">
            <h2>Registration Form</h2>
          </div>
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
          <div>
            <input type="submit" value={id ? "Update":"Save"} />
            <Link to="/">
              <input type="button" value="Go Back" />
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addinfo;
