import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Testimonials from "./components/Testimonials";
import Users from "./components/Users";
import Dashboard from "./components/DashBoard";
import CardsBackgroundImages from "./components/CardsBackground";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cards" element={<CardsBackgroundImages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
