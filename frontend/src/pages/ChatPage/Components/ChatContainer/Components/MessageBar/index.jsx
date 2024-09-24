import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef]);

  const handleSendMessage = () => {};

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
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
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
      <button className="bg-[#6417ff] hover:bg-[#741bda] focus:bg-[#741bda] rounded-md flex  p-5 justify-center items-center focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
