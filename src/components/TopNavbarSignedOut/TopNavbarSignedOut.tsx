import { useNavigate } from "react-router-dom";
import logo from "/images/logo.svg";
import { useEffect, useState } from "react";
import "./TopNavbarSignedOut.css";
import moreIcon from "/images/more.svg";

function TopNavbarSignedOut() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [toggleScrollTop, setToggleScrollTop] = useState(false)
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [toggleScrollTop]);
  return (
    <>
      <nav className="topNavbar">
        <div
          className="title"
          onClick={() => {
            setToggleScrollTop(!toggleScrollTop)
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
            Sign In
          </button>
          <button className="mobile-menu-button" onClick={toggleDropdown}>
            <img src={moreIcon} alt="" />
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
    </>
  );
}
export default TopNavbarSignedOut;
