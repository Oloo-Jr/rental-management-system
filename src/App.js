import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use React Router
import ProtectedRoute from "./Components/ProtectedRoute";
// import Loading from "./components/Loading"; // Replace with your actual loading component

const Login = lazy(() => import("./Screen/Login"));
const Dashboard = lazy(() => import("./Screen/Dashboard"));

export default function App() {
  return (
    <Router>
      <Suspense >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
