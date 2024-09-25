import React, { useEffect } from "react";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatContainer from "./Components/ChatContainer";
import ContactContainer from "./Components/ContactContainer";
import EmptyChatContainer from "./Components/EmptyChatContainer";

const ChatPage = () => {
  const { userInfo, selectedChatType } = appStore();
  const navigate = useNavigate();
  console.log(selectedChatType);
  

  console.log(userInfo?.profileSetup);

  useEffect(() => {
    if (!userInfo || !userInfo.profileSetup) {
      toast("Please setup profile to continue...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <>
      <ToastContainer />
      <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactContainer />
        {
          selectedChatType === undefined ? <EmptyChatContainer/> : <ChatContainer/>
        }
        {/* <ChatContainer /> */}
        {/* <EmptyChatContainer /> */}
      </div>
    </>
  );
};

export default ChatPage;
