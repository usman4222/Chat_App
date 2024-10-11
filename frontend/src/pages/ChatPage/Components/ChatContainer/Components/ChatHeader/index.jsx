import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { appStore } from "../../../../../../store";
import {
  ALL_GROUP_MEMBERS_ROUTE,
  HOST,
} from "../../../../../../utils/constants";
import { getColor } from "../../../../../../utils/colors";
import { apiClient } from "../../../../../../lib/apiClient";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import AddNewMember from "../../../ContactContainer/CreateGroup/AddNewMember";
import RemoveGroupMember from "../../../ContactContainer/CreateGroup/RemoveGroupMember";
import MemberRemoveConfirmModal from "../../../../../../components/MemberRemoveConfirmModal";

const ChatHeader = () => {
  const {
    closeChat,
    selectedChatData,
    selectedChatType,
    selectedChatMessage,
    userInfo,
  } = appStore();
  const [selectedColor, setSelectedColor] = useState("defaultColor");
  const [adminDetails, setAdminDetails] = useState(null);
  const [memberDetails, setMemberDetails] = useState([]);
  const [isAddNewMemberModalOpen, setIsAddNewMemberModalOpen] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openRemoveMemberItselfModal, setOpenRemoveMemberItselfModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = userInfo.id;

  useEffect(() => {
    const getAllGroupMembers = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(
          `${ALL_GROUP_MEMBERS_ROUTE}/${selectedChatData._id}`,
          { withCredentials: true }
        );

        const groupMembers = res.data.members || [];
        const adminId = selectedChatData.admin;
        const admin = res.data.admin;
        const adminName =
          admin.firstName && admin.lastName
            ? `${admin.firstName} ${admin.lastName}`
            : admin.email;

        const members = groupMembers.filter((member) => member._id !== adminId);
        setAdminDetails(adminName);

        const formattedMembers = members.map((member) => ({
          ...member,
          fullName:
            member.firstName && member.lastName
              ? `${member.firstName} ${member.lastName}`
              : member.email,
        }));

        setMemberDetails(formattedMembers);
      } catch (error) {
        console.error("Error fetching group members:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChatType === "channel") {
      getAllGroupMembers();
    }
  }, [selectedChatData, selectedChatType]);

  const openAddNewMemberModal = () => {
    setIsAddNewMemberModalOpen(true);
  };

  const closeAddNewMemberModal = () => {
    setIsAddNewMemberModalOpen(false);
  };

  const handleOpenRemoveModal = () => {
    setOpenRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setOpenRemoveModal(false);
  };

  const handleOpenRemoveMemberItselfModal = () => {
    setOpenRemoveMemberItselfModal(true);
  };

  const handleCloseRemoveMemberItselfModal = () => {
    setOpenRemoveMemberItselfModal(false);
  };

  if (!selectedChatData || !selectedChatMessage) return null;

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
                      ? selectedChatData.firstName.charAt(0)
                      : selectedChatData.email.charAt(0)}
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
                {selectedChatType === "channel" && (
                  <div className="text-sm text-neutral-500">
                    Admin: {adminDetails || "Loading..."}
                  </div>
                )}

                {selectedChatType === "channel" && (
                  <div className="text-sm text-neutral-500 ml-4">
                    Members:{" "}
                    {loading
                      ? "Loading..."
                      : memberDetails.length > 0
                      ? memberDetails
                          .map((member) => member.fullName)
                          .join(", ")
                      : "No members available."}
                  </div>
                )}
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
          {selectedChatType === "channel" &&
            selectedChatData?.admin === userId && (
              <>
                <button
                  className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                  onClick={openAddNewMemberModal}
                >
                  <FaUserPlus className="text-3xl" />
                </button>
                <button
                  onClick={handleOpenRemoveModal}
                  className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                >
                  <FaUserMinus className="text-3xl" />
                </button>
              </>
            )}
          {selectedChatType === "channel" &&
            selectedChatData?.admin !== userId && (
              <>
                <button
                  onClick={handleOpenRemoveMemberItselfModal}
                  className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                >
                  <FaUserMinus className="text-3xl" />
                </button>
              </>
            )}
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
        {isAddNewMemberModalOpen && (
          <AddNewMember
            openModal={isAddNewMemberModalOpen}
            setOpenNewMemberModal={closeAddNewMemberModal}
          />
        )}
        {openRemoveModal && (
          <RemoveGroupMember
            openModal={openRemoveModal}
            setOpenRemoveMemberModal={handleCloseRemoveModal}
          />
        )}
         {openRemoveMemberItselfModal && (
          <MemberRemoveConfirmModal
            openModal={openRemoveMemberItselfModal}
            setOpenRemoveMemberItselfModal={handleCloseRemoveMemberItselfModal}
          />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
