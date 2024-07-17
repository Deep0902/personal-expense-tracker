import "./App.css";
import AddBasicAPI from "./components/AddBasicAPI";
import BasicAPI from "./components/BasicAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import DummyData from "./components/DummyData";
import LandingPage from "./components/LandingPage/LandingPage";
import DeviceDimensions from "./components/DeviceDimensions";

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
        <Route path="/DummyData" element={<DummyData />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/DeviceDimentions" element={<DeviceDimensions />} />
      </Routes>
    </Router>
  );
}

export default App;
