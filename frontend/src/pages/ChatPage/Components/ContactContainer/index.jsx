import React, { useEffect } from "react";
import logo from "../../../../assets/images/logo.png";
import ProfileInfo from "./Components/ProfileInfo";
import NewDm from "./Components/NewDm";
import { apiClient } from "../../../../lib/apiClient";
import { GET_CONTACT_FOR_DM } from "../../../../utils/constants";
import { appStore } from "../../../../store";
import ContactList from "../../../../components/ContactList";


const ContactContainer = () => {

  const { setDirectMessagesContacts, directMessagesContacts } = appStore()


  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_CONTACT_FOR_DM, { withCredentials: true })
      console.log("COntacts", res);

      if (res.data.contacts) {
        setDirectMessagesContacts(res.data.contacts);

      }
    }

    getContacts()
  }, [])


  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3 pl-10">
        <img src={logo} alt="logo" />
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
          <Title text="Channels" />
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
