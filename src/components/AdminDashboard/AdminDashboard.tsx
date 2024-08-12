import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import "../SignIn/SignIn.css";
import logo from "/images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "../../interfaces/Users";
import Footer from "../Footer/Footer";
import moreIcon from "/images/more.svg";

function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const token = "my_secure_token";
  const [users, setUsers] = useState<Users[]>([]);

  const location = useLocation();
  const { admin_id, admin_pass } = location.state || {};
  useEffect(() => {
    if (!sessionStorage.admin_id || !sessionStorage.admin_pass) {
      navigate("/personal-expense-tracker");
      return;
    }

    const verifyAdmin = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/admin",
          {
            admin_id: sessionStorage.admin_id,
            admin_pass: sessionStorage.admin_pass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const isValidAdmin = res.data.valid;
        console.log(isValidAdmin);
        if (!isValidAdmin) {
          navigate("/personal-expense-tracker");
        } else {
          fetchUsers();
        }
      } catch (err) {
        console.log(err);
        navigate("/personal-expense-tracker");
      }
    };

    verifyAdmin();
    // Replace the current history state to prevent back navigation
    window.history.replaceState(null, "", window.location.pathname);
  }, [admin_id, admin_pass, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_id");
    sessionStorage.removeItem("admin_pass");
    navigate("/AdminLogin");
    window.history.pushState(null, "", "/AdminLogin");
  };

  return (
    <>
      <div className="customTopNavbar">
        <nav className="topNavbar">
          <div
            className="title"
            onClick={() => {
              navigate("/LandingPage");
            }}
          >
            <img src={logo} alt="" />
            <span className="poppins-bold ">Personal Expense Tracker</span>
          </div>

          <div className="navbar-right">
            <button
              onClick={handleLogout}
              className="poppins-medium desktop-button"
            >
              Log Out
            </button>
            <button className="mobile-menu-button" onClick={toggleDropdown}>
              <img src={moreIcon} alt="" />
            </button>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a onClick={handleLogout} className="dropdown-link">
                Logout
              </a>
            </div>
          )}
        </nav>
      </div>
      <br />
      <br />
      <div className="adminDashboard">
        <h3>Hello {sessionStorage.admin_id}</h3>
        <div className="dashboard-container">
          <h2>Admin Dashboard</h2>
          {admin_id && <p>Hi, {admin_id}</p>}
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;
