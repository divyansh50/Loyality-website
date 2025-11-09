import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserPoints } from "../../redux/thunk/userPoints.thunk";
import { resetPointsState, resetPointsUpdateState } from "../../redux/slices/userPoints.slice";

const SearchUserPoints = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    phone: "",
    name: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserPoints(userDetails));
    dispatch(resetPointsUpdateState());
  };

  useEffect(() => {
    dispatch(resetPointsState());
  }, [dispatch]);

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
        Search User Points
      </h2>
      <p className="mt-1 mb-4 text-center text-sm text-gray-500">
        Find an existing user by phone or create a new one if not found.
      </p>

      {/* Card */}
      <div className="rounded-3xl border border-gray-200 bg-white/90 p-5 shadow-xl backdrop-blur-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Phone */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none ring-2 ring-transparent transition focus:border-gray-300 focus:ring-indigo-200"
                name="phone"
                onChange={handleInput}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                +91
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none ring-2 ring-transparent transition focus:border-gray-300 focus:ring-indigo-200"
              name="name"
              onChange={handleInput}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-[1px] hover:shadow-black/20 active:translate-y-0"
            onClick={handleSubmit}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Search or Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchUserPoints;
