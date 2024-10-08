import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./AdminLogin.css";
import { useEffect, useState } from "react";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import axios from "axios";
import PopupWarning from "../PopupWarning/PopupWarning";
import ScrollTop from "../ScrollTop/ScrollTop";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordView = () => {
    if (showPassword == true) setShowPassword(false);
    else setShowPassword(true);
  };

  //   Admin Login Logic with API
  const [credentials, setCredentials] = useState({
    admin_id: "",
    admin_pass: "", // Default value to avoid warnings
  });
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
      } else if (!isAdminValid) {
        setIsAlertSuccess(false);
        toggleAlertPopup();
        setAlertMessage("Invalid credentials");
      }
    } catch (err) {
      setIsAlertSuccess(false);
      toggleAlertPopup();
      setAlertMessage("Invalid Credentials");
    }
  };
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  //Logic for Alert
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");
  return (
    <>
      <div className="mainConatiner">
        <ScrollTop />
        <TopNavbarSignedOut />
        <br />
        <br />
        <br />
        {isPopVisible && (
          <PopupWarning
            message={alertMessage}
            onButtonClickded={toggleAlertPopup}
            successAlert={isAlertSuccess}
          />
        )}
        <div className="credentialsCard">
          <label className="poppins-bold">Admin Login</label>
          <span className="poppins-regular subtext">
            Please Enter Admin credentials to continue.
          </span>
          <form onSubmit={handleSubmit}>
            <div className="form-group inputBox">
              <input
                type="text"
                className="form-control poppins-regular"
                name="admin_id"
                value={credentials.admin_id}
                onChange={handleChange}
                placeholder="Admin ID"
                required
              />
            </div>
            <div className="form-group inputBox">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="form-control poppins-regular"
                name="admin_pass"
                value={credentials.admin_pass}
                placeholder="Password"
                required
              />
              <span className="toggle-button" onClick={handlePasswordView}>
                👁️
              </span>
            </div>
            <button type="submit" className="poppins-semibold">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <button
        onClick={() => {
          navigate("/personal-expense-tracker/LandingPage");
        }}
      >
        Homepage
      </button>
    </>
  );
}

export default AdminLogin;
