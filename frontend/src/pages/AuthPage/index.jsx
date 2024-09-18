import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Auth.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SIGNUP_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/apiClient";

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
    toast("Wow so easy!")
  };

  const signinHandler = async () => {
    if (email == "" || password == "") {
      toast.error("All field are required")
    }
  }

  const signupHandler = async () => {
    if (email == "" || password == "" || confirmPassword == "") {
      toast.error("All field are required")
    }
    if (password != confirmPassword) {
      toast.error("Password do not matched.")
    }
    try {
      const res = await apiClient.post(SIGNUP_ROUTE, { email, password })
    } catch (error) {
      console.log(error.message);

    }


  }

  const handleSignInClick = () => {
    setIsSignUpMode(false);
    toast.success("Signin!")
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
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form onSubmit={signupHandler} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="profile-badge">
                <div className="profile-pic">
                  <label
                    htmlFor="profile-image-upload"
                    className="circular-image-container"
                  >
                    {/* {image ? (
                    <img
                      alt="User Pic"
                      src={image}
                      className="circular-image"
                    />
                  ) : (
                    <div className="dummy-image">
                      <i className="fas fa-user"> <FaUser/></i>
                    </div>
                  )} */}
                  </label>
                  {/* <input
                    id="profile-image-upload"
                    className="img-input"
                    type="file"
                    accept="image/*"
                  onChange={avatar.changeHandler}
                  /> */}
                </div>
              </div>
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
              {/* <div className="input-field">
                    <i className="fas fa-user"><FaUserPen/></i>
                    <input type="text" placeholder="Bio" />
                </div> */}
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
              <input type="submit" className="btn" value="Sign up" />
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
