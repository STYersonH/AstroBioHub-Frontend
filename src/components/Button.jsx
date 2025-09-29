import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-sm px-lg cursor-pointer rounded-full border border-gray-200 bg-gray-100 transition-all duration-300 hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default Button;
