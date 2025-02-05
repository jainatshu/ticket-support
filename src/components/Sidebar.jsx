import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user || storedUser;
  const isAgent = currentUser?.email === "agent@support.com";

  if (!currentUser) return null;

  return (
    <div className="w-60 h-screen bg-gray-900 text-white fixed flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">Support System</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Dashboard
          </Link>
        </li>
        {!isAgent && (
          <li>
            <Link to="/ticket-form" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
              Submit Ticket
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              logout();
              localStorage.removeItem("user");
            }}
            className="w-full text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
