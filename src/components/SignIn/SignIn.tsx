import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "/images/logo.svg";
import Footer from "../Footer/Footer";
import { useState } from "react";

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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };
  return (
    <>
      <div className="mainConatiner">
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
                onClick={() => {
                  navigate("/SignIn");
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
                <a href="#link2" className="dropdown-link">
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
          <div className="inputBox">
            <input
              className="poppins-regular"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="inputBox">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="poppins-regular"
              placeholder="Password"
            />
            <span
              className="toggle-button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
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
          <button className="poppins-semibold">Sign In</button>
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
