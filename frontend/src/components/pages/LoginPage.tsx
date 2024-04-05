import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { UserLogin } from "../../model";
import { loginUser, tokenValid } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import FormSingleInput from "../atoms/FormSingleInput";
import LoginInput from "../molecules/LoginInput";
import FormTwoButtons from "../atoms/FormTwoButtons";
import { Login } from "@mui/icons-material";
import LoginForm from "../organisms/LoginForm";

function LoginPage() {
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
