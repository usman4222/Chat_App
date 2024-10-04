import React, { useRef, useEffect, useState } from "react";
import { appStore } from "../../../../../../store";
import moment from "moment";
import { apiClient } from "../../../../../../lib/apiClient";
import {
  ALL_GROUP_MESSAGES_ROUTE,
  GET_MESSAGES_ROUTE,
  HOST,
} from "../../../../../../utils/constants";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { getColor } from "../../../../../../utils/colors";

const MessageContainer = () => {
  const scrollRef = useRef();
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);
  const {
    selectedChatData,
    selectedChatType,
    userInfo,
    selectedChatMessage,
    setSelectedChatMessage,
    setFileDownloadingProgress,
    setIsDownloading,
  } = appStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (res.data.messages) {
          setSelectedChatMessage(res.data.messages);
        }
        
      } catch (error) {
        console.log({ error });
      }
    };

    const getGroupMessages = async () => {
      try {
        const res = await apiClient.get(
          `${ALL_GROUP_MESSAGES_ROUTE}/${selectedChatData._id}`,
          { withCredentials: true }
        );
        console.log("All groups message", res);

        if (res.data.messages) {
          setSelectedChatMessage(res.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      } else if (selectedChatType === "channel") {
        getGroupMessages();
      }
    }
  }, [setSelectedChatMessage, selectedChatType, selectedChatData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico|heic|heif|)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (filePath) => {
    setIsDownloading(true);
    setFileDownloadingProgress(0);
    const url = `${HOST}/${filePath}`;
    try {
      const res = await apiClient.get(url, {
        responseType: "blob",
        onDownloadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setFileDownloadingProgress(percentCompleted);
        },
      });

      const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filePath.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
      setIsDownloading(false);
      setFileDownloadingProgress(0);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
      const formattedDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = formattedDate !== lastDate;
      lastDate = formattedDate;

      

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderGroupMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    const imageUrl = message.fileUrl ? `${HOST}/${message.fileUrl}` : null;
    console.log("Image URL:", imageUrl);
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 my-1 rounded max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 my-1 rounded max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setshowImage(true), setimageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                  alt="file"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/80 text-3xl rounded-full bg-black/20 p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 rounded-full text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timeStamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderGroupMessages = (message) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo.id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id === userInfo.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 my-1 rounded max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              message.sender._id === userInfo.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 my-1 rounded max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setshowImage(true), setimageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                  alt="file"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/80 text-3xl rounded-full bg-black/20 p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 rounded-full text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        {message.sender._id !== userInfo.id ? (
          <div className="flex items-center gap-3 mt-2">
            {message.sender.image && (
              <img
                src={`${HOST}/${message.sender.image}`}
                alt="Profile"
                className="border border-[#000] h-12 w-12 rounded-full"
              />
            )}
            <div>
              <div
                className={`uppercase h-8 w-8 text-2xl text-green-500 flex justify-center items-center rounded-full ${getColor(
                  message.sender.color
                )}`}
              >
                {message.sender.firstName
                  ? message.sender.firstName.split("").shift()
                  : message.sender.email.split("").shift()}
              </div>
            </div>
            <span className="text-xs text-white/60">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
            <span className="text-xs text-white/60">
              {moment(message.timeStamp).format("LT")}
            </span>
          </div>
        ) : (
          <div className="text-xs text-white/60 mt-1">
            {moment(message.timeStamp).format("LT")}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-f">
        {renderMessages()}
        {showImage && (
          <div className="fixed z-[1000] top-0 left-0 flex items-center justify-center h-[100vh] w-[100vw] backdrop-blur-lg flex-col">
            <div>
              <img
                src={`${HOST}/${imageUrl}`}
                alt="img"
                className="h-[80vh] w-full bg-cover"
              />
            </div>
            <div className="flex gap-5 fixed top-0 mt-5">
              <button
                className="bg-black/20 p-3 rounded-full text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(imageUrl)}
              >
                <IoMdArrowRoundDown />
              </button>
              <button
                className="bg-black/20 p-3 rounded-full text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => {
                  setshowImage(false), setimageUrl(null);
                }}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        )}
      </div>
      <div ref={scrollRef}></div>
    </>
  );
};

export default MessageContainer;
