import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function AdminLogin2() {
  const [credentials, setCredentials] = useState({
    admin_id: "",
    admin_pass: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = "my_secure_token";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/admin",
        {
          admin_id: credentials.admin_id,
          admin_pass: credentials.admin_pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const isAdminValid = res.data.valid;

      if (isAdminValid) {
        // Pass the credentials as state
        sessionStorage.setItem("admin_id", credentials.admin_id);
        sessionStorage.setItem("admin_pass", credentials.admin_pass);
        navigate("/personal-expense-tracker/AdminDashboard", {
          state: {
            admin_id: isAdminValid.admin_id,
            admin_pass: credentials.admin_pass,
          },
        });
      }
      if (!isAdminValid) {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error fetching admin data");
    }
  };

  return (
    <>
      <div className="login-container background-image">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin ID:</label>
            <input
              type="text"
              className="form-control"
              name="admin_id"
              value={credentials.admin_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="admin_pass"
              value={credentials.admin_pass}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default AdminLogin2;
