import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
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
  const handleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex gap-4 items-end">
      <Input
        additionalStyles="mb-4 w-full"
        label="Password"
        disabled={false}
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={handleChange}
        value={formValue}
        placeholder={placeholder || "Enter Password"}
      />
      <button
        onClick={handleShowPassword}
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md mb-4"
      >
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="text-gray-600 text-lg"
          />
        ) : (
          <FontAwesomeIcon icon={faEye} className="text-gray-600 text-lg" />
        )}
      </button>
    </div>
  );
};
export default PasswordInput;
