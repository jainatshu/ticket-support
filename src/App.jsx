import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import './App.css'

function App() {
  

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
