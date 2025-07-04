interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  full: boolean;
}
const Button = ({
  children,
  onClick,
  type = "button",
  full = true,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white rounded px-4 py-2 font-medium cursor-pointer ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
