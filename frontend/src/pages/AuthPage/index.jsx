import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Auth.css'

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);


  const handleSignUpClick = () => {
    setIsSignUpMode(true);
};

const handleSignInClick = () => {
    setIsSignUpMode(false);
};


  return (
    <div className="con">
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user">
                <FaUser />
              </i>
              <input
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock">
                <FaLock />
              </i>
              <input
                type="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form action="#" className="sign-up-form">
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
                <input
                  id="profile-image-upload"
                  className="img-input"
                  type="file"
                  accept="image/*"
                  // onChange={avatar.changeHandler}
                />
              </div>
            </div>
            <div className="input-field">
              <i className="fas fa-user">
                <FaUser />
              </i>
              <input
                type="text"
                placeholder="Username"
              />

            </div>
            {/* <div className="input-field">
                    <i className="fas fa-user"><FaUserPen/></i>
                    <input type="text" placeholder="Bio" />
                </div> */}
            <div className="input-field">
              <i className="fas fa-envelope">
                <MdEmail />
              </i>
              <input
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock">
                <FaLock />
              </i>
              <input
                type="password"
                placeholder="Password"
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
