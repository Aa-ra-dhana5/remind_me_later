import React from "react";
import InputField from "./InputField";
import Button from "./Button";

const AuthForm = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  buttonText,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {buttonText} Form
      </h2>

      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" label={buttonText} />
    </form>
  );
};

export default AuthForm;
