import React, { useState } from 'react';
import { appStore } from '../store';
import { HOST } from '../utils/constants';
import { getColor } from '../utils/colors';

const ContactList = ({ contacts, isChannel = false }) => {
    const {
        selectedChatType,
        selectedChatData,
        setSelectedChatData,
        setSelectedChatType,
        setSelectedChatMessage,
    } = appStore();
    const [selectedColor, setSelectedColor] = useState("defaultColor");

    const handleClick = (contact) => {
        if (isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");

        setSelectedChatData(contact);

        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessage([]);
        }
    };

    console.log(contacts);

    return (
        <div className='mt-5'>
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className={`pl-10 py-2 transition-all duration-300 cursor-pointer 
            ${selectedChatData && selectedChatData._id === contact._id
                            ? 'bg-[#8417ff] hover:bg-[#8417ff]'
                            : 'bg-[#f1f1f111]'
                        }`}
                    onClick={() => handleClick(contact)}
                >
                    <div className='flex gap-5 items-center justify-start text-neutral-300'>
                        <div>
                            {contact.image ? (
                                <img
                                    src={`${HOST}/${contact.image}`}
                                    alt='Profile'
                                    className='border border-[#000] h-10 w-10 rounded-full'
                                />
                            ) : (
                                <div>
                                    <div
                                        className={`${selectedChatData && selectedChatData._id === contact._id
                                            ? "bg-[ffffff22] border border-white/70"
                                            : getColor(selectedColor)} 
    uppercase h-10 w-10 text-lg border-[1px] text-green-500 flex justify-center items-center rounded-full`}
                                    >
                                        {contact.firstName
                                            ? contact.firstName.charAt(0)
                                            : contact.email}
                                    </div>
                                </div>
                            )}
                        </div>
                        {
                            isChannel && <div className='bg-[ffffff22] h-10 w-10 rounded-full flex justify-center items-center'>#</div>
                        }
                        {
                            isChannel ? <span>{contact.name}</span> : <span>{`${contact.firstName} ${contact.lastName}`}</span>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
