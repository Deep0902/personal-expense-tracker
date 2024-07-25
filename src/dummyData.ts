// src/dummyData.js
import { Expense } from "../src/interfaces/Expense";
import { Admin } from "../src/interfaces/Admin";
import { Users } from "../src/interfaces/Users";

export let dummyAdmins: Admin[] = [
  {
    admin_id: "admin1",
    admin_pass: "password1",
  },
  {
    admin_id: "admin2",
    admin_pass: "password2",
  },
];

export let dummyUsers: Users[] = [
  {
    user_id: 1,
    user_name: "John Doe",
    user_email: "john.doe@example.com",
    user_pass: "pass123",
    profile_img: 1,
    wallet: 0,
  },
  {
    user_id: 2,
    user_name: "Jane Smith",
    user_email: "jane.smith@example.com",
    user_pass: "pass456",
    profile_img: 1,
    wallet: 0,
  },
  {
    user_id: 3,
    user_name: "Sam Brown",
    user_email: "sam.brown@example.com",
    user_pass: "pass789",
    profile_img: 4,
    wallet: 0,
  },
];

export let dummyExpenses: Expense[] = [
  {
    user_id: 1,
    transaction_no: 1,
    title: "Groceries",
    amount: 50.25,
    category: "Food",
    date: "2023-01-15",
    transaction_type: "debit",
  },
  {
    user_id: 2,
    transaction_no: 1,
    title: "Electric Bill",
    amount: 75.0,
    category: "Utilities",
    date: "2023-01-20",
    transaction_type: "debit",
  },
  {
    user_id: 3,
    transaction_no: 1,
    title: "Salary",
    amount: 2000.0,
    category: "Income",
    date: "2023-01-25",
    transaction_type: "credit",
  },
];
