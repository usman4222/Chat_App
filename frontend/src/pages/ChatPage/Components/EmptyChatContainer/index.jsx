import React from "react";
import Lottie from "react-lottie";
import { animationDefaultOption } from "../../../../lib/untils";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={400}
        width={560}
        options={{ ...animationDefaultOption }}
      />
      <div className="text-opacity-80 flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-encter">
        <h3 className="poppins-medium">
          Hi <span className="text-purple-500">! </span>Welcome
          <span className="text-purple-500"> to Chat App</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
