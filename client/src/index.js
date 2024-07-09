import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";    
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import TaskManagerSignIn from "./pages/SignIn";
import TaskManagerSignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      afterSignOutUrl="/"
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-in/*"
          element={<TaskManagerSignIn />}
        />
        <Route
          path="/sign-up/*"
          element={<TaskManagerSignUp />}
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <App />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
