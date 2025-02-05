import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null; // Get user from localStorage
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser)); // Save user in localStorage
        setUser(currentUser);
      } else {
        localStorage.removeItem("user"); // Remove user from localStorage
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user"); // Remove from localStorage on logout
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
