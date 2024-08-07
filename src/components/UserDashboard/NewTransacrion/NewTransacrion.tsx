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
  const [amount, setAmount] = useState<string | number>("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("debit");
  const token = "my_secure_token"; // Token for authorization

  function alertDisplay(message: string) {
    alert(message);
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform validations
    let hasError = false;

    if (!title) {
      alertDisplay("Title is required.");
      hasError = true;
    }

    const currentDate = new Date();
    const enteredDate = new Date(date);
    if (!date) {
      alertDisplay("Date is required.");
      hasError = true;
    } else if (enteredDate > currentDate) {
      alertDisplay("Date cannot be in the future.");
      hasError = true;
    }

    if (!amount || Number(amount) <= 0) {
      alertDisplay("Amount must be a positive number.");
      hasError = true;
    } else if (
      transactionType === "debit" &&
      Number(amount) > userData.wallet
    ) {
      alertDisplay(
        `Amount cannot exceed wallet balance of ${userData.wallet}.`
      );
      hasError = true;
    }

    if (!category) {
      alertDisplay("Category is required.");
      hasError = true;
    }

    if (hasError) {
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
              <span className="poppins-bold">New Transaction</span>
              <label className="poppins-regular">
                Enter Transaction details
              </label>
              <br />
              <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group ">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="poppins-regular"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    value={date}
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    className="poppins-regular"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="poppins-regular"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="poppins-regular"
                  />
                </div>

                <div className="form-group">
                  <select
                    className="poppins-regular"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <option className="poppins-regular" value="credit">
                      Credit
                    </option>
                    <option className="poppins-regular" value="debit">
                      Debit
                    </option>
                  </select>
                </div>

                <button type="submit" className="poppins-semibold add-button">
                  Add
                </button>
              </form>
              <button
                className="poppins-semibold cancel-button"
                onClick={onNewTransaction}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewTransaction;
