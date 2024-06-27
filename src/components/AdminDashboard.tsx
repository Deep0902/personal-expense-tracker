import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/table.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Users {
  user_id: number;
  user_name: string;
  user_email: string;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const token = "my_secure_token";
  const [users, setUsers] = useState<Users[]>([]);

  const location = useLocation();
  const { admin_id, admin_pass } = location.state || {};
  useEffect(() => {
    if (!sessionStorage.admin_id || !sessionStorage.admin_pass) {
      navigate("/");
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
          navigate("/");
        } else {
          fetchUsers();
        }
      } catch (err) {
        console.log(err);
        navigate("/");
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
    navigate("/");
    window.history.pushState(null, "", "/");
  };

  return (
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
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
