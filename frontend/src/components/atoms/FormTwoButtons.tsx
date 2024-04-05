import { Link } from "react-router-dom";

type FormTwoButtonsProps = {
  linkButtonURL: string;
  submitButtonText: string;
  linkButtonText: string;
};
function FormTwoButtons({
  linkButtonURL,
  submitButtonText,
  linkButtonText,
}: FormTwoButtonsProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {submitButtonText}
      </button>
      <Link
        to={linkButtonURL}
        className="inline-block align-baseline font-bold text-base text-blue-500 hover:text-blue-800"
      >
        {linkButtonText}
      </Link>
    </div>
  );
}

export default FormTwoButtons;
