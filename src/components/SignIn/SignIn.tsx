import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import Footer from "../Footer/Footer";

function SignIn() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mainConatiner">
        <TopNavbarSignedOut />
        <br />
        <br />
        <br />
        <div className="credentialsCard">
          <label className="poppins-bold">Sign In</label>
          <span className="poppins-regular subtext">Please login to continue to your account.</span>
          <div className="inputBox">
            <input className="poppins-regular" type="email" placeholder="Email" />
          </div>
          <div className="inputBox">
            <input className="poppins-regular" type="password" placeholder="Password" />
          </div>
          
          <div className="checkboxInput">
            <input type="checkbox" />
            <span className="poppins-medium">Keep My Logged in</span>
          </div>
          <button>Sign In</button>
          <p>or</p>
          <p>Need an account? Create One</p>
          <p>Forgot Password</p>
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
