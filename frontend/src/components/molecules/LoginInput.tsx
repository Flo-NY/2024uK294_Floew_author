import FormSingleInput from "../atoms/FormSingleInput";

type LoginInputProps = {
  failStatus: null | string;
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
      {failStatus && (
        <p className="text-red-500 text-xs italic">{`⚠️ ${failStatus}`}</p>
      )}
    </div>
  );
}

export default LoginInput;
