import React, { useEffect } from "react";
import logo from "../../../../assets/images/logo.png";
import ProfileInfo from "./Components/ProfileInfo";
import NewDm from "./Components/NewDm";
import { apiClient } from "../../../../lib/apiClient";
import { ALL_GROUPS_ROUTE, GET_CONTACT_FOR_DM } from "../../../../utils/constants";
import { appStore } from "../../../../store";
import ContactList from "../../../../components/ContactList";
import CreateGroup from "./CreateGroup";
import { IoNotifications } from "react-icons/io5";

const ContactContainer = () => {
  const { setDirectMessagesContacts, directMessagesContacts, groups, setGroups, messageCount } =
    appStore();

    console.log("messageCount", messageCount);
    

  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_CONTACT_FOR_DM, {
        withCredentials: true,
      });
      console.log("COntacts", res);

      if (res.data.contacts) {
        setDirectMessagesContacts(res.data.contacts);
      }
    };

    const getGroups = async () => {
      const res = await apiClient.get(ALL_GROUPS_ROUTE, {
        withCredentials: true,
      });
      console.log("Groups", res);

      if (res.data.groups) {
        setGroups(res.data.groups);
      }
    };

    getContacts();
    getGroups()
  }, [setDirectMessagesContacts, setGroups]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3 px-10 flex justify-between items-center">
        <img src={logo} alt="logo" />
        {/* <div className="relative">
          <IoNotifications className="text-2xl" />
          {messageCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {messageCount}
            </span>
          )}
        </div> */}
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-w-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Groups" />
          <CreateGroup />
        </div>
        <div className="max-w-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={groups} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
