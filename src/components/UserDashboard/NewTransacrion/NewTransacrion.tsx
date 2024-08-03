import { useState } from "react";
import axios from "axios";
import "./NewTransacrion.css";

interface NewTransactionProps {
  userData: any;
  onNewTransaction: () => void;
}

function NewTransaction({ userData, onNewTransaction }: NewTransactionProps) {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState<string | number>(""); // Change initial state to an empty string
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const token = "my_secure_token"; // Token for authorization

  // State for error messages
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    transactionType: "",
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    setErrors({
      title: "",
      date: "",
      amount: "",
      category: "",
      transactionType: "",
    });

    // Perform validations
    let hasError = false;
    const currentDate = new Date();
    const enteredDate = new Date(date);
    const newErrors = { ...errors };

    if (!title) {
      newErrors.title = "Title is required.";
      hasError = true;
    }

    if (!date) {
      newErrors.date = "Date is required.";
      hasError = true;
    } else if (enteredDate > currentDate) {
      newErrors.date = "Date cannot be in the future.";
      hasError = true;
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
      hasError = true;
    } else if (
      transactionType === "debit" &&
      Number(amount) > userData.wallet
    ) {
      newErrors.amount = `Amount cannot exceed wallet balance of ${userData.wallet}.`;
      hasError = true;
    }

    if (!category) {
      newErrors.category = "Category is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      // Call the API to add the new transaction
      await axios.post(
        "http://127.0.0.1:5000/api/expenses",
        {
          user_id: userData.user_id,
          title,
          date,
          amount: Number(amount),
          category,
          transaction_type: transactionType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Calculate the new wallet value
      const newWallet =
        transactionType === "debit"
          ? userData.wallet - Number(amount)
          : userData.wallet + Number(amount);

      // Update the user's wallet
      const updateUserResponse = await axios.put(
        `http://127.0.0.1:5000/api/users/${userData.user_id}`,
        {
          wallet: newWallet,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notify user based on the result of the wallet update
      if (updateUserResponse.status === 200) {
        alert("Transaction added successfully and wallet updated!");
        onNewTransaction(); // Refresh the transaction list
      } else {
        alert("Transaction added, but failed to update wallet.");
      }
    } catch (error) {
      console.error("Error adding transaction or updating wallet", error);
      alert("An error occurred while processing your transaction.");
    }
  };

  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="overlayContent">
            <div className="popupBox">
              <button onClick={onNewTransaction}>Close</button>
              <span className="poppins-bold">New Transaction</span>
              <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={errors.title ? "error" : ""}
                  />
                  {errors.title && (
                    <span className="error-message">{errors.title}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={errors.date ? "error" : ""}
                  />
                  {errors.date && (
                    <span className="error-message">{errors.date}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // Set the amount directly as a string
                    className={errors.amount ? "error" : ""}
                  />
                  {errors.amount && (
                    <span className="error-message">{errors.amount}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={errors.category ? "error" : ""}
                  />
                  {errors.category && (
                    <span className="error-message">{errors.category}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Transaction Type</label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewTransaction;
