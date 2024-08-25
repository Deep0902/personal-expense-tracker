import { useEffect, useState } from "react";
import "./UserDashboard.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Users } from "../../interfaces/Users";
import TopNavbarProfile from "./TopNavbarProfile/TopNavbarProfile";
import Sidebar from "./Sidebar/Sidebar";
import { Expense } from "../../interfaces/Expense";
import DashboardDetails from "./DashboardDetails/DashboardDetails";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import NewTransacrion from "./NewTransacrion/NewTransacrion";
import EditTransaction from "./EditTransaction/EditTransaction";
import About from "./About/About";
import UserProfile from "./UserProfile/UserProfile";
import ScrollTop from "../ScrollTop/ScrollTop";
import PopupWarning from "../PopupWarning/PopupWarning";

function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const token = "my_secure_token"; // Token for authorization

  // State for user data, initially null
  const [user_data, setData_user] = useState<Users | null>(null);

  // State for expenses data, initially an empty array
  const [expense_data, setData] = useState<Expense[]>([]);

  //Handle search query
  const [searchQuery, setSearchQuery] = useState("");
  const [tabSelected, settabSelected] = useState("Dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleDataFromComponent = (tab: string, category?: string) => {
    settabSelected(tab);
    setSelectedCategory(category || null); // Set the category in state

    switch (tab) {
      case "Dashboard":
        navigate(
          "/personal-expense-tracker/UserDashboard/DashboardDetails"
        );
        break;
      case "History":
        navigate(
          "/personal-expense-tracker/UserDashboard/TransactionHistory"
        );
        break;
      case "About":
        navigate("/personal-expense-tracker/UserDashboard/About");
        break;
      case "Settings":
        navigate("/personal-expense-tracker/UserDashboard/UserProfile");
        break;
      default:
        navigate(
          "/personal-expense-tracker/UserDashboard/DashboardDetails"
        );
        break;
    }
  };

  //New Transaction
  const [newTransactionVisible, setNewTransactionVisible] = useState(false);
  const toggleNewTransaction = (transactionType?: string) => {
    setDefaultTransactionType(transactionType || null);
    setNewTransactionVisible(!newTransactionVisible);
  };
  const [defaultTransactionType, setDefaultTransactionType] = useState<
    string | null
  >(null);

  //Edit Transaction
  const [editingTransaction, setEditingTransaction] = useState<Expense | null>(
    null
  ); // New state to hold the selected transaction
  const [EditTransactionVisible, setEditTransactionVisible] = useState(false);
  const toggleEditTransaction = (transaction?: Expense) => {
    setEditTransactionVisible(!EditTransactionVisible);
    setEditingTransaction(transaction || null); // Set the selected transaction or null if toggling off
  };
  //Toggle useEffect
  const [toggleUseEffect, setToggleUseEffect] = useState(false);
  const changeToggleUseEffect = () => {
    setToggleUseEffect(!toggleUseEffect);
  };

  // Effect to verify user and fetch user data on component mount
  useEffect(() => {
    const email =
      sessionStorage.getItem("user_email") ||
      localStorage.getItem("user_email");
    const pass =
      sessionStorage.getItem("user_pass") || localStorage.getItem("user_pass");

    if (!email || !pass) {
      navigate("/personal-expense-tracker/SignIn"); // Redirect to SignIn if no email or password
      return;
    }

    // Function to verify user credentials
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/user",
          {
            user_email: email,
            user_pass: pass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        const isValidUser = res.data.valid;

        if (!isValidUser) {
          navigate("/personal-expense-tracker/SignIn"); // Redirect to SignIn if user is not valid
        }
      } catch (err) {
        console.log(err); // Log any errors
        navigate("/personal-expense-tracker/SignIn"); // Redirect to SignIn on error
      }
    };

    // Function to fetch user data by email
    const fetchUserData = async (email: string) => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/users/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setData_user(res.data); // Set user data state
      } catch (err) {
        console.log(err); // Log any errors
      }
    };

    verifyUser(); // Call function to verify user
    if (email) {
      fetchUserData(email); // Fetch user data if email exists
    }
  }, [
    navigate,
    tabSelected,
    newTransactionVisible,
    EditTransactionVisible,
    toggleUseEffect,
  ]); // Effect dependency on navigate

  //Effect to fetch expenses data when user_data is updated
  useEffect(() => {
    if (user_data) {
      // Function to fetch expenses data by user ID
      const fetchExpenses = async () => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:5000/api/expenses/${user_data.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in headers
              },
            }
          );
          setData(res.data); // Set expenses data state
        } catch (err) {
          alert(err); // Show alert on error
          console.log(err); // Log any errors
        }
      };

      fetchExpenses(); // Call function to fetch expenses
    }
  }, [user_data, token, newTransactionVisible, EditTransactionVisible]); // Effect dependency on user_data and token

  // Function to handle user logout
  const handleLogout = () => {
    sessionStorage.removeItem("user_email"); // Remove user email from session storage
    sessionStorage.removeItem("user_pass"); // Remove user password from session storage
    navigate("/personal-expense-tracker/SignIn"); // Redirect to SignIn
  };
  //If the user is blocked
  const isUserBlocked = user_data?.is_user_blocked;
  const blockedMessage =
    "This user has been blocked. Contact your admin to enable this user. You will be logged out now.";

  useEffect(() => {
    const path = location.pathname.split("/").pop();

    switch (path) {
      case "DashboardDetails":
        settabSelected("Dashboard");
        break;
      case "TransactionHistory":
        settabSelected("History");
        break;
      case "About":
        settabSelected("About");
        break;
      case "UserProfile":
        settabSelected("Settings");
        break;
      default:
        settabSelected("Dashboard");
        navigate("/personal-expense-tracker/UserDashboard/DashboardDetails");
        break;
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <ScrollTop />
      {isUserBlocked && (
        <PopupWarning
          message={blockedMessage}
          onButtonClickded={handleLogout}
        />
      )}
      <div className="pageSectionHorizontal">
        {newTransactionVisible && (
          <NewTransacrion
            onNewTransaction={toggleNewTransaction}
            userData={user_data}
            defaultTransactionType={defaultTransactionType || ""} // Pass the default transaction type
          />
        )}
        {EditTransactionVisible &&
          editingTransaction && ( // Ensure transaction data is passed
            <EditTransaction
              onEditTransaction={toggleEditTransaction}
              userData={user_data}
              transaction={editingTransaction} // Pass the selected transaction
            />
          )}

        <div className="pageSectionVertical">
          <Sidebar
            Username={user_data?.user_name}
            sendDataToParent={handleDataFromComponent}
            activeTab={tabSelected}
            resetSearchQuery={() => setSearchQuery("")}
          />
          <div className="mainContainer">
            <TopNavbarProfile
              onLogoutClick={handleLogout}
              onProfileClick={(tab) => handleDataFromComponent(tab)}
              profileIcon={user_data?.profile_img}
            />
            <div className="content">
              <br />
              <div className="mobileView">
                <br />
              </div>
              {tabSelected === "Dashboard" && (
                <DashboardDetails
                  userExpenses={expense_data}
                  wallet={user_data?.wallet ?? 0}
                  username={user_data?.user_name}
                  onNewTransaction={toggleNewTransaction}
                  onHistoryClick={handleDataFromComponent}
                />
              )}
              {tabSelected === "History" && (
                <TransactionHistory
                  userExpenses={expense_data}
                  onNewTransaction={toggleNewTransaction}
                  onEditTransaction={toggleEditTransaction}
                  userData={user_data}
                  initialSearchQuery={searchQuery} // Pass the search query
                  selectedCategory={selectedCategory} // Pass the selected category
                />
              )}
              {tabSelected === "About" && <About />}
              {tabSelected === "Settings" && (
                <UserProfile
                  userData={user_data}
                  toggleParentUseEffect={changeToggleUseEffect}
                />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default UserDashboard;
