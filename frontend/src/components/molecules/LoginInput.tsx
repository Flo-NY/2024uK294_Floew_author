import React from "react";
import FormSingleInput from "../atoms/FormSingleInput";

type LoginInputProps = {
  failStatus: null | "Wrong_Password" | "No_User";
};

function LoginInput({ failStatus }: LoginInputProps) {
  return (
    <div className="mb-6">
      <FormSingleInput
        id="email"
        name="email"
        placeholder="john@example.com"
        type="email"
        required
      >
        Email:
      </FormSingleInput>
      <FormSingleInput
        id="password"
        name="password"
        type="password"
        placeholder="******************"
        required
        minLength={4}
      >
        Passowrd:
      </FormSingleInput>
      {failStatus == "No_User" && (
        <p className="text-red-500 text-xs italic">
          {"⚠️ user not found :( try registering"}
        </p>
      )}
      {failStatus == "Wrong_Password" && (
        <p className="text-red-500 text-xs italic">{"⚠️ Wrong Password :/"}</p>
      )}
    </div>
  );
}

export default LoginInput;
