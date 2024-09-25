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

const NewDm = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContact, setSearchContact] = useState([]);

  const searchContacts = async (e) => {
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
              <div className="flex justify-center items-center mt-4">
                {searchedContact.length <= 0 && (
                  <div className="flex flex-col">
                    <Lottie
                      isClickToPauseDisabled={true}
                      height={150}
                      width={150}
                      options={{
                        ...animationDefaultOption,
                        animationData: NotFound,
                      }}
                    />
                    <h3 className="poppins-medium">
                      Hi <span className="text-purple-500">! </span>Search
                      <span className="text-purple-500"> New Contcats.</span>
                    </h3>
                  </div>
                )}
              </div>
              {/* <div className="bg-[#181920] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpenNewContactModal(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenNewContactModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewDm;
