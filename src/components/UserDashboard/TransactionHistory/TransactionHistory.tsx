import axios from "axios"; // Import axios for API calls
import { useEffect, useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "./TransactionHistory.css";
import filter from "/images/filter.svg";
import moreIcon from "/images/more-dots.svg";
import { downloadCSV } from "../../utils/csvUtils";
import csvExport from "/images/csv-export.svg";
import PopupWarning from "../../PopupWarning/PopupWarning";
import PopupConfirmation from "../../PopupConfirmation/PopupConfirmation";

interface HistoryDetailsProps {
  userExpenses: Expense[];
  onNewTransaction: (arg: string) => void;
  onEditTransaction: (transaction: Expense) => void;
  userData: any;
  initialSearchQuery: string;
  selectedCategory: string | null; // Add this prop
}

function TransactionHistory({
  userExpenses,
  onNewTransaction,
  onEditTransaction,
  selectedCategory,
  userData,
  initialSearchQuery = "", // New prop with default empty string
}: HistoryDetailsProps) {
  //State to manage filter overlay
  const [dateFilter, setDateFilter] = useState(false);

  // State management
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  function toggleDateFilter(applyFilter = false) {
    if (applyFilter && fromDate && toDate) {
      const filteredExpenses = userExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= new Date(fromDate) && expenseDate <= new Date(toDate)
        );
      });
      setExpenses(filteredExpenses);
    } else {
      setFromDate(null);
      setToDate(null);
      setExpenses(userExpenses);
    }
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
      const transaction = expenses.find(
        (expense) => expense.transaction_no === transaction_no
      );

      if (!transaction) {
        setIsAlertSuccess(false);
        setAlertMessage("Transaction not found.");
        toggleAlertPopup();
        return;
      }

      const updatedWallet =
        transaction.transaction_type === "debit"
          ? userData.wallet + transaction.amount
          : userData.wallet - transaction.amount;

      const deleteTransactionPromise = axios.delete(
        `http://127.0.0.1:5000/api/expenses/${userExpenses[0].user_id}/${transaction_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      const [deleteTransactionResponse, updateUserResponse] = await Promise.all(
        [deleteTransactionPromise, updateUserPromise]
      );

      if (
        deleteTransactionResponse.status === 200 &&
        updateUserResponse.status === 200
      ) {
        setExpenses(
          expenses.filter(
            (expense) => expense.transaction_no !== transaction_no
          )
        );
        setIsAlertSuccess(true);
        setAlertMessage("Transaction deleted and wallet updated successfully.");
        toggleAlertPopup();
      } else {
        setIsAlertSuccess(false);
        setAlertMessage("Failed to delete transaction or update wallet.");
        toggleAlertPopup();
      }
    } catch (err) {
      setIsAlertSuccess(false);
      setAlertMessage(
        "Error occurred while deleting expense or updating wallet."
      );
      toggleAlertPopup();
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
      expense.category.toLowerCase().includes(searchQuery) ||
      expense.amount.toString().toLocaleLowerCase().includes(searchQuery)
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
    Subscriptions: "💳",
    Fruits: "🍍",
    Vegetables: "🥕",
    Medicines: "💊",
    Medicals: "💊",
    Rent: "🏠",
    Utilities: "💡",
    Transportation: "🚌",
    Dining: "🍽️",
    Shopping: "🛍️",
    Education: "📚",
    Travel: "✈️",
    Health: "🏥",
    Savings: "💰",
    Insurance: "📄",
    Gifts: "🎁",
    Charity: "❤️",
    Pets: "🐾",
    "Personal care": "💅",
    Clothing: "👔",
    Electronics: "📱",
    "Home Maintenance": "🔧",
    Fitness: "🏋️",
    Snacks: "🍫",
    Coffee: "☕",
    Hobbies: "🎨",
    Investments: "📈",
    Loans: "💸",
    Taxes: "🧾",
    Internet: "🌐",
    Cleaning: "🧹",
    "Work Expenses": "💼",
    Childcare: "🍼",
    "Vehicle Maintenance": "🚗",
    Gardening: "🌱",
    Cosmetics: "💄",
    Furniture: "🛋️",
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
    const filteredExpenses = userExpenses.filter((expense) => {
      const matchesSearchQuery =
        expense.title.toLowerCase().includes(searchQuery) ||
        expense.category.toLowerCase().includes(searchQuery);

      if (fromDate && toDate) {
        const expenseDate = new Date(expense.date);
        const matchesDateFilter =
          expenseDate >= new Date(fromDate) && expenseDate <= new Date(toDate);
        return matchesSearchQuery && matchesDateFilter;
      }

      return matchesSearchQuery;
    });
    setExpenses(filteredExpenses);
  }, [searchQuery, fromDate, toDate, userExpenses]);

  // Trigger CSV download
  const handleDownloadCSV = () => {
    const data = sortedTransactions.map((transaction) => ({
      Date: new Date(transaction.date),
      Title: transaction.title,
      Category: transaction.category,
      Amount: transaction.amount,
      Type: transaction.transaction_type,
    }));

    downloadCSV(data, `${userData.user_name}'s Expenses`);
  };
  //Logic for Alert
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");

  //Logic for confirmation Alert
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationTransactionNo, setConfirmationTransactionNo] = useState<
    string | null
  >(null);
  const handleConfirmShowConfirmationPopup = (transaction_no: string) => {
    setConfirmationTransactionNo(transaction_no);
    setShowConfirmationPopup(true);
  };

  const handleConfirmation = async (confirmation: boolean) => {
    if (confirmation && confirmationTransactionNo) {
      await deleteExpense(confirmationTransactionNo);
    }
    setShowConfirmationPopup(false);
    setConfirmationTransactionNo(null); // Clear the transaction number after handling confirmation
  };
  useEffect(() => {
    if (selectedCategory) {
      setSearchQuery(selectedCategory.toLowerCase());
    }
  }, [selectedCategory]);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isPopVisible, showConfirmationPopup, dateFilter]);
  return (
    <>
      {isPopVisible && (
        <PopupWarning
          message={alertMessage}
          onButtonClickded={toggleAlertPopup}
          successAlert={isAlertSuccess}
        />
      )}
      {showConfirmationPopup && (
        <PopupConfirmation
          message="Are you sure you want to delete this transaction?"
          onButtonClicked={handleConfirmation}
        />
      )}
      {dateFilter && (
        <div className="overlayBackground">
          <div className="poppins-bold">
            <div className="overlayBox">
              <label className="">Custom Date Filter</label>
              <br />
              <span className="poppins-regular">From Date</span>
              <input
                type="date"
                value={fromDate || ""}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <span className="poppins-regular">To Date</span>
              <input
                type="date"
                value={toDate || ""}
                onChange={(e) => setToDate(e.target.value)}
              />
              <button
                className="poppins-semibold add-button"
                onClick={() => toggleDateFilter(true)}
              >
                Apply
              </button>
              <button
                className="poppins-semibold cancel-button"
                onClick={() => toggleDateFilter(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="TransactionHistory">
        <div className="Historytitle">
          <h3>Transaction History</h3>
          <div className="mobileView">
            <button
              className="poppins-medium csvButton"
              onClick={handleDownloadCSV}
            >
              <img src={csvExport} alt="" />
              Export CSV
            </button>
          </div>

          <div className="webView searchItems">
            <input
              className="poppins-regular"
              type="text"
              placeholder="Search Transaction/Category"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img
              src={filter}
              alt=""
              onClick={() => setDateFilter(!dateFilter)}
            />
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
          <img src={filter} alt="" onClick={() => setDateFilter(!dateFilter)} />
          <button
            className="poppins-medium mobileViewAddTransaction"
            onClick={() => onNewTransaction("debit")}
          >
            Add Transaction
          </button>
        </div>
        <div className="buttons-alignment">
          <button
            className="poppins-medium webView"
            onClick={() => onNewTransaction("debit")}
          >
            Add Transaction
          </button>
          <button
            className="poppins-medium csvButton webView"
            onClick={handleDownloadCSV}
          >
            <img src={csvExport} alt="" />
            Export CSV
          </button>
        </div>
        <br />
        <div className="TransactionHistory">{/* Rest of your JSX */}</div>
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
                            onClick={() =>
                              handleConfirmShowConfirmationPopup(
                                transaction.transaction_no
                              )
                            }
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
