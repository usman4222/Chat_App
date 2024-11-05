export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadingProgress: 0,
  fileDownloadingProgress: 0,
  groups: [],
  messageCount: 0, 
  setGroups: (groups) => set({ groups }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileIsUploadingProgress: (fileUploadingProgress) =>
    set({ fileUploadingProgress }),
  setFileDownloadingProgress: (fileDownloadingProgress) =>
    set({ fileDownloadingProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),
  addGroup: (group) => {
    const groups = get().groups;
    set({ groups: [group, ...groups] });
  },
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessage: [],
      messageCount: 0,
    }),

  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;
    const currentMessageCount = get().messageCount; 

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
      messageCount: currentMessageCount + 1, 
    });
  },

  addGroupInGroupList: (message) => {
    const groups = get().groups;
    const data = groups.find(group => group._id === message.groupId)
    const index = groups.findIndex(group => group._id === message.groupId)
    if (index !== -1 && index !== undefined) {
      groups.splice(index, 1)
      groups.unshift(data)
    }
  },

  addContactsInDMContacts: (message) => {
    const userId = get().userInfo.id;
    const formId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id

    const formData = message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === formId);
    const index = dmContacts.findIndex((contact) => contact._id === formId);
    if (index !== -1 && index !== undefined) {
      dmContacts.splice(index, 1)
      dmContacts.unshift(data)
    }
    else {
      dmContacts.unshift(formData)
    }
    set({ directMessagesContacts: dmContacts })
  }
});
