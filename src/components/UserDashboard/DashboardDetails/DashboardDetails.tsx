import { Expense } from "../../../interfaces/Expense";
import "./DashboardDetails.css";
import addTransaction from "/images/add-transaction.svg";
import transactionHistory from "/images/transaction-history-dashboard.svg";
import expand from "/images/expand.svg";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardDetailsProps {
  userExpenses: Expense[];
  wallet: number;
  username: any;
  onHistoryClick: (tab: string, category: string) => void; // Updated
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
    Subscriptions: "💳",
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

  //Handle Expand click
  const handleHistoryClick = (category: string) => {
    onHistoryClick("History", category);
  };
  // Data for the Pie chart
  const data = {
    labels: Object.keys(categoryTotals).map(toSentenceCase), // Category names
    datasets: [
      {
        data: Object.values(categoryTotals), // Amounts spent in each category
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
        ], // Add more colors if there are more categories
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 5,
        borderColor: "#eaf9f6",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 20,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce((acc: any, value: any) => acc + value, 0);
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return ` ₹ ${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };
  
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 16,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce((acc: any, value: any) => acc + value, 0);
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return ` ₹ ${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

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
            <div
              className="customLeftBorder"
              onClick={() => onHistoryClick("History", "")}
            >
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
              <div
                key={category}
                className="cards"
                onClick={() => handleHistoryClick(category)}
              >
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
      <br />
      <div className="dashboardDetails">
        <div className="breakdown">
          <span className="poppins-semibold">Visualize your breakdown</span><br />

        </div>
        {/* Add the Pie Chart here */}
        <br />
        <div className="pieChartContainer webView2">
          <span className="poppins-semibold">Click on categories to show/hide them</span>
          <Doughnut data={data} options={options} />
        </div>
        <div className="pieChartContainer mobileView2">
          <span className="poppins-semibold">Click on categories to show/hide them</span>
          <br />
          <br />
          <Doughnut data={data} options={options2} />
        </div>

        <br />
      </div>
    </>
  );
}

export default DashboardDetails;
