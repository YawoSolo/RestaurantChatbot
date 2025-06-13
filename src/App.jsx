import React from "react";
import ChatForm from "./components/ChatForm";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderHistory from "./components/OrderHistory";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./components/firebase";
import LoginPage from "./components/LoginPage";
import MenuCarrousel from "./components/MenuCarrousel";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Container className="d-flex flex-column min-vh-100 min-vw-100">
        <Header />
        <MenuCarrousel className="mb-3 mt-3 align-items-center" />
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
