import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTwoButtons from "../atoms/FormTwoButtons";
import LoginInput from "../molecules/LoginInput";
import { AxiosError } from "axios";
import { loginUser } from "../../services/UserService";
import { UserLogin } from "../../model";

function LoginForm() {
  const nav = useNavigate();
  const [failStatus, setFailStatus] = useState<null | string>(null);
  const handleSubmit = (values: UserLogin) => {
    loginUser(values)
      .then(() => {
        setFailStatus(null);
        nav("/authors");
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
            linkButtonURL="/register"
            linkButtonText="Register"
            submitButtonText="Sign In"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
