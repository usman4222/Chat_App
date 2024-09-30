import React, { useEffect } from "react";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatContainer from "./Components/ChatContainer";
import ContactContainer from "./Components/ContactContainer";
import EmptyChatContainer from "./Components/EmptyChatContainer";

const ChatPage = () => {

  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadingProgress,
    fileDownloadingProgress
  } = appStore();
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
        {isUploading &&
          <div className="h-[100vh] w-[100vw] fixed top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
            <h5 className="text-5xl animate-pulse">
              Uploading File{fileUploadingProgress}%
            </h5>
          </div>
        }
        {isDownloading &&
          <div className="h-[100vh] w-[100vw] fixed top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
            <h5 className="text-5xl animate-pulse">
              Downloading File{fileDownloadingProgress}%
            </h5>
          </div>
        }
        <ContactContainer />
        {
          selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
        }
        {/* <ChatContainer /> */}
        {/* <EmptyChatContainer /> */}
      </div>
    </>
  );
};

export default ChatPage;
