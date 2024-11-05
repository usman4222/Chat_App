import { createContext, useContext, useEffect, useRef, useState } from "react";
import { appStore } from "../store";
import { io } from "socket.io-client";
import { HOST } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = appStore();
    const [messageCount, setMessageCount] = useState(0);


    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });
            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleReceiveMessage = (message) => {

                const { selectedChatType, selectedChatData, addMessage, addContactsInDMContacts } = appStore.getState()

                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)) {
                    console.log("msg rec", message);

                    addMessage(message)
                }



                // if (!selectedChatType) {
                //     console.log("No chat is currently selected.");
                //     toast.success(`You have received a message from ${message.sender.firstName || message.sender._id}: ${message.content}`,
                //         {
                //             closeButton: false, 
                //             autoClose: 5000, 
                //         }
                //     );
                // }
                // else if (selectedChatType !== undefined && selectedChatData._id !== message.sender._id && message.sender._id !== userInfo.id) {
                //     console.log("You have received a message from:", message.sender);

                //     toast.success(`You have received a message from ${message.sender.firstName || message.sender._id}: ${message.content}`,
                //         {
                //             closeButton: false, 
                //             autoClose: 5000, 
                //         }
                //     );
                // }
                // else if (message.sender._id === userInfo.id) {
                //     console.log("This message was sent by the current user.");
                // } else {
                //     console.log("Message received in the current chat:", message);
                // }
                addContactsInDMContacts(message)

            }

            const handleReceiveGroupMessage = (message) => {
                console.log("Group message received:", message);
                const { selectedChatType, selectedChatData, addMessage, addGroupInGroupList } = appStore.getState()

                if (selectedChatType !== undefined && selectedChatData._id === message.groupId) {
                    addMessage(message)

                    // setMessageCount((prevCount) => prevCount + 1);
                    console.log(`Total messages received: ${messageCount + 1}`);
                }
                addGroupInGroupList(message)
            }

            socket.current.on("recieveMessage", handleReceiveMessage)
            socket.current.on("recieve-group-message", handleReceiveGroupMessage)

            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo, messageCount]);

    return (
        <>
            <ToastContainer />
            <SocketContext.Provider value={socket.current}>
                {children}
            </SocketContext.Provider>
        </>
    );
};
