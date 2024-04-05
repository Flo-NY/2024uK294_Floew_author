import React, { ComponentProps } from "react";
import { Field } from "formik";

function FormSingleInput(props: ComponentProps<typeof Field>) {
  const { children, ...restProps } = props;
  return (
    <div className="mb-2">
      <label
        htmlFor={props.id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {children}
      </label>
      <Field
        {...restProps}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

export default FormSingleInput;
