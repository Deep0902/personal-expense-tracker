import React, { useState } from "react";
import axios from "axios";
import "../styles/form.css";
import { useNavigate } from "react-router-dom";

function AddBasicAPI() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    user_pass: "",
    user_email: "",
    user_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const token = "my_secure_token";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/users", userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("User added successfully:", res.data);
        // Optionally reset form or update state after successful submission
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
      alert('User added successfully')
      navigate('/personal-expense-tracker')
  };

  return (
    <>
      <div className="container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="user_name"
              value={userDetails.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label>User Email:</label>
            <br />
            <input
              type="email"
              className="form-control"
              name="user_email"
              value={userDetails.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label>Password:</label>
            <br />
            <input
              type="password"
              className="form-control"
              name="user_pass"
              value={userDetails.user_pass}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
          <br />
          <button onClick={()=>{
            navigate("/personal-expense-tracker")
          }}>Go to homepage</button>
        </form>
      </div>

      
    </>
  );
}

export default AddBasicAPI;
