import React, { useRef, useEffect } from 'react';
import { appStore } from '../../../../../../store';
import moment from 'moment';
import { apiClient } from '../../../../../../lib/apiClient';
import { GET_MESSAGES_ROUTE } from '../../../../../../utils/constants';

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatData, selectedChatType, userInfo, selectedChatMessage, setSelectedChatMessage } = appStore();

  useEffect(() => {

    const getMessages = async () => {
      try {
        const res = await apiClient.post(GET_MESSAGES_ROUTE, { id: selectedChatData._id }, { withCredentials: true })
        if(res.data.messages){
          setSelectedChatMessage(res.data.messages)
        }
      } catch (error) {
        console.log({ error });

      }
    }

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages()
      }
    }

  }, [setSelectedChatMessage, selectedChatType, selectedChatData]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
      const formattedDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = formattedDate !== lastDate;
      lastDate = formattedDate;

      return (
        <div key={index}>
          {showDate && (
            <div className='text-center text-gray-500 my-2'>
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
      {message.messageType === "text" && (
        <div
          className={`${message.sender !== selectedChatData._id
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            : "bg-[#2a2b33]/5 text-white/80 border-white/20"}
          border inline-block p-4 my-1 rounded max-w-[50%] break-words`}>
          {message.content}
        </div>
      )}
      <div className='text-xs text-gray-600'>
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <>
      <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-f'>
        {renderMessages()}
      </div>
      <div ref={scrollRef}></div>
    </>
  );
};

export default MessageContainer;
