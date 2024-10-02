import { createContext, useContext, useEffect, useRef, useState } from "react";
import { appStore } from "../store";
import { io } from "socket.io-client";
import { HOST } from "../utils/constants";

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

                const { selectedChatType, selectedChatData, addMessage } = appStore.getState()

                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)) {
                    console.log("msg rec", message);

                    addMessage(message)
                }

            }

            const handleReceiveGroupMessage = (message) => {
                console.log("Group message received:", message);
                const { selectedChatType, selectedChatData, addMessage } = appStore.getState()

                if (selectedChatType !== undefined && selectedChatData._id === message.groupId) {
                    addMessage(message)
                    // setMessageCount((prevCount) => prevCount + 1);
                    console.log(`Total messages received: ${messageCount + 1}`);
                }
            }

            socket.current.on("recieveMessage", handleReceiveMessage)
            socket.current.on("recieve-group-message", handleReceiveGroupMessage)

            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo, messageCount]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
