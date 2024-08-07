import { useState } from "react";
import axios from "axios";
import { Expense } from "../../../interfaces/Expense";
import "../NewTransacrion/NewTransacrion.css";

interface EditTransactionProps {
  onEditTransaction: () => void;
  transaction: Expense;
  userData: any;
}

function EditTransaction({
  onEditTransaction,
  transaction,
  userData,
}: EditTransactionProps) {
  // State to manage the form inputs
  const [formState, setFormState] = useState<Expense>({
    ...transaction, // Initialize with the transaction data passed as a prop
  });

  const token = "my_secure_token"; // Replace with actual token if available

  // Handler for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to display alerts
  function alertDisplay(message: string) {
    alert(message);
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validations
    let hasError = false;

    if (!formState.title) {
      alertDisplay("Title is required.");
      hasError = true;
    }

    const currentDate = new Date();
    const enteredDate = new Date(formState.date);
    if (!formState.date) {
      alertDisplay("Date is required.");
      hasError = true;
    } else if (enteredDate > currentDate) {
      alertDisplay("Date cannot be in the future.");
      hasError = true;
    }

    if (!formState.amount || Number(formState.amount) <= 0) {
      alertDisplay("Amount must be a positive number.");
      hasError = true;
    }

    if (!formState.category) {
      alertDisplay("Category is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      // Determine wallet adjustment based on the change in transaction type or amount
      let walletAdjustment = 0;
      if (
        formState.transaction_type === "debit" &&
        transaction.transaction_type === "debit"
      ) {
        walletAdjustment =
          Number(transaction.amount) - Number(formState.amount);
      } else if (
        formState.transaction_type === "credit" &&
        transaction.transaction_type === "credit"
      ) {
        walletAdjustment =
          Number(formState.amount) - Number(transaction.amount);
      } else if (
        formState.transaction_type === "debit" &&
        transaction.transaction_type === "credit"
      ) {
        walletAdjustment = -(
          Number(formState.amount) + Number(transaction.amount)
        );
      } else if (
        formState.transaction_type === "credit" &&
        transaction.transaction_type === "debit"
      ) {
        walletAdjustment =
          Number(formState.amount) + Number(transaction.amount);
      }

      const newWallet = userData.wallet + walletAdjustment;
      // Check if the new wallet balance will be negative
      if (newWallet < 0) {
        alertDisplay("Amount is exceeding the wallet");
        return;
      }
      // Call the API to update the transaction
      await axios.put(
        `http://127.0.0.1:5000/api/expenses/${userData.user_id}/${transaction.transaction_no}`,
        {
          title: formState.title,
          date: formState.date,
          amount: Number(formState.amount),
          category: formState.category,
          transaction_type: formState.transaction_type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        alert("Transaction updated successfully and wallet updated!");
        onEditTransaction(); // Close the edit form after submission
      } else {
        alert("Transaction updated, but failed to update wallet.");
      }
    } catch (error) {
      console.error("Error updating transaction or wallet", error);
      alert("An error occurred while processing your transaction.");
    }
  };

  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="overlayContent">
            <div className="popupBox">
              <span className="poppins-bold">Edit Transaction</span>
              <label className="poppins-regular">
                Enter updated Transaction details {userData.user_id}
              </label>
              <br />
              <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleInputChange}
                    placeholder="Date"
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formState.amount}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="transaction_type"
                    className="poppins-regular"
                    value={formState.transaction_type}
                    onChange={handleInputChange}
                    required
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
                  Update
                </button>
              </form>
              <button
                className="poppins-semibold cancel-button"
                onClick={onEditTransaction}
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

export default EditTransaction;
