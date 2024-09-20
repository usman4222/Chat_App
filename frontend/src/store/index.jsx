import { create } from 'zustand'
import { authSlice } from './Slice/AuthSlice'

export const appStore = create()((...a) => ({
    ...authSlice(...a)
}))