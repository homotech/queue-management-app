"use client";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  fullWidth: boolean;
  additionalStyles?: string;
  disabled?: boolean;
}
const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  additionalStyles,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-black text-white rounded px-4 py-2 font-medium cursor-pointer
        transition-colors duration-200 ease-in-out ${
          fullWidth ? "w-full" : "inline-block"
        } ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-800 active:bg-gray-900"
      }
        ${additionalStyles}`}
    >
      {children}
    </button>
  );
};
export default Button;
