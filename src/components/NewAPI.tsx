import { useEffect, useState } from "react";
import axios from "axios";
interface Admin {
  _id: string;
  admin_id: string;
  admin_pass: string;
}

interface User {
  _id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_pass: string;
}

interface Expense {
  _id: string;
  user_id: string;
  transaction_no: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  transaction_type: string;
}
function NewAPI() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
      const fetchAdmins = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/admins");
          setAdmins(response.data);
        } catch (error) {
          console.error("Error fetching admins:", error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/users");
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      const fetchExpenses = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/expenses");
          setExpenses(response.data);
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };

      fetchAdmins();
      fetchUsers();
      fetchExpenses();
    }, []);

  return (
    <>
      <h2>API Display</h2>
      <br />

      <div>
        <h2>Admins</h2>
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>
              {admin.admin_id} - {admin.admin_pass}
            </li>
          ))}
        </ul>

        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.user_id} - {user.user_name} - {user.user_email}
            </li>
          ))}
        </ul>

        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.transaction_no} - {expense.title} - ${expense.amount} -{" "}
              {expense.category} - {expense.date} - {expense.transaction_type}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NewAPI;
