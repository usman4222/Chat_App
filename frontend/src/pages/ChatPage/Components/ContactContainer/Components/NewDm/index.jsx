import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { animationDefaultOption } from "../../../../../../lib/untils";
import Lottie from "react-lottie";
import NotFound from "../../../../../../assets/images/NotFound.json";
import { apiClient } from "../../../../../../lib/apiClient";
import { HOST, SEARCH_CONTACT_ROUTE } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../utils/colors";
import { appStore } from "../../../../../../store";

const NewDm = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContact, setSearchContact] = useState([]);
  const { setSelectedChatType, setSelectedChatData } =
    appStore();
  const [selectedColor, setSelectedColor] = useState("defaultColor");

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (res.status === 200 && res.data.contacts) {
          setSearchContact(res.data.contacts);
        }
      } else {
        setSearchContact([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const selectNewConatct = async (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact")
    setSelectedChatData(contact)
    setSearchContact([]);
  };

  return (
    <>
      <div>
        <FaPlus
          className="text-neutral-400 text-sm text-opacity-90 font-light hover:text-neutral-100 transition-all duration-300 cursor-pointer"
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Select New Contact"
          onClick={() => setOpenNewContactModal(true)}
        />
        <Tooltip id="edit-tooltip" place="top" effect="solid" />
      </div>
      <Dialog
        open={openNewContactModal}
        onClose={() => setOpenNewContactModal(false)}
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
              className="relative transform overflow-hidden rounded-lg bg-[#181920] text-white text-left shadow-xl transition-all h-[400px] w-[400px]"
            >
              <div className="flex justify-between items-start p-4">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-white"
                >
                  Please select a Contact.
                </DialogTitle>
                <button
                  onClick={() => setOpenNewContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="search contact"
                  className="rounded-lg py-3 px-8 bg-[#2c2e3b] border-none focus:outline-none"
                  onChange={(e) => searchContacts(e.target.value)}
                />
              </div>

              {searchedContact.length > 0 ? (
                <div className="flex flex-col items-center mt-4">
                  <h2 className="text-xl font-semibold mb-4">Contacts List</h2>
                  <div className="w-full max-w-md h-60 overflow-y-auto rounded-lg  bg-[#181920] shadow-md p-4">
                    <ul className="space-y-2">
                      {searchedContact.map((contact) => (
                        <li
                          key={contact.id}
                          onClick={() => selectNewConatct(contact)}
                          className="flex justify-between items-center p-2 border-b border-gray-200 rounded-md hover:cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <div>
                              {contact.image ? (
                                <img
                                  src={`${HOST}/${contact.image}`}
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
                                    {contact.firstName
                                      ? contact.firstName.split("").shift()
                                      : contact.email.split("").shift()}
                                  </div>
                                </div>
                              )}
                            </div>
                            <p className="font-medium text-white flex flex-col">
                              <span>
                                {contact.firstName && contact.lastName
                                  ? `${contact.firstName} ${contact.lastName}`
                                  : ""}
                              </span>
                              <span className="text-xs">{contact.email}</span>
                            </p>
                          </div>
                          {/* <button className="text-blue-600 hover:text-blue-500">
              Select
            </button> */}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-5">
                  <Lottie
                    isClickToPauseDisabled={true}
                    height={150}
                    width={150}
                    options={{
                      ...animationDefaultOption,
                      animationData: NotFound,
                    }}
                  />
                  <h3 className="poppins-medium text-center mt-2">
                    Hi <span className="text-purple-500">! </span>
                    Search New Contacts.
                  </h3>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewDm;
