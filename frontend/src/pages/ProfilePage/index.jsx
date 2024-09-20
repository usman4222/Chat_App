import React, { useState } from "react";
import avatar from "../../assets/images/image-diabi.png";
import bgPatternTop from "../../assets/images/bg-pattern-top.svg";
import bgPatternBottom from "../../assets/images/bg-pattern-bottom.svg";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { colors, getColor } from "../../utils/colors";
import { FaPlus, FaTrash } from "react-icons/fa";

function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)
  const { userInfo, setUserInfo } = appStore()
  const navigate = useNavigate()

  const profileHandler = async () => {

  }

  return (
    <div className="bg-green-300 relative flex justify-center items-center w-screen h-screen">
      <div className="bg-white shadow-lg min-w-[350px] max-w-[600px] rounded-[14px]">
        <div className="flex justify-center py-5">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-32 w-32 "
          >
            {image ? (
              <img
                src={image}
                alt="img"
                className="border-[4px] bg-red-300 border-white rounded-full mt-10 "
              />
            ) : (
              <div>
                <div
                  className={`uppercase h-32 w-32 text-5xl border-[1px] text-green-500 flex justify-center items-center rounded-full ${getColor(selectedColor)}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              </div>
            )}

            {/* Hover Effect with Icon */}
            {hovered && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full cursor-pointer">
                {image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />}
              </div>
            )}
          </div>
        </div>

        <h1 className="font-bold border-b border-gray-300 text-[1.1rem] text-center pt-2 px-5">
          {userInfo.email} <span className="font-normal text-[0.95rem] text-gray-500"></span>
        </h1>
        {/* <h2 className="font-normal text-[0.95rem] text-gray-500 text-center pb-2"></h2> */}
        <div className=" px-10 ">
          <div className="font-bold mt-7">
            First Name:
          </div>
          <div className="text-center mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className=" px-10 ">
          <div className="font-bold mt-7">
            Last Name:
          </div>
          <div className="text-center mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full gap-5 flex items-center justify-center pt-10">
          {colors.map((color, index) => (
            <div
              className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white outline-4" : ""}`}
              key={index}
              onClick={() => setSelectedColor(index)}
            >
            </div>
          ))}
        </div>
        <div className="px-10 py-8">
          <button onClick={profileHandler} className="bg-green-400 hover:bg-green-300 text-white font-bold h-10 rounded-lg w-full">Save Changes </button>
        </div>
      </div >
    </div >
  );
}

export default ProfilePage;