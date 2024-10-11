import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { GET_ALL_CONTACTS, REMOVE_MEMBER_ITSELF_ROUTE } from "../utils/constants";
import { apiClient } from "../lib/apiClient";
import { appStore } from "../store";

const MemberRemoveConfirmModal = ({ openModal, setOpenRemoveMemberItselfModal }) => {
  const [allContacts, setAllContacts] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  const { selectedChatData, userInfo } = appStore();

  const memberId = userInfo.id


  const removeMemberItself = async () => {
    
    try {    
      const response = await apiClient.post(
        REMOVE_MEMBER_ITSELF_ROUTE,
        {
          groupId: selectedChatData._id,
          memberId: memberId, 
        },
        {
          withCredentials: true,
        }
      );
  
      console.log("Members removed successfully:", response.data);
  
      const updatedFilteredMembers = filteredMembers.filter(contact => 
        !memberId.includes(contact.value)
      );
      setFilteredMembers(updatedFilteredMembers);
      setSelectedContact([]); 
      setOpenRemoveMemberItselfModal(false); 
      window.location.reload();
    } catch (error) {
      console.error(
        "Error removing members:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenRemoveMemberItselfModal(false)}
      className="relative z-10"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-[#181920] text-white text-left shadow-xl transition-all h-[200px] w-[400px]">
            <div className="flex justify-between items-start p-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-white"
              >
                Confirm
              </DialogTitle>
              <button
                onClick={() => setOpenRemoveMemberItselfModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex justify-center items-center mt-6">
              <h5 className="text-base font-semibold leading-6 text-white">
                Are you sure to Leave this group?
              </h5>
            </div>
           
            <div className="px-8 pb-4">
              <button
                onClick={removeMemberItself}
                className="w-full py-3 rounded-lg mt-5 bg-red-700 hover:bg-red-900 transition-all duration-300"
              >
                Yes, I'm
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default MemberRemoveConfirmModal;
