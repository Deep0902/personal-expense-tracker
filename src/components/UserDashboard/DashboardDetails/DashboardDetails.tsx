import { Expense } from "../../../interfaces/Expense";
import "./DashboardDetails.css";
import addTransaction from "/images/add-transaction.svg";
import transactionHistory from "/images/transaction-history-dashboard.svg";
import expand from "/images/expand.svg";
import { useState, useEffect } from "react";

interface DashboardDetailsProps {
  userExpenses: Expense[];
  wallet: number;
  username: any;
  onHistoryClick: () => void;
  onNewTransaction: () => void;
}

function DashboardDetails({
  userExpenses,
  wallet,
  username,
  onHistoryClick,
  onNewTransaction,
}: DashboardDetailsProps) {
  // Emojis for category
  const categoryEmojis: { [key: string]: string } = {
    Entertainment: "🍿",
    Fuel: "⛽",
    Groceries: "🛒",
    Subscription: "💳",
  };

  // Helper function to convert string to sentence case
  const toSentenceCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Segrate category wise amount based on current month
  const calculateMonthlyCategoryTotals = (
    expenses: Expense[]
  ): Record<string, number> => {
    const totals: Record<string, number> = {};
    const now = new Date();
    const currentMonth = now.getMonth(); // Current month (0-11)
    const currentYear = now.getFullYear(); // Current year

    expenses.forEach((expense: Expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expense.transaction_type === "debit" &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        const category = expense.category.toLowerCase(); // Normalize category to lowercase
        const amount = expense.amount;
        if (totals[category]) {
          // If the category already exists, add the amount to the total
          totals[category] += amount;
        } else {
          // If the category does not exist, create it and set the amount
          totals[category] = amount;
        }
      }
    });

    return totals;
  };

  const categoryTotals = calculateMonthlyCategoryTotals(userExpenses);

  // Calculate monthly expenses
  const calculateMonthlyExpenses = (expenses: Expense[]): number => {
    const now = new Date();
    const currentMonth = now.getMonth(); // Current month (0-11)
    const currentYear = now.getFullYear(); // Current year

    return expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expense.transaction_type === "debit" &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState<number>(0);

  useEffect(() => {
    const total = calculateMonthlyExpenses(userExpenses);
    setTotalMonthlyExpenses(total);
  }, [userExpenses]);

  return (
    <>
      <div className="dashboardDetails">
        <div className="displayUsername">
          <span className="poppins-bold">Hello, {username}!</span>
        </div>
        <div className="monthExpenses">
          <span className="poppins-semibold">This Month's Expenses: </span>
          <span className="inter-bold">
            ₹ {totalMonthlyExpenses.toLocaleString()}
          </span>
        </div>
        <br />
        <div className="overview">
          <div className="transactionActions">
            <div onClick={onNewTransaction}>
              <img src={addTransaction} alt="" />
              <span className="poppins-regular">Add a Transaction</span>
            </div>
            <div className="customLeftBorder" onClick={() => onHistoryClick()}>
              <img src={transactionHistory} alt="" />
              <span className="poppins-regular">Transaction History</span>
            </div>
          </div>
          <div className="wallet">
            <p className="poppins-bold">My Wallet 🪙</p>
            <p className="inter-extra-bold">₹ {wallet.toLocaleString()}</p>
          </div>
        </div>
        <br />
        <div className="breakdown">
          <span className="poppins-semibold">Category wise breakdown</span>
          <br />
          <label className="poppins-light">
            Where exactly is your money going?
          </label>
          <br />
          <br />
          <div className="categoryCards">
            {Object.keys(categoryTotals).map((category) => (
              <div key={category} className="cards">
                <div>
                  <span className="poppins-semibold">
                    {categoryEmojis[toSentenceCase(category)] || "📝"}{" "}
                    {toSentenceCase(category)}
                  </span>
                  <img className="expandIcon" src={expand} alt="expand" />
                </div>
                <label className="inter-extra-bold">
                  ₹ {categoryTotals[category].toLocaleString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardDetails;
