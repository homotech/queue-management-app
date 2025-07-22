interface Inputprops {
  type?: string;
  name?: string;
  value: string | number;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}
const Input = ({
  type = "text",
  name,
  value = "",
  onChange,
  placeholder,
  disabled = false,
}: Inputprops) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black mb-4"
    />
  );
};
export default Input;
