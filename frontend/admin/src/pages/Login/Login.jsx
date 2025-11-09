import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux/thunk/auth.thunk";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [inputDetails, setInputDetails] = useState({
    phone: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(inputDetails));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex justify-center items-center px-6">

      <div className="w-full max-w-sm">

        {/* Colorful Header Card */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg text-center mb-6">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-blue-100">Login to manage your dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

          <form className="space-y-5">

            <div>
              <label className="text-gray-700 text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                onChange={handleInput}
                placeholder="Enter phone number"
                className="mt-2 w-full px-4 py-3 bg-white shadow-sm text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-3 bg-white shadow-sm text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Colorful Button */}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md active:scale-95 transition"
            >
              {loading ? <Loader size={20}/> : "Login"}
            </button>

          </form>
        </div>

        {/* Cute small colored dots (decorative like your screenshot) */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
        </div>

      </div>
    </div>
  );
};

export default Login;
