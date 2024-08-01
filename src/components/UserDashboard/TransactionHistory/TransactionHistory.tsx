import { useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "./TransactionHistory.css";
import filter from "/images/filter.svg";
import moreIcon from "/images/more-dots.svg";

interface HistoryDetailsProps {
  userExpenses: Expense[];
}

function TransactionHistory({ userExpenses }: HistoryDetailsProps) {
  // Dropdown Logic
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setDropdownVisible(true);
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setDropdownVisible(false);
    }
  };
  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  // Filter transactions based on search query
  const filteredTransactions = userExpenses.filter((expense) =>
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
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleClick}
                    >
                      <img
                        className="moreIcon"
                        src={moreIcon}
                        alt="more options"
                      />
                      {isDropdownVisible && (
                        <div className="historyDropdown">
                          <p>Delete</p>
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
