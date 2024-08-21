import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();
  const [goToUserLogin, setGoToUserLogin] = React.useState(false);
  if (goToUserLogin) {
    return <Navigate to="/UserLogin" />;
  }
  // useEffect(() => {
  //   navigate("/LandingPage")
  // }, []);

  return (
    <>
      <div className="background-image">
        <h1>Homepage</h1>
        <div className="button-center">
          <button
            className="button-highlight poppins-medium"
            onClick={() => {
              navigate("/personal-expense-tracker/LandingPage");
            }}
          >
            Landing Page
          </button>
        </div>
        <br />
        <br />
        <button
          onClick={() => {
            setGoToUserLogin(true);
          }}
        >
          Go to User Login
        </button>
        <button
          onClick={() => {
            navigate("/personal-expense-tracker/AdminLogin");
          }}
        >
          Admin Login
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            navigate("/personal-expense-tracker/DummyData");
          }}
        >
          Dummy Data Display
        </button>
        <button
          onClick={() => {
            navigate("/personal-expense-tracker/DeviceDimentions");
          }}
        >
          Device Dimentions
        </button>

        <br />
      </div>
    </>
  );
}

export default HomePage;
