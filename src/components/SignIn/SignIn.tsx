import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "/images/logo.svg";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import "../TopNavbarSignedOut/TopNavbarSignedOut.css";
import axios from "axios";

function SignIn() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const [credentials, setCredentials] = useState<{
    user_email: string;
    user_pass: string;
  }>({
    user_email: "",
    user_pass: "",
  });

  const [error, setError] = useState<string>(""); // Explicitly setting the type to string

  const token = "my_secure_token";

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    const storedPass = localStorage.getItem("user_pass");
    if (storedEmail && storedPass) {
      setCredentials({ user_email: storedEmail, user_pass: storedPass });
    }
  }, []);

  const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/user",
        {
          user_email: credentials.user_email,
          user_pass: credentials.user_pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const isUserValid = res.data.valid;

      if (isUserValid) {
        if (isChecked) {
          localStorage.setItem("user_email", credentials.user_email);
          localStorage.setItem("user_pass", credentials.user_pass);
        } else {
          sessionStorage.setItem("user_email", credentials.user_email);
          sessionStorage.setItem("user_pass", credentials.user_pass);
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_pass");
        }
        navigate("/UserDashboard", {
          state: {
            user_email: isUserValid.user_email,
            user_pass: credentials.user_pass,
          },
        });
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="customTopNavbar">
          <nav className="topNavbar">
            <div
              className="title"
              onClick={() => {
                navigate("/LandingPage");
              }}
            >
              <img src={logo} alt="Logo" />
              <span className="poppins-bold">Personal Expense Tracker</span>
            </div>

            <div className="navbar-right">
              <button
                onClick={() => {
                  navigate("/AdminLogin");
                }}
                className="poppins-medium desktop-button"
              >
                Admin Login
              </button>
              <button className="mobile-menu-button" onClick={toggleDropdown}>
                ☰
              </button>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a
                  onClick={() => {
                    navigate("/SignIn");
                  }}
                  className="dropdown-link"
                >
                  Sign In
                </a>
                <a
                  onClick={() => {
                    navigate("/AdminLogin");
                  }}
                  className="dropdown-link"
                >
                  Admin Login
                </a>
              </div>
            )}
          </nav>
        </div>
        <br />
        <br />
        <br />
        <div className="credentialsCard">
          <label className="poppins-bold">Sign In</label>
          <span className="poppins-regular subtext">
            Please login to continue to your account.
          </span>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                className="poppins-regular"
                type="email"
                placeholder="Email"
                name="user_email"
                onChange={handleChangeSignIn}
                value={credentials.user_email}
              />
            </div>
            <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.user_pass}
                name="user_pass"
                onChange={handleChangeSignIn}
                className="poppins-regular"
                placeholder="Password"
              />
              <span className="toggle-button" onClick={handlePasswordView}>
                👁️
              </span>
            </div>
            <div className="checkboxInput">
              <input
                type="checkbox"
                id="customCheckbox"
                className="styled-checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheckbox" className="poppins-medium">
                &nbsp;Keep Me Logged In
              </label>
            </div>
            <button type="submit" className="poppins-semibold">
              Sign In
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>

          <div className="or-section">
            <hr className="line" />
            <span className="or-text poppins-medium">or</span>
            <hr className="line" />
          </div>
          <div className="bottomSection">
            <p className="poppins-regular">
              Need an account?{" "}
              <span className="underlineText poppins-semibold">Create One</span>
            </p>
            <p className="underlineText poppins-semibold">Forgot Password</p>
          </div>
        </div>
      </div>
      <Footer />
      <button
        onClick={() => {
          navigate("/LandingPage");
        }}
      >
        Homepage
      </button>
    </>
  );
}

export default SignIn;
