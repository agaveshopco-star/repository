import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

const pages = (
  <>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="onboarding" element={<Onboarding />} />
    <Route path="dashboard" element={<Dashboard />} />
  </>
);
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/">{pages}</Route>
        <Route path="/es">{pages}</Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
