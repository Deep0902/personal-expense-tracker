import axios from "axios"; // Import axios for API calls
import { useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "./TransactionHistory.css";
import filter from "/images/filter.svg";
import moreIcon from "/images/more-dots.svg";

interface HistoryDetailsProps {
  userExpenses: Expense[];
  onDelete: (transaction_no: string) => void;
}

function TransactionHistory({ userExpenses, onDelete }: HistoryDetailsProps) {
  // State to manage expenses
  const [expenses, setExpenses] = useState<Expense[]>(userExpenses);

  // State for managing which dropdown is visible
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<
    number | null
  >(null);

  // Delete Expense Function
  const token = "my_secure_token"; // Token for authorization
  const deleteExpense = async (transaction_no: string) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:5000/api/expenses/${userExpenses[0].user_id}/${transaction_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setExpenses(
          expenses.filter(
            (expense) => expense.transaction_no !== transaction_no
          )
        );
      } else {
        alert("Failed to delete expense");
      }
    } catch (err) {
      alert("Error occurred while deleting expense");
      console.error(err);
    }
  };

  // Dropdown Logic
  const handleMouseEnter = (index: number) => {
    if (window.innerWidth > 768) {
      setVisibleDropdownIndex(index);
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setVisibleDropdownIndex(null);
    }
  };
  const handleClick = (index: number) => {
    if (window.innerWidth <= 768) {
      setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
    }
  };

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredTransactions = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery)
  );

  const categoryEmojis: { [key: string]: string } = {
    Entertainment: "🍿",
    Fuel: "⛽",
    Groceries: "🛒",
    Subscription: "💳",
  };

  const groupTransactionsByDate = (userExpenses: Expense[]) => {
    return userExpenses.reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);
  };
  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <>
      <div className="TransactionHistory">
        <div className="Historytitle">
          <h3>Transaction History</h3>
          <div className="searchItems">
            <input
              className="poppins-regular"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img src={filter} alt="" />
          </div>
        </div>
        <br />
        <button className="poppins-medium">Add Transaction</button>
        <br />
        <br />

        <div className="historyList">
          {Object.keys(groupedTransactions).length === 0 ? (
            <div className="noExpensesMessage">
              <span className="poppins-bold">No expenses found! ☹️</span>
            </div>
          ) : (
            Object.keys(groupedTransactions).map((dates) => (
              <div key={dates}>
                <span className="date poppins-semibold">
                  {new Date(dates).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {groupedTransactions[dates].map((transaction, index) => (
                  <div key={index} className="transactionCard">
                    <div
                      className={
                        transaction.transaction_type === "debit"
                          ? "red-emoji categoryEmoji"
                          : "green-emoji categoryEmoji"
                      }
                    >
                      {categoryEmojis[transaction.category] || "📝"}
                    </div>
                    <div className="categoryInfo">
                      <span className="poppins-bold">
                        {transaction.title} ({transaction.category})
                      </span>
                      <br />
                      <label
                        className={
                          transaction.transaction_type === "debit"
                            ? "moneyDebit inter-semibold"
                            : " moneyCredit inter-semibold"
                        }
                      >
                        ₹ {transaction.amount.toLocaleString()}
                      </label>
                    </div>
                    <div
                      className="moreIconContainer"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        className="moreIcon"
                        src={moreIcon}
                        alt="more options"
                      />
                      {visibleDropdownIndex === index && (
                        <div className="historyDropdown">
                          <p
                            onClick={() => {
                              deleteExpense(transaction.transaction_no);
                              onDelete(transaction.transaction_no); // Call the passed function
                            }}
                          >
                            Delete
                          </p>

                          <p>Edit</p>
                        </div>
                      )}
                    </div>

                    <br />
                    <br />
                  </div>
                ))}
                <br />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
