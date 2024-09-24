import React from "react";
import { appStore } from "../../../../../../store";
import { HOST } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../utils/colors";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoLogOut, IoPower } from "react-icons/io5";

const ProfileInfo = () => {
  const { userInfo } = appStore();
  const navigate = useNavigate();

  const logout = async () =>{

  }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <Tooltip id="my-tooltip" />
      <div className="flex gap-3 justify-center items-center">
        <div className="w-12 h-12 relative">
          {userInfo.image ? (
            <img
              src={`${HOST}/${userInfo.image}`}
              alt="Profile"
              className="border border-[#000] h-12 w-12 rounded-full"
            />
          ) : (
            // <Avatar size="80" src={image} />
            <div>
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] text-green-500 flex justify-center items-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            </div>
          )}
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <FiEdit2
            className="text-purple-500 text-xl font-medium cursor-pointer"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Edit Profile"
            onClick={() => navigate("/profile")}
          />

          <Tooltip id="edit-tooltip" place="top" effect="solid" />
        </div>
        <div>
          <IoPower
            className="text-red-500 text-xl font-medium cursor-pointer"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Logout"
            onClick={logout}
          />

          <Tooltip id="edit-tooltip" place="top" effect="solid" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
