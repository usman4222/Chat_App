import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Auth.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/apiClient.js"
import Spinner from "../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom"
import { appStore } from "../../store/index.jsx";

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUserInfo } = appStore()

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const signinHandler = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      toast.error("All fields are required");
      return
    }

    try {
      setLoading(true);
      const res = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });

      toast.success("Login successful!");
      console.log(res.data);
      setEmail("")
      setPassword("")
      if (res.data.user.id) {
        setUserInfo(res.data.user)
        if (res.data.user.profileSetup) {
          navigate("/chat")
        }
        else {
          navigate('/profile')
        }
      }
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data);
        toast.error(error.response.data);

      } else if (error.request) {
        console.log("Network Error:", error.request);
        toast.error("Network error. Please check your connection and try again.");

      } else {
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    finally {
      setLoading(false);
    }
  }

  const signupHandler = async (event) => {
    event.preventDefault();

    if (email === "" || password === "" || confirmPassword === "") {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });

      toast.success("Signup successful!");
      console.log(res.data);
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      if (res.status === 201) {
        setUserInfo(res.data.user)
        navigate("/profile")
      }
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data);
        toast.error(error.response.data);

      } else if (error.request) {
        console.log("Network Error:", error.request);
        toast.error("Network error. Please check your connection and try again.");

      } else {
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };


  return (
    <div className="con">
      <ToastContainer />
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={signinHandler} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user flex items-center">
                  <MdEmail />
                </i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock flex items-center">
                  <FaLock />
                </i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading} className="btn solid">
                {loading ? <Spinner /> : "Login"}
              </button>
            </form>
            <form onSubmit={signupHandler} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-envlope flex items-center">
                  <MdEmail />
                </i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>
              <div className="input-field">
                <i className="fas fa-lock flex items-center">
                  <FaLock />
                </i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock flex items-center">
                  <FaLock />
                </i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? <Spinner /> : "Sign up"}
              </button>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome Back to Our Chat App!</h3>
              <p>
                Welcome back! Sign in to your account to continue your
                conversations and stay connected with your contacts.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </div>
            <img
              src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
              className="image"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3> Welcome to Our Chat App!</h3>
              <p>
                Join our vibrant community of users and start connecting with
                friends, family, and colleagues in real-time.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
            </div>
            <img
              src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
