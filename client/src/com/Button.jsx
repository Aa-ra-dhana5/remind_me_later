import React from "react";

const Button = ({ type, label }) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default Button;
