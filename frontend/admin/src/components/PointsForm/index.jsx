import { useState } from "react";

const PointsForm = () => {
    const [points,setPoints]=useState(0);

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("userPoints are",points)
    }
  return (
    <div className="bg-[#F7F8FA] flex justify-center items-center mt-20 text-gray-800">

      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm border border-gray-100 text-center">

        {/* Username Section */}
        <h2 className="text-lg font-semibold mb-1">Points for Username</h2>
        <p className="text-3xl font-bold text-blue-600 mb-6">200</p>

        {/* Form */}
        <form className="space-y-5">

          <div className="flex flex-col text-left space-y-1">
            <label className="text-sm font-medium text-gray-600">Add / Remove Points</label>
            <input
              type="number"
              placeholder="Enter points"
              className="px-4 py-2 rounded-xl border border-gray-200 bg-[#FAFAFA] focus:ring-2 focus:ring-blue-300 outline-none transition"
              onChange={(e)=>{setPoints(e.target.value)}}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default PointsForm;
