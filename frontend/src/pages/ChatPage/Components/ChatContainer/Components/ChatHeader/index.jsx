import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { appStore } from "../../../../../../store";
import { HOST } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../utils/colors";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType, selectedChatMessage } =
    appStore();
  const [selectedColor, setSelectedColor] = useState("defaultColor");

  if (!selectedChatData || !selectedChatMessage) return null;

  const isAdmin = (memberId) => memberId === selectedChatData.admin;

  const renderMemberNames = () => {
    return selectedChatData.members.map((memberId) => {
      const memberDetails = selectedChatMessage.find(
        (msg) => msg.sender._id === memberId
      );

      const memberName = memberDetails
        ? `${memberDetails.sender.firstName} ${memberDetails.sender.lastName}`
        : "Unknown";

      return (
        <span key={memberId} className="mr-2">
          {memberName}
          {isAdmin(memberId) && (
            <span className="ml-1 text-sm text-blue-500 font-semibold">
              (Admin)
            </span>
          )}
         {" "} |
        </span>
      );
    });
  };

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center pc-20">
      <div className="flex items-center gap-5 w-full justify-between px-10">
        <div className="flex gap-3 items-center justify-center">
          {selectedChatType === "contact" ? (
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
          ) : (
            <div className="bg-[#ffffff22] h-10 w-10 rounded-full flex justify-center items-center">
              #
            </div>
          )}
          <div>
            <div className="flex flex-col">
              <div>
                {selectedChatType === "channel" && selectedChatData.name}
              </div>

              <div className="flex">
                {selectedChatType === "channel" && renderMemberNames()}
              </div>
            </div>

            {selectedChatType === "contact"
              ? selectedChatData.firstName && selectedChatData.lastName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : selectedChatData.email
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
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
