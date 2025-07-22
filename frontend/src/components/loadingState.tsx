const LoadingState = ({ mode = true, additionalStyles = "" }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        additionalStyles || "min-h-screen"
      }`}
    >
      <div
        className={`w-10 h-10 border-4 border-t-transparent ${
          mode ? "border-black" : "border-white"
        } rounded-full animate-spin`}
      />
    </div>
  );
};
export default LoadingState;
