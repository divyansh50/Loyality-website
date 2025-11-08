import { useState } from "react";

const SearchUserPoints = () => {
    const [userDetails, setUserDetails] = useState({
        phone: "",
        name: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails, [name]: value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("userDetails",userDetails)
    }
    return <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Search User Points</h2>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <form className="space-y-5">

                {/* Phone Input */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        className="px-4 py-2 rounded-xl border border-gray-200 bg-[#FAFAFA] focus:ring-2 focus:ring-blue-300 outline-none transition"
                        name="phone"
                        onChange={handleInput}
                    />
                </div>

                {/* Name Input */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="px-4 py-2 rounded-xl border border-gray-200 bg-[#FAFAFA] focus:ring-2 focus:ring-blue-300 outline-none transition"
                        name="name"
                        onChange={handleInput}
                    />
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={handleSubmit}
                >
                    Search or Add User
                </button>
            </form>
        </div>
    </div>
}
export default SearchUserPoints;