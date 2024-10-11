import React, { useEffect, useRef, useState } from "react";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { colors, getColor } from "../../utils/colors";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DELETE_IMAGE_ROUTE,
  HOST,
  PROFILE_IMAGE_ROUTE,
  UPDATE_USER_ROUTE,
} from "../../utils/constants";
import { apiClient } from "../../lib/apiClient.js";
import Avatar from "react-avatar";
import img from "../../assets/images/image-diabi.png";

function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { userInfo, setUserInfo } = appStore();
  const navigate = useNavigate();
  const inputRef = useRef();

  // const imageUrl = `${HOST}/uploads/profiles/${userInfo.image}`;
  // console.log(imageUrl);

  // console.log(profileSetup);

  useEffect(() => {
    if (userInfo && userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo && userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const profileValite = () => {
    if (!firstName) {
      toast.error("First Name is required!");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required!");
      return false;
    }
    return true;
  };

  const profileHandler = async (e) => {
    e.preventDefault();

    if (profileValite()) {
      try {
        const res = await apiClient.post(
          UPDATE_USER_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        console.log("Updated User", res);

        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data });
          toast.success("User Updated successfully.");
          navigate("/chat");
        }
      } catch (error) {
        if (error.res) {
          console.log(error.res.data);
          toast.error(error.res.data);
        } else {
          console.log(error.message);
          toast.error("Something went wrong.");
        }
      }
    }
  };

  const handleInputClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const res = await apiClient.post(PROFILE_IMAGE_ROUTE, formData, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.image) {
          setUserInfo({ ...userInfo, image: res.data.image });
          setImage(`${HOST}/${userInfo.image}`);
          toast.success("Image updated successfully.");
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          toast.error(error.response.data);
        } else {
          console.log(error.message);
          toast.error("Something went wrong.");
        }
      }
    }
  };

  const handleDeleteImage = async (e) => {
    try {
      const res = await apiClient.delete(DELETE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success("Image Deleted Successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-[#1C1D25] relative flex justify-center items-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-[#292A32] flex flex-row shadow-lg  rounded-[14px]">
        <form onSubmit={profileHandler} className="flex">
          <div className="flex flex-col items-center justify-center py-5">
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative h-32 w-32"
              onClick={image ? handleDeleteImage : handleInputClick}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="border border-[#000] h-32 w-32 rounded-full"
                />
              ) : (
                // <Avatar size="80" src={image} />
                <div>
                  <div
                    className={`uppercase h-32 w-32 text-5xl border-[1px] text-green-500 flex justify-center items-center rounded-full ${getColor(
                      selectedColor
                    )}`}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo && userInfo.email.split("").shift()}
                  </div>
                </div>
              )}
              {hovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full cursor-pointer">
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleImageChange}
                name="profileImage"
                accept=".png, .jpg, .jpeg, .svg, .webp"
              />
            </div>
            <h1 className="font-bold border-b border-gray-300 text-[1.1rem] text-center pt-2 px-5 text-white">
              {userInfo?.email}{" "}
              <span className="font-normal text-[0.95rem] text-gray-500"></span>
            </h1>
          </div>

          <div className="flex flex-col items-center  px-5 pb-5">
            <div className="">
              <div className="font-bold mt-7 text-white">First Name:</div>
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
            <div className="">
              <div className="font-bold mt-7 text-white">Last Name:</div>
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
          </div>
          <div className=" gap-5 flex items-center justify-center pt-10  px-5">
            {colors.map((color, index) => (
              <div
                className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedColor === index
                    ? "outline outline-white outline-4"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(index)}
              ></div>
            ))}
          </div>
          <div className="px-5 py-8 flex justify-center items-center ">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 px-3 text-white font-bold h-10 rounded-lg w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
