const Loader = ({ size = 40, color = "black" }) => {
  const borderColor = color === "white" ? "border-white border-t-transparent" : "border-black border-t-transparent";

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`animate-spin rounded-full border-4 ${borderColor}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
