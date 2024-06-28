import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  transaction_no: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  transaction_type: { type: String, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
