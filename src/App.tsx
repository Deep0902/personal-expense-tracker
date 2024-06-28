import "./App.css";
import AddBasicAPI from "./components/AddBasicAPI";
import BasicAPI from "./components/BasicAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import NewAPI from "./components/NewAPI";

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
        <Route path="/BasicAPI" element={<BasicAPI />} />
        <Route path="/AddExpense" element={<AddBasicAPI />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/NewAPI" element={<NewAPI />} />
      </Routes>
    </Router>
  );
}

export default App;
