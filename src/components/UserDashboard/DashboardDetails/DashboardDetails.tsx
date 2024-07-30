import { Expense } from "../../../interfaces/Expense";
import "./DashboardDetails.css";
import addTransaction from "/images/add-transaction.svg";
import transactionHistory from "/images/transaction-history-dashboard.svg";
import expand from "/images/expand.svg";
interface DashboardDetailsProps {
  userExpenses: Expense[];
}
function DashboardDetails({ userExpenses }: DashboardDetailsProps) {
  
  return (
    <>
      <div className="dashboardDetails">
        <div className="monthExpenses">
          <span className="poppins-semibold">This Month's Expenses: </span>
          <span className="inter-bold">₹ 2,800</span>
        </div>
        <br />
        <div className="overview">
          <div className="transactionActions">
            <div>
              <img src={addTransaction} alt="" />
              <span className="poppins-regular">Add a Transaction</span>
            </div>
            <div className="customLeftBorder">
              <img src={transactionHistory} alt="" />
              <span className="poppins-regular">Transaction History</span>
            </div>
          </div>
          <div className="wallet">
            <p className="poppins-bold">My Wallet</p>
            <p className="inter-extra-bold">₹ 10,800</p>
          </div>
        </div>
        <br />
        <div className="breakdown">
          <span className="poppins-semibold">Category wise breakdown</span>
          <br />
          <label className="poppins-light">
            Where exactly is your money going?
          </label>
          <div className="categoryCards">
            <span className="poppins-medium">🍿 Entertainment</span>
            <img src={expand} alt="" />
            <label className="inter-extra-bold">₹ 800</label>
          </div>
        </div>
        <h4>Expenses Collection</h4>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction No</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {userExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.user_id}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.transaction_no}</td>
                <td>{expense.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardDetails;
