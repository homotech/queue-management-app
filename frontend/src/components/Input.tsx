interface Inputprops {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}: Inputprops) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black mb-4"
    />
  );
};
export default Input;
