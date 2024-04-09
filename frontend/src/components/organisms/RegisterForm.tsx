import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../molecules/LoginInput";
import FormTwoButtons from "../atoms/FormTwoButtons";
import { registerUser } from "../../services/UserService";
import { AxiosError } from "axios";
import { UserLogin } from "../../model";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const nav = useNavigate();
  const [failStatus, setFailStatus] = useState<null | string>(null);
  const handleSubmit = (values: UserLogin) => {
    registerUser(values)
      .then(() => {
        setFailStatus(null);
        nav("/login");
      })
      .catch((e: AxiosError) => {
        if (e.response?.data) setFailStatus(String(e.response?.data));
        else
          setFailStatus(
            "Something went wrong, please contact the administrator."
          );
      });
  };
  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <LoginInput failStatus={failStatus} />
          <FormTwoButtons
            linkButtonURL="/login"
            linkButtonText="Login"
            submitButtonText="Sign Up"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterForm;
