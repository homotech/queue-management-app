interface Inputprops {
  type?: string;
  name?: string;
  value: string | number;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  label?: string;
  additionalStyles?: string;
}
const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  label,
  additionalStyles,
}: Inputprops) => {
  return (
    <div className={`${additionalStyles}`}>
      <p className="mb-2">{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400`}
      />
    </div>
  );
};
export default Input;
