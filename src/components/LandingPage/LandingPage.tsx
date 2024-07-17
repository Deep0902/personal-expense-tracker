import { useNavigate } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import logo from "/images/logo.svg";
import money from "/images/landing-page-money.png";
import devices from "/images/devices.png";
import exportExcel from "/images/export-icon.png";
import sofaChill from "/images/sofa-chill.png";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      
      
      <div className="mainContainer">
      <nav className="topNavbar">
        <div className="title">
          <img src={logo} alt="" />
          <span className="poppins-bold ">Personal Expense Tracker</span>
        </div>
        
        <div className="navbar-right">
          <button className="poppins-medium desktop-button">Sign In</button>
          <button className="mobile-menu-button" onClick={toggleDropdown}>
            ☰
          </button>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a href="#link1" className="dropdown-link">
              Sign In
            </a>
            <a href="#link2" className="dropdown-link">
              Admin Login
            </a>
          </div>
        )}
      </nav>
      <br />
      <br />
      <br />
      <br />
      
        <div className="container">
          <div className="item item-1 poppins-semibold">
            <span>
              Smart <span className="fontColor">Spending<br/> Starts</span> Here
            </span>
          </div>
          <div className="item item-2">
            <img src={money} alt="" />
          </div>
          <div className="item item-3 poppins-regular">
            Take control of your finances with our easy expense tracker. Perfect
            for both pros and beginners!
          </div>
          <div className="item item-4 poppins-medium">
            <button className="poppins-medium">Sign Up</button>
          </div>
        </div>
        
        <br />
        <br />
        <h5 className="poppins-medium h5-title">
          No More surprises! Our app keeps you informed about where your money
          goes <br />
          Track expenses and make informed decisions!
        </h5>
        <div className="cards-section">
          <div className="card">
            <label className="poppins-bold">Call to Action</label>
            <br />
            <span className="poppins-regular">
              You don't need to pay a single penny to get started or use our
              services!
            </span>
          </div>
          <div className="card">
            <label className="poppins-bold">Real Time Updates</label>
            <br />
            <span className="poppins-regular">
              Updates made from any of your devices will sync instantly!
            </span>
          </div>
          <div className="card">
            <label className="poppins-bold">Financial Clarity Awaits</label>
            <br />
            <span className="poppins-regular">
              Dive into your spending patterns and gain financial clarity today!
            </span>
          </div>
          <div className="card">
            <label className="poppins-bold">Categorization</label>
            <br />
            <span className="poppins-regular">
              Organize your expenses with customizable categories!
            </span>
          </div>
        </div>
        <div className="featuresSection">
          <div className="feature">
            <div className="featureText">
              <label className="poppins-bold">Easy to Use Interface</label>
              <br />
              <span className="poppins-medium">
                Simple and intutive design for efortless expense teacking!
              </span>
            </div>
            <img src={sofaChill} alt="" />
          </div>
          <div className="feature">
            <div className="featureText">
              <label className="poppins-bold">Multi-Device Sync!</label>
              <br />
              <span className="poppins-medium">
                Access your expenses from any device, anytime!
              </span>
            </div>
            <img src={devices} alt="" />
          </div>
          <div className="feature">
            <div className="featureText">
              <label className="poppins-bold">Export your expenses!</label>
              <br />
              <span className="poppins-medium">
                Export your data for additional analysis or record-keeping
              </span>
            </div>
            <img src={exportExcel} alt="" />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <br />
        <div className="endSection">
          <label className="poppins-semibold">
            Smart Spending Made Simple: Use Our Expense Tracker!
          </label>
          <span className="poppins-medium">Start your Journey Today!</span>
          <button className="poppins-medium">Sign Up</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="footer">
        <div className="textBlock">
          <div className="textSection">
            <label className="poppins-semibold">About</label>
            <br />
            <span className="poppins-regular">
              Personal expense tracking tool designed to help you manage your
              finances effortlessly
            </span>
          </div>
          <div className="textSection">
            <label className="poppins-semibold">Quick Links</label>
            <br />
            <span className="poppins-regular">
              <ul>
                <li>Email: deeptank09@gmail.com</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
              </ul>
            </span>
          </div>
          <div className="textSection">
            <label className="poppins-semibold">Project Info</label>
            <br />
            <span className="poppins-regular">
              This project is made using React.js, Flask, MongoDB and deployed
              on Github <br />
              <br />
              It is a personal project and not for commercial use
            </span>
          </div>
        </div>
        <br />
        <hr />
        <p>© 2024 Personal Expense Tracker. All rights reserved.</p>
      </div>
      <button
        onClick={() => {
          navigate("/personal-expense-tracker");
        }}
      >
        Homepage
      </button>
    </>
  );
}

export default LandingPage;
