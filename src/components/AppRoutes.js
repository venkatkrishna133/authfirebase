import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bill from "../pages/Bill";
import Dashboard from "../Apages/Dashboard";
import RewardPoints from "../pages/RewardPoints";
import Transactions from "../pages/Transactions";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/bill" element={<Bill />}></Route>
      <Route path="/rewardpoints" element={<RewardPoints />}></Route>
      <Route path="/transactions" element={<Transactions />}></Route>
    </Routes>
  );
}
export default AppRoutes;
