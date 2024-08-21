import Footer from "../Footer/Footer";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import "./SignUp.css";
import "../SignIn/SignIn.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupWarning from "../PopupWarning/PopupWarning";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ScrollTop from "../ScrollTop/ScrollTop";

function SignUp() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    user_pass: "",
    confirm_pass: "",
    user_email: "",
    user_name: "",
  });

  // State for managing password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordView = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const token = "my_secure_token";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userDetails.user_pass !== userDetails.confirm_pass) {
      setIsAlertSuccess(false);
      setAlertMessage("Passwords don't match!");
      toggleAlertPopup();
      setUserDetails({
        user_pass: "",
        confirm_pass: "",
        user_email: "",
        user_name: "",
      });
      return;
    }

    axios
      .post("http://127.0.0.1:5000/api/users", userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("User added successfully:", res.data);
        setAlertMessage("User added successfully");
        setIsAlertSuccess(true);
        toggleAlertPopup();
        toggleLoading();
        setTimeout(() => {
          navigate("/personal-expense-tracker/SignIn");
        }, 3000);
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setIsAlertSuccess(false);
          setAlertMessage(err.response.data.message);
          toggleAlertPopup();
          setUserDetails({
            user_pass: "",
            confirm_pass: "",
            user_email: "",
            user_name: "",
          });
        } else {
          setIsAlertSuccess(false);
          setAlertMessage("An error occurred while adding the user");
          toggleAlertPopup();
          setUserDetails({
            user_pass: "",
            confirm_pass: "",
            user_email: "",
            user_name: "",
          });
        }
      });
  };

  //Logic for Alert
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");
  //Logic for Loading screen
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const toggleLoading = () => {
    setIsLoadingVisible(!isLoadingVisible);
  };
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <ScrollTop />
      <TopNavbarSignedOut />
      <br />
      {isPopVisible && (
        <PopupWarning
          message={alertMessage}
          onButtonClickded={toggleAlertPopup}
          successAlert={isAlertSuccess}
        />
      )}
      {isLoadingVisible && <LoadingComponent />}
      <div className="mainContainer">
        <div className="credentialsCard">
          <label className="poppins-bold">Sign Up</label>
          <span className="poppins-regular subtext">
            Sign Up to enjoy the features!
          </span>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                className="form-control poppins-regular"
                name="user_name"
                value={userDetails.user_name}
                onChange={handleChange}
                required
                placeholder="User Name"
              />
            </div>
            <div className="inputBox">
              <input
                type="email"
                className="form-control poppins-regular"
                name="user_email"
                value={userDetails.user_email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control poppins-regular"
                name="user_pass"
                value={userDetails.user_pass}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <span className="toggle-button" onClick={handlePasswordView}>
                👁️
              </span>
            </div>
            <div className="inputBox">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control poppins-regular"
                name="confirm_pass"
                value={userDetails.confirm_pass}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              <span
                className="toggle-button"
                onClick={handleConfirmPasswordView}
              >
                👁️
              </span>
            </div>

            <button type="submit" className="poppins-semibold">
              Sign Up
            </button>
          </form>

          <div className="or-section">
            <hr className="line" />
            <span className="or-text poppins-medium">or</span>
            <hr className="line" />
          </div>
          <div className="bottomSection">
            <p className="poppins-regular">
              Already have an account? &nbsp;
              <span
                onClick={() => {
                  navigate("/personal-expense-tracker/SignIn");
                }}
                className="underlineText poppins-semibold"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
