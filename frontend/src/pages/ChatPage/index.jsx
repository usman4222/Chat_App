import React, { useEffect } from "react";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatContainer from "./Components/ChatContainer";
import ContactContainer from "./Components/ContactContainer";
import EmptyChatContainer from "./Components/EmptyChatContainer";

const ChatPage = () => {
  const { userInfo } = appStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <>
      <ToastContainer />
      <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactContainer />
        <ChatContainer />
        {/* <EmptyChatContainer /> */}
      </div>
    </>
  );
};

export default ChatPage;
