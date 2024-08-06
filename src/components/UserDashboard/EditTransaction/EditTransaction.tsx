import { useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "../NewTransacrion/NewTransacrion.css";

interface EditTransactionProps {
  onEditTransaction: () => void;
  transaction: Expense;
}

function EditTransaction({
  onEditTransaction,
  transaction,
}: EditTransactionProps) {
  // State to manage the form inputs
  const [formState, setFormState] = useState<Expense>({
    ...transaction, // Initialize with the transaction data passed as a prop
  });

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call an API or perform actions with the updated formState
    console.log("Updated Transaction:", formState);
    onEditTransaction(); // Close the edit form after submission
  };

  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="overlayContent">
            <div className="popupBox">
              <span className="poppins-bold">Edit Transaction</span>
              <label className="poppins-regular">
                Enter updated Transaction details
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
                  />
                </div>

                <div className="form-group">
                  <select
                    name="transaction_type"
                    className="poppins-regular"
                    value={formState.transaction_type}
                    onChange={handleInputChange}
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
