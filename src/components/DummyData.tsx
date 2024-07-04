import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyAdmins, dummyUsers, dummyExpenses } from "../dummyData"; // Import the dummy data
import "../styles/table.css";
import { Expense } from "../interfaces/Expense";
import { Admin } from "../interfaces/Admin";
import { Users } from "../interfaces/Users";

export default function DummyData() {
  const navigate = useNavigate();
  const [expense_data, setExpenseData] = useState<Expense[]>([]);
  const [admin_data, setAdminData] = useState<Admin[]>([]);
  const [users_data, setUserData] = useState<Users[]>([]);

  useEffect(() => {
    // Set the dummy data instead of fetching from API
    setExpenseData(dummyExpenses);
    setAdminData(dummyAdmins);
    setUserData(dummyUsers);
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
            {expense_data.map((expense, index) => (
              <tr key={index}>
                <td>{expense.user_id}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.transaction_type}</td>
                <td>{expense.transaction_no}</td>
              </tr>
            ))}
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
            {admin_data.map((admin, index) => (
              <tr key={index}>
                <td>{admin.admin_id}</td>
                <td>{admin.admin_pass}</td>
              </tr>
            ))}
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
            {users_data.map((user, index) => (
              <tr key={index}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.user_pass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
    </>
  );
}
