import "./TopNavbarProfile.css";
import logo from "/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import avatarMale1 from "/images/avatars/avatar-male-1.svg";
interface TopNavbarProps{
  onLogoutClick: () => void;
}

function TopNavbarProfile({onLogoutClick}:TopNavbarProps) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <nav className="topNavbar">
        <div
          className="title"
          onClick={() => {
            navigate("/UserDashboard");
          }}
        >
          <img src={logo} alt="" />
          <span className="poppins-bold ">Personal Expense Tracker</span>
        </div>

        <div className="navbar-right">
          <img
            onClick={toggleDropdown}
            className="avatarLogo desktop-button"
            src={avatarMale1}
            alt=""
          />

          <img
            onClick={toggleDropdown}
            className="avatarLogo mobile-menu-button"
            src={avatarMale1}
            alt=""
          />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a className="dropdown-link">Profile</a>
            <a className="dropdown-link" onClick={onLogoutClick}>Logout</a>
            <a className="dropdown-link extra-option">Dashboard</a>
          </div>
        )}
      </nav>
    </>
  );
}

export default TopNavbarProfile;
