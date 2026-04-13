import React from "react";


const Spinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2  py-4">
      <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:0.15s]"></div>
    </div>
  );
};

export default Spinner;
