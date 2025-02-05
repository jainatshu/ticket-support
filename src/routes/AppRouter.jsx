import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TicketForm from "../pages/TicketForm";
import ViewTicket from "../pages/ViewTicket"; // Import ViewTicket component
import EditTicket from "../pages/EditTicket"; // Import EditTicket component
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Sidebar />
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
        <Route
          path="/ticket-form"
          element={
            <ProtectedRoute>
              <TicketForm />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/view-ticket/:ticketId"
          element={
            <ProtectedRoute>
              <ViewTicket />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/edit-ticket/:ticketId"
          element={
            <ProtectedRoute>
              <EditTicket />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
