import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

function UserDashboard() {
  const navigate = useNavigate();
  const token = "my_secure_token";

  useEffect(() => {
    if (!sessionStorage.user_email || !sessionStorage.user_pass) {
      navigate("/personal-expense-tracker");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/user",
          {
            user_email: sessionStorage.user_email,
            user_pass: sessionStorage.user_pass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const isUserValid = res.data.valid;
        console.log(isUserValid);
        if (!isUserValid) {
          navigate("/personal-expense-tracker");
        } else {
          alert("Login Successfully verified");
        }
      } catch (err) {
        console.log(err);
        navigate("/personal-expense-tracker");
      }
    };

    verifyUser();
    // Replace the current history state to prevent back navigation
    window.history.replaceState(null, "", window.location.pathname);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_pass");
    navigate("/SignIn");
    window.history.pushState(null, "", "/SignIn");
  };

  return (
    <>
      <h2>This is User Dashboard</h2>
      <p>Hello {sessionStorage.user_email}</p>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </>
  );
}

export default UserDashboard;
