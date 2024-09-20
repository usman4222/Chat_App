import React, { useEffect } from 'react'
import { appStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const { userInfo } = appStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue...")
      navigate("/profile")
    }
  }, [userInfo, navigate])
  return (
    <>
      <ToastContainer />
      <div>ChatPage</div>
    </>
  )
}

export default ChatPage