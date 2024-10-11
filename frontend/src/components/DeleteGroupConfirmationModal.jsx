import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { DELETE_GROUP_BY_ADMIN_ROUTE } from "../utils/constants";
import { apiClient } from "../lib/apiClient";
import { appStore } from "../store";

const DeleteGroupConfirmationModal = ({ openModal, setOpenDelGroupModal }) => {
  const { selectedChatData, userInfo } = appStore();
  const [isLoading, setIsLoading] = useState(false);
  const memberId = userInfo.id;

  const handleDelGroup = async () => {
    setIsLoading(true); 
    try {    
      const response = await apiClient.delete(
        DELETE_GROUP_BY_ADMIN_ROUTE,
        {
          data: {
            groupId: selectedChatData._id, 
          },
          withCredentials: true, 
        }
      );
  
      setOpenDelGroupModal(false); 
      window.location.reload(); 
    } catch (error) {
      console.error(
        "Error deleting group:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false); 
    }
  };
  

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenDelGroupModal(false)}
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
                Delete Confirmation
              </DialogTitle>
              <button
                onClick={() => setOpenDelGroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex justify-center items-center mt-6">
              <h5 className="text-base font-semibold leading-6 text-white">
                Are you sure to Delete this group?
              </h5>
            </div>

            <div className="px-8 pb-4">
              <button
                onClick={handleDelGroup}
                disabled={isLoading}
                className="w-full py-3 rounded-lg mt-5 bg-red-700 hover:bg-red-900 transition-all duration-300"
              >
                {isLoading ? "Deleting..." : "Yes, I'm sure"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteGroupConfirmationModal;
