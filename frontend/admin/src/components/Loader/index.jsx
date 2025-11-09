const Loader = ({ size = 40 }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className="animate-spin rounded-full border-4 border-black border-t-transparent"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
