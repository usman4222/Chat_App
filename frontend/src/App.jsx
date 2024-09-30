import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { appStore } from "./store";
import { apiClient } from "./lib/apiClient";
import { USERINFO_ROUTE } from "./utils/constants";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const [loading, setloading] = useState(true);
  const { userInfo, setUserInfo } = appStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get(USERINFO_ROUTE, {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setloading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
              <ChatPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
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

export default App;
Spinner;
