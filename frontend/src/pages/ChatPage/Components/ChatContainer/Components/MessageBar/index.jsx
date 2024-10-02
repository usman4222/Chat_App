import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { appStore } from "../../../../../../store";
import { useSocket } from "../../../../../../Context/SocketContext";
import { apiClient } from "../../../../../../lib/apiClient";
import { UPLOAD_FILE_ROUTE } from "../../../../../../utils/constants";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket()
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { selectedChatData, selectedChatType, userInfo, setIsUploading, setFileIsUploadingProgress } = appStore()



  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef]);

const handleSendMessage = async () => {
    console.log("message");
    if (!socket) {
        console.error("Socket is not available");
        return; // Exit the function if socket is not available
    }

    if (selectedChatType === "contact") {
        socket.emit("sendMessage", {
            sender: userInfo.id,
            content: message,
            recipient: selectedChatData._id,
            messageType: "text",
            fileUrl: undefined,
        });
        setMessage("");
    } else if (selectedChatType === "channel") {
        socket.emit("send-group-message", {
            sender: userInfo.id,
            content: message,
            messageType: "text",
            fileUrl: undefined,
            groupId: selectedChatData._id,
        });
        setMessage("");
    }
};


  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        setIsUploading(true)
        const res = await apiClient.post(UPLOAD_FILE_ROUTE, formData,
          {
            withCredentials: true,
            onUploadProgress: data => {
              setFileIsUploadingProgress(Math.round((100 + data.loaded) / data.total))
            }
          })

        if (res.status === 200 && res.data) {
          setIsUploading(false)
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: res.data.filePath
            })
          }
          else if (selectedChatType === "channel") {
            socket.emit("send-group-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileUrl: res.data.filePath,
              groupId: selectedChatData._id
            })
          }
        }
      }

    } catch (error) {
      setIsUploading(false)
      console.log(error);

    }
  }

  const addEmojiHandler = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  return (
    <div className="h-[10vw] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6  ">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          value={message}
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleAttachmentClick} className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleAttachmentChange} />
        <div className="relative">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              autoFocusSearch={false}
              onEmojiClick={addEmojiHandler}
            />
          </div>
        </div>
      </div>
      <button onClick={handleSendMessage} className="bg-[#6417ff] hover:bg-[#741bda] focus:bg-[#741bda] rounded-md flex  p-5 justify-center items-center focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
