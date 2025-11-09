import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserPoints } from "../../redux/thunk/userPoints.thunk";
import { resetPointsState, resetPointsUpdateState } from "../../redux/slices/userPoints.slice";
import Loader from "../Loader";

const PointsForm = () => {
  const { data, pointsUpdate } = useSelector((state) => state.userPoints);
  const dispatch = useDispatch();
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyUserPoints({ userId: data?.id, delta: points }));
    dispatch(resetPointsState());
  };

  useEffect(() => {
    dispatch(resetPointsUpdateState());
  }, [dispatch]);

  return (
    <div className="min-h-[50vh] bg-gradient-to-b from-white via-[#F7F8FA] to-white flex justify-center items-start sm:items-center pt-10 sm:pt-0 text-gray-800">
      <div
        className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white/90 p-6 sm:p-7 shadow-xl backdrop-blur"
        style={{
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.6)"
        }}
      >
        {/* Accent bar */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="mb-5 mt-1 text-center">
          <h2 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-xl font-bold text-transparent">
            Points for {data?.name || "User"}
          </h2>
          <p className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
            Current Balance:
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              {data?.points ?? 0}
            </span>
            <span className="text-xs font-semibold text-gray-500">pts</span>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Add / Remove Points
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter points e.g., 50 or -20"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 placeholder:text-gray-400 outline-none ring-2 ring-transparent transition focus:border-gray-300 focus:ring-indigo-200"
                onChange={(e) => {
                  setPoints(e.target.value);
                }}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-500">
                pts
              </span>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Use negative value to deduct points (e.g., <span className="font-semibold">-20</span>).
            </p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:translate-y-[-1px] hover:shadow-black/20 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!!pointsUpdate.loading}
          >
            {pointsUpdate.loading ? (
              <Loader size={20} />
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Submit
              </>
            )}
          </button>
        </form>

        {/* Subtle footer note */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
            Changes apply instantly
          </span>
        </div>
      </div>
    </div>
  );
};

export default PointsForm;
