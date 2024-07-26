import { Expense } from "../../../interfaces/Expense";
import "./DashboardDetails.css";
interface DashboardDetailsProps {
  userExpenses: Expense[];
}
function DashboardDetails({ userExpenses }: DashboardDetailsProps) {
  return (
    <>
      <h3>This is Dashboard Details</h3>
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
    </>
  );
}

export default DashboardDetails;
