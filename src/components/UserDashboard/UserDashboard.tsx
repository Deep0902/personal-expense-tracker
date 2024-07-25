import { useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import Footer from "../Footer/Footer";


function UserDashboard() {
  const navigate = useNavigate();
  const token = "my_secure_token";

  useEffect(() => {
    const email =
      sessionStorage.getItem("user_email") ||
      localStorage.getItem("user_email");
    const pass =
      sessionStorage.getItem("user_pass") || localStorage.getItem("user_pass");

    if (!email || !pass) {
      navigate("/SignIn");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/user",
          {
            user_email: email,
            user_pass: pass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const isValidUser = res.data.valid;

        if (!isValidUser) {
          navigate("/SignIn");
        } else {
        }
      } catch (err) {
        console.log(err);
        navigate("/SignIn");
      }
    };

    verifyUser();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_pass");
    navigate("/SignIn");
  };

  return (
    <>
      <TopNavbarSignedOut />
      <br />
      <div className="mainContainer">
        <h2>Hello {sessionStorage.user_email}</h2>
        <button onClick={handleLogout} className="">
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
