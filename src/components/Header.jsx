import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOutUser } from "./firebase";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.info("You have been logged out.");
    } catch (error) {
      toast.error("Log out failed. Please try again.");
      console.error("Log out error:", error);
    }
  };
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/chat">
          RestaurantBOT
        </Navbar.Brand>
        {user && (
          <Navbar.Text className="me-auto p-2">
            Welcome {user.displayName || ""}
          </Navbar.Text>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-end">
            {user && (
              <Nav.Link
                className="border border-dark rounded-3 me-3"
                as={Link}
                to={location.pathname === "/history" ? "/chat" : "/history"}
              >
                {location.pathname === "/history" ? "Back" : "History"}
              </Nav.Link>
            )}
            {user && (
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}