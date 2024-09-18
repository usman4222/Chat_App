import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 rounded-full animate-spin border-4 border-dashed border-white border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
