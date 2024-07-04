import "./App.css";
import AddBasicAPI from "./components/AddBasicAPI";
import BasicAPI from "./components/BasicAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import DummyData from "./components/DummyData";

function App() {
  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/AddExpense">Add Basic API</Link>
            </li>
            <li>
              <Link to="/BasicAPI">Basic API</Link>
            </li>
          </ul>
        </nav>
      </div> */}
      <Routes>
        <Route index path="/personal-expense-tracker" element={<HomePage />} />
        <Route path="/personal-expense-tracker/BasicAPI" element={<BasicAPI />} />
        <Route path="/personal-expense-tracker/AddExpense" element={<AddBasicAPI />} />
        <Route path="/personal-expense-tracker/UserLogin" element={<UserLogin />} />
        <Route path="/personal-expense-tracker/AdminLogin" element={<AdminLogin />} />
        <Route path="/personal-expense-tracker/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/personal-expense-tracker/DummyData" element={<DummyData />} />
      </Routes>
    </Router>
  );
}

export default App;
