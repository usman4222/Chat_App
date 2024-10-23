import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { appStore } from "../../../../../store";
import {
  ADD_NEW_MEMBER_ROUTE,
  GET_ALL_CONTACTS,
} from "../../../../../utils/constants";
import { apiClient } from "../../../../../lib/apiClient";

const ChangeAdmin = ({ openModal, setOpenChangeAdminModal }) => {
  const [allContacts, setAllContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  const { selectedChatData } = appStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await apiClient.get(GET_ALL_CONTACTS, {
          withCredentials: true,
        });
        console.log("Fetched Contacts:", res.data.contacts);
        setAllContacts(res.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  useEffect(() => {
    if (allContacts.length && selectedChatData) {
      const groupMembers = selectedChatData.members.map(
        (member) => member._id || member
      );
      console.log("Group Members IDs:", groupMembers);
      const contactsNotInGroup = allContacts.filter(
        (contact) => !groupMembers.includes(contact.value)
      );
      console.log("Filtered Contacts Not In Group:", contactsNotInGroup);
      setFilteredContacts(contactsNotInGroup);
    }
  }, [allContacts, selectedChatData]);

  const handleSelectContact = (contact) => {
    if (selectedContact.includes(contact)) {
      setSelectedContact(selectedContact.filter((item) => item !== contact));
    } else {
      setSelectedContact([...selectedContact, contact]);
    }
  };

  const addNewMember = async () => {
    try {
      const memberIds = selectedContact.map((contact) => contact.value);

      const requests = memberIds.map((memberId) =>
        apiClient.post(
          ADD_NEW_MEMBER_ROUTE,
          {
            groupId: selectedChatData._id, 
            newMemberId: memberId,
          },
          {
            withCredentials: true,
          }
        )
      );
      const responses = await Promise.all(requests);
      responses.forEach((res) => {
        console.log("Member added successfully:", res.data);
      });
      setOpenChangeAdminModal(false);
    } catch (error) {
      console.error(
        "Error adding members:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Dialog
      open={openModal}
      onClose={setOpenChangeAdminModal} 
      className="relative z-10"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-[#181920] text-white text-left shadow-xl transition-all h-[600px] w-[400px]">
            <div className="flex justify-between items-start p-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-white"
              >
                Please select new members to add in group.
              </DialogTitle>
              <button
                onClick={() => setOpenChangeAdminModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="text-sm text-neutral-400 mb-2">All Contacts</h4>
              <div className="h-[300px] overflow-y-auto">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact, index) => {
                    const [firstName, ...lastNameArr] =
                      contact.label.split(" ");
                    const lastName = lastNameArr.join(" ");

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                          selectedContact.includes(contact)
                            ? "bg-purple-600"
                            : "bg-[#2c2e3b]"
                        } rounded-lg mb-2`}
                        onClick={() => handleSelectContact(contact)}
                      >
                        <div className="flex items-center space-x-2">
                          <p className="text-white">{firstName || "N/A"}</p>
                          <p className="text-sm text-gray-400">
                            {lastName || "N/A"}
                          </p>
                        </div>
                        <div className="text-sm text-gray-400">
                          {selectedContact.includes(contact)
                            ? "Selected"
                            : "Select"}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-400">
                    All Contacts are in your group.
                  </div>
                )}
              </div>
            </div>
            <div className="px-8 pb-4">
              <button
                onClick={addNewMember}
                className="w-full py-3 rounded-lg mt-5 bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                disabled={selectedContact.length === 0}
              >
                Add Members
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangeAdmin;
