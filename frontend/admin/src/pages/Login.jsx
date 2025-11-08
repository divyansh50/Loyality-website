const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl w-96 shadow-lg shadow-black/40">
        
        <div className="text-4xl font-semibold text-center text-white mb-2 tracking-wide">
          LOGIN
        </div>
        <p className="text-center text-gray-300 mb-8">
          Enter your Admin Login Details
        </p>

        <form className="space-y-6">
          <div className="text-left">
            <label className="text-gray-300">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-md outline-none border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
              placeholder="Enter username"
            />
          </div>

          <div className="text-left">
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-md outline-none border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium text-white tracking-wide"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
