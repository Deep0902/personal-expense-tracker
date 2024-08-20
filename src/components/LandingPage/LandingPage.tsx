import { useNavigate } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import money from "/images/landing-page-money.png";
import devices from "/images/devices.png";
import exportExcel from "/images/export-icon.png";
import sofaChill from "/images/sofa-chill.png";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import Footer from "../Footer/Footer";
import ScrollTop from "../ScrollTop/ScrollTop";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <TopNavbarSignedOut />
      <div className="mainContainer">
        <br />
        <br />
        <br />
        <br />

        <div className="container">
          <ScrollTop/>
          <div className="item item-1 poppins-semibold">
            <span>
              Smart{" "}
              <span className="fontColor">
                Spending
                <br /> Starts
              </span>{" "}
              Here
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
            <button
              onClick={() => {
                navigate("/SignUp");
              }}
              className="poppins-medium"
            >
              Sign Up
            </button>
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
          <button
            className="poppins-medium"
            onClick={() => {
              navigate("/SignUp");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default LandingPage;
