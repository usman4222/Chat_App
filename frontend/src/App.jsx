import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthPage />
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChatPage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/load"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Spinner />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; Spinner
