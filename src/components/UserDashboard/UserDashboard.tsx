import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNavbarSignedOut from "../TopNavbarSignedOut/TopNavbarSignedOut";
import Footer from "../Footer/Footer";
import { Expense } from "../../interfaces/Expense";
import { Users } from "../../interfaces/Users";

function UserDashboard() {
  const navigate = useNavigate();
  const token = "my_secure_token";
  const currentEmail =
    sessionStorage.getItem("user_email") || localStorage.getItem("user_email");

  const [user_data, setData_user] = useState<Users | null>(null);
  const [expense_data, setData] = useState<Expense[]>([]);

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
        }
      } catch (err) {
        console.log(err);
        navigate("/SignIn");
      }
    };

    const fetchUserData = async (email: string) => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/users/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData_user(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    verifyUser();
    if (email) {
      fetchUserData(email);
    }
  }, [navigate]);

  useEffect(() => {
    if (user_data) {
      const fetchExpenses = async () => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:5000/api/expenses/${user_data.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(res.data);
        } catch (err) {
          alert(err);
          console.log(err);
        }
      };

      fetchExpenses();
    }
  }, [user_data, token]);

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
        <h2>Hello {currentEmail}</h2>
        <button onClick={handleLogout} className="">
          Logout
        </button>
        <h4>Expenses Collection</h4>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction No</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {expense_data.map((expense, index) => (
              <tr key={index}>
                <td>{expense.user_id}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.transaction_no}</td>
                <td>{expense.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
