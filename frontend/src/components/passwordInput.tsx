import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
interface PasswordInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValue: string;
  name: string;
  placeholder?: string;
}

const PasswordInput = ({
  handleChange,
  formValue,
  name,
  placeholder,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex gap-4">
      <Input
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={handleChange}
        value={formValue}
        placeholder={placeholder || "Enter Password"}
      />
      <Button
        additionalStyles="bg-gray-700 text-gray-800 hover:bg-gray-800"
        full={false}
        type="button"
        onClick={handleShowPassword}
      >
        {showPassword ? "Hide" : "Show"}
      </Button>
    </div>
  );
};
export default PasswordInput;
