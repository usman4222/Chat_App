import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { apiClient } from "../../../../../lib/apiClient";
import {
  CREATE_GROUP_ROUTE,
  GET_ALL_CONTACTS,
} from "../../../../../utils/constants";
import { appStore } from "../../../../../store";

const CreateGroup = () => {
  const [openNewGroupModal, setOpenNewGroupModal] = useState(false);
  const [searchedContact, setSearchContact] = useState([]);
  const { setSelectedChatType, setSelectedChatData, addGroup } = appStore();
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [newGroupModal, setNewGroupModal] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await apiClient.get(GET_ALL_CONTACTS, {
          withCredentials: true,
        });
        console.log("These are contacts", res);
        setAllContacts(res.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  const handleSelectContact = (contact) => {
    setSelectedContact((prevSelected) => {
      if (prevSelected.includes(contact)) {
        return prevSelected.filter((c) => c !== contact);
      } else {
        return [...prevSelected, contact];
      }
    });
  };

  const createGroup = async () => {
    try {
      if (groupName.length > 0 && selectedContact.length > 0) {
        const res = await apiClient.post(
          CREATE_GROUP_ROUTE,
          {
            name: groupName,
            members: selectedContact.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
        if (res.status === 201) {
          setGroupName("");
          setSearchContact([]);
          setNewGroupModal(false);
          addGroup(res.data.group);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <FaPlus
          className="text-neutral-400 text-sm text-opacity-90 font-light hover:text-neutral-100 transition-all duration-300 cursor-pointer"
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Create New Group"
          onClick={() => setOpenNewGroupModal(true)}
        />
        <Tooltip id="edit-tooltip" place="top" effect="solid" />
      </div>
      <Dialog
        open={openNewGroupModal}
        onClose={() => setOpenNewGroupModal(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-[#181920] text-white text-left shadow-xl transition-all h-[600px] w-[400px]"
            >
              <div className="flex justify-between items-start p-4">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-white"
                >
                  Please fill in the details for the new group.
                </DialogTitle>
                <button
                  onClick={() => setOpenNewGroupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex justify-center items-center p-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  className="rounded-lg py-3 px-8 bg-[#2c2e3b] border-none focus:outline-none w-full"
                  onChange={(e) => setGroupName(e.target.value)}
                  value={groupName}
                />
              </div>
              <div className="p-4">
                <h4 className="text-sm text-neutral-400 mb-2">All Contacts</h4>
                <div className="h-[300px] overflow-y-auto">
                  {allContacts.length > 0 ? (
                    allContacts.map((contact, index) => {
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
                      No contacts found.
                    </div>
                  )}
                </div>
              </div>
              <div className="px-8 pb-4">
                <button
                  onClick={createGroup}
                  className="w-full py-3 rounded-lg mt-5 bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                  disabled={!groupName || selectedContact.length === 0}
                >
                  Create Group
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateGroup;
