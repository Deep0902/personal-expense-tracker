import axios from "axios"; // Import axios for API calls
import { useEffect, useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "./TransactionHistory.css";
import filter from "/images/filter.svg";
import moreIcon from "/images/more-dots.svg";

interface HistoryDetailsProps {
  userExpenses: Expense[];
  onNewTransaction: () => void;
  onEditTransaction: (transaction: Expense) => void;
  userData: any;
  initialSearchQuery: string;
}

function TransactionHistory({
  userExpenses,
  onNewTransaction,
  onEditTransaction,
  userData,
  initialSearchQuery = "", // New prop with default empty string
}: HistoryDetailsProps) {
  
  //State to manage filter overlay
  const [dateFilter, setDateFilter] = useState(false);
  function toggleDateFilter() {
    setDateFilter(!dateFilter);
  }

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
      // Find the transaction to be deleted to access its details
      const transaction = expenses.find(
        (expense) => expense.transaction_no === transaction_no
      );

      if (!transaction) {
        alert("Transaction not found.");
        return;
      }

      // Alert the user with the transaction details before deletion
      const confirmDelete = window.confirm(
        `Are you sure you want to delete this transaction?\n\n` +
          `Title: ${transaction.title}\n` +
          `Date: ${new Date(transaction.date).toLocaleDateString()}\n` +
          `Amount: ₹${transaction.amount.toLocaleString()}\n` +
          `Category: ${transaction.category}\n` +
          `Type: ${transaction.transaction_type}`
      );

      if (!confirmDelete) {
        return; // If user cancels, do not proceed with deletion
      }

      // Calculate the new wallet balance based on the transaction type
      const updatedWallet =
        transaction.transaction_type === "debit"
          ? userData.wallet + transaction.amount
          : userData.wallet - transaction.amount;

      // Make the DELETE request to remove the transaction
      const deleteTransactionPromise = axios.delete(
        `http://127.0.0.1:5000/api/expenses/${userExpenses[0].user_id}/${transaction_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Make the PUT request to update the user's wallet
      const updateUserPromise = axios.put(
        `http://127.0.0.1:5000/api/users/${userExpenses[0].user_id}`,
        {
          wallet: updatedWallet,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Wait for both API calls to complete
      const [deleteTransactionResponse, updateUserResponse] = await Promise.all(
        [deleteTransactionPromise, updateUserPromise]
      );

      // If both requests succeed, update the UI
      if (
        deleteTransactionResponse.status === 200 &&
        updateUserResponse.status === 200
      ) {
        setExpenses(
          expenses.filter(
            (expense) => expense.transaction_no !== transaction_no
          )
        );
        alert("Transaction deleted and wallet updated successfully.");
      } else {
        alert("Failed to delete transaction or update wallet.");
      }
    } catch (err) {
      alert("Error occurred while deleting expense or updating wallet.");
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
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredTransactions = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchQuery) ||
      expense.category.toLowerCase().includes(searchQuery)
  );

  // Sort transactions by date in descending order
  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Helper function to convert string to sentence case
  const toSentenceCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const categoryEmojis: { [key: string]: string } = {
    Entertainment: "🍿",
    Fuel: "⛽",
    Groceries: "🛒",
    Subscription: "💳",
  };

  // Group transactions by date
  const groupTransactionsByDate = (transactions: Expense[]) => {
    return transactions.reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);
  };
  const groupedTransactions = groupTransactionsByDate(sortedTransactions);
  useEffect(() => {
    setExpenses(userExpenses.filter(
      (expense) =>
        expense.title.toLowerCase().includes(searchQuery) ||
        expense.category.toLowerCase().includes(searchQuery)
    ));
  }, [searchQuery, userExpenses]);
  
  return (
    <>
      <div className="TransactionHistory">
        {dateFilter && (
          <div className="overlayBackground">
            <div className="poppins-bold">
              <div className="overlayBox">
                <label className="">Custom Date Filter</label>
                <br />
                <span className="poppins-regular">From Date</span>
                <input type="date" />
                <span className="poppins-regular">To Date</span>
                <input type="date" />
                <button
                  className="poppins-semibold add-button"
                  onClick={toggleDateFilter}
                >
                  Apply
                </button>
                <button
                  className="poppins-semibold cancel-button"
                  onClick={toggleDateFilter}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="Historytitle">
          <h3>Transaction History</h3>
          <button
            className="mobileView poppins-medium"
            onClick={onNewTransaction}
          >
            Add Transaction
          </button>
          <div className="webView searchItems">
            <input
              className="poppins-regular"
              type="text"
              placeholder="Search Transaction/Category"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img src={filter} alt="" onClick={toggleDateFilter} />
          </div>
        </div>
        <br />
        <div className="mobileView searchItems">
          <input
            className="poppins-regular"
            type="text"
            placeholder="Search Transaction/Category"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img src={filter} alt="" onClick={toggleDateFilter} />
        </div>
        <button className="poppins-medium webView" onClick={onNewTransaction}>
          Add Transaction
        </button>
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
                        {toSentenceCase(transaction.title)} (
                        {toSentenceCase(transaction.category)})
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
                            }}
                          >
                            Delete
                          </p>

                          <p
                            onClick={() => {
                              onEditTransaction(transaction); // Pass transaction to onEditTransaction
                            }}
                          >
                            Edit
                          </p>
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
