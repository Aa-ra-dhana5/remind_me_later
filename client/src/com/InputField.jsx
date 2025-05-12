import React from "react";

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;
