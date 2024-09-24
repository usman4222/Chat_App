import React from "react";
import ChatHeader from "./Components/ChatHeader";
import MessageBar from "./Components/MessageBar";
import MessageContainer from "./Components/MessageContainer";

const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:float-1">
      <ChatHeader />
      <MessageContainer/>
      <MessageBar/>
    </div>
  );
};

export default ChatContainer;
