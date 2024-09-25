import { create } from 'zustand'
import { authSlice } from './Slice/AuthSlice'
import { createChatSlice } from './Slice/ChatSlice'

export const appStore = create()((...a) => ({
    ...authSlice(...a),
    ...createChatSlice(...a)
}))