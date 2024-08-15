import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import { Users } from "../../interfaces/Users";
import PopupWarning from "../PopupWarning/PopupWarning";

function ForgotPassword() {
  const token = "my_secure_token"; // Token for authorization
  const navigate = useNavigate();
  const [phases, setPhases] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [usersDetails, setUsersDetails] = useState<Users[]>([]); // Explicitly type the state as an array of Users
  const [countdown, setCountdown] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetFields = () => {
    setOtp("");
    setEmail("");
    setGeneratedOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  // Load user data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsersDetails(response.data); // The response should match the Users interface structure
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const nextState = () => {
    setPhases((prev) => prev + 1);
  };

  //   const prevState = () => {
  //     setPhases((prev) => prev - 1);
  //   };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSendOtp = () => {
    const user = usersDetails.find((user) => user.user_email === email);
    if (user) {
      setUserId(user.user_id);
      generateOtp();
      nextState();
    } else {
      setAlertMessage("Email not Found!");
      toggleAlertPopup();
    }
  };

  const generateOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    alert(`Your OTP is ${randomOtp}`);
    setCountdown(10);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirmOtp = () => {
    if (otp === generatedOtp) {
      nextState();
    } else {
      setAlertMessage("Invalid OTP. Please try again.");
      toggleAlertPopup();
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      generateOtp();
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/users/${userId}`,
        { user_pass: password, user_email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully!");
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
      alert("Failed to update password.");
      setPhases(1);
      resetFields();
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleOldPasswordView = () => {
    setShowPassword(!showPassword);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleNewPasswordView = () => {
    setShowNewPassword(!showNewPassword);
  };

  //Logic for Alert
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <>
      <div>
        <TopNavbarSignedOut />
        <div className="">
          <br />
          <br />
          <br />
          {isPopVisible && (
            <PopupWarning
              message={alertMessage}
              onButtonClickded={toggleAlertPopup}
            />
          )}
          {/* <button onClick={prevState}>Previous</button>&nbsp;{phases}&nbsp;
          <button onClick={nextState}>Next</button> */}
          <div className="credentialsCard2">
            <label className="poppins-bold">Forgot Password</label>
            {phases === 1 && (
              <form
                className=""
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent the default form submission
                  handleSendOtp(); // Call the function to handle OTP sending
                }}
              >
                <span className="poppins-regular subtext">
                  Please enter your email
                </span>
                <div className="inputBox">
                  <input
                    className="poppins-regular"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={handleEmailChange}
                  />
                </div>
                <button
                  className="poppins-semibold add-button"
                  type="submit" // This makes the button submit the form
                >
                  Send OTP
                </button>
              </form>
            )}

            {phases === 2 && (
              <div className="">
                <span className="poppins-regular subtext">Enter the OTP</span>
                <div className="inputBox">
                  <input
                    className="poppins-regular"
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
                <button
                  className="poppins-semibold add-button"
                  onClick={handleConfirmOtp}
                >
                  Confirm OTP
                </button>
                <button
                  type="submit"
                  className="poppins-semibold cancel-button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                >
                  Resend OTP ({countdown > 0 ? `${countdown}s` : "Available"})
                </button>
                <br />
                <br />
              </div>
            )}
            {phases === 3 && (
              <div className="">
                <span className="poppins-regular subtext">
                  Enter New Password
                </span>
                <div className="inputBox">
                  <input
                    className="poppins-regular"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className="toggle-button"
                    onClick={handleOldPasswordView}
                  >
                    👁️
                  </span>
                </div>
                <div className="inputBox">
                  <input
                    className="poppins-regular"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <span
                    className="toggle-button"
                    onClick={handleNewPasswordView}
                  >
                    👁️
                  </span>
                </div>
                <button
                  className="poppins-semibold add-button"
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </button>
                <button
                  className="poppins-semibold cancel-button"
                  onClick={() => {
                    resetFields();
                    setPhases(1);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="or-section">
              <hr className="line" />
              <span className="or-text poppins-medium">or</span>
              <hr className="line" />
            </div>
            <div className="bottomSection">
              <p className="poppins-regular">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    navigate("/SignIn");
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
      </div>
    </>
  );
}
export default ForgotPassword;
