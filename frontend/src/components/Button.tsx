interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  full: boolean;
  additionalStyles?: string;
}
const Button = ({
  children,
  onClick,
  type = "button",
  full = true,
  additionalStyles,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white rounded px-4 py-2 font-medium cursor-pointer mb-4 ${
        full ? "w-full" : ""
      } ${additionalStyles}`}
    >
      {children}
    </button>
  );
};
export default Button;
