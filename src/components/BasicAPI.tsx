import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/table.css";
import { useNavigate } from "react-router-dom";
interface Expense {
  user_id: number;
  title: string;
  date: string;
  amount: number;
  transaction_no: number;
  transaction_type: string;
  category: string;
}

interface Admin {
  admin_id: string;
  admin_pass: string;
}

interface Users {
  user_id: number;
  user_email: string;
  user_name: string;
  user_pass: string;
}

function BasicAPI() {
  const navigate = useNavigate()
  const [expense_data, setData] = useState<Expense[]>([]);
  const token = "my_secure_token";
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  const [admin_data, setData_admin] = useState<Admin[]>([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData_admin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [users_data, setData_users] = useState<Users[]>([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData_users(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <div className="container">
        <h4>Expenses Collection</h4>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Transaction No</th>
            </tr>
          </thead>
          <tbody>
            {expense_data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.user_id}</td>
                  <td>{user.title}</td>
                  <td>{user.category}</td>
                  <td>{user.date}</td>
                  <td>{user.amount}</td>
                  <td>{user.transaction_no}</td>
                  <td>{user.transaction_type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <h4>Admin Collection</h4>
        <table>
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Admin Password</th>
            </tr>
          </thead>
          <tbody>
            {admin_data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.admin_id}</td>
                  <td>{user.admin_pass}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <h4>Users Collection</h4>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Password</th>
            </tr>
          </thead>
          <tbody>
            {users_data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_pass}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          navigate("personal-expense-tracker/AddExpense");
        }}
      >
        Go to add api
      </button>
    </>
  );
}

export default BasicAPI;
