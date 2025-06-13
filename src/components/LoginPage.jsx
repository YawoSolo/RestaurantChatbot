import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Card } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "./firebase";
import { useEffect } from "react";
import AnimatedLoginWelcome from "./AnimatedLoginWelcome";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <Card className="d-flex flex-column justify-content-center align-items-center p-5 mb-3">
      <Card.Title className="mb-5">
        <AnimatedLoginWelcome />
      </Card.Title>
      <GoogleButton onClick={signInWithGoogle} />
    </Card>
  );
}
