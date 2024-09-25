import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { appStore } from "../../../../../../store";
import { HOST } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../utils/colors";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = appStore();
  const [selectedColor, setSelectedColor] = useState("defaultColor");

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center pc-20">
      <div className="flex items-center gap-5 w-full justify-between px-10">
        <div className="flex gap-3 items-center justify-center">
          <div>
            {selectedChatData.image ? (
              <img
                src={`${HOST}/${selectedChatData.image}`}
                alt="Profile"
                className="border border-[#000] h-12 w-12 rounded-full"
              />
            ) : (
              <div>
                <div
                  className={`uppercase h-12 w-12 text-2xl border-[1px] text-green-500 flex justify-center items-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "contact" ?
              `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center  gap-5">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
