// src/components/RedeemItemsTable.jsx
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { removeRedeemItems } from "../../redux/thunk/redeemItems.thunk";
import { useState } from "react";

const RedeemItemsTable = () => {
  const { data, loading,deleteRedeemItems } = useSelector((state) => state.redeemItems);
    const dispatch=useDispatch();
    const [deleteId,setDeleteId]=useState();
  if (loading) return <div className="py-10"><Loader size={30} /></div>;

  if (!loading && (!data || data.length === 0))
    return (
      <div className="text-black text-center text-lg font-semibold py-10">
        No Redeem Items Available
      </div>    
    );

  const handleDelete = (item) => {
    setDeleteId(item?.id)
    dispatch(removeRedeemItems(item?.id));
  };

  const renderAvatar = (title = "", imageUrl = "") => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={title}
          className="h-10 w-10 rounded-xl object-cover ring-1 ring-gray-200"
        />
      );
    }
    const initial = title?.trim()?.charAt(0)?.toUpperCase() || "R";
    return (
      <div className="h-10 w-10 rounded-xl grid place-items-center text-sm font-semibold text-gray-700 ring-1 ring-gray-200 bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100">
        {initial}
      </div>
    );
  };

  return (
    <div className="text-black">
      {/* Desktop/tablet view */}
      <div className="hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Cost Points</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/60">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-4 py-3">
                  {renderAvatar(item.title, item.imageUrl)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
                    {item.costPoints} pts
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-px hover:shadow-black/20 active:translate-y-0"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {renderAvatar(item.title, item.imageUrl)}
              <div className="min-w-0">
                <div className="truncate text-base font-semibold text-gray-900">
                  {item.title}
                </div>
                <div className="mt-0.5">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
                    {item.costPoints} pts
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10"
                >
                  {deleteRedeemItems?.loading&& deleteId===item?.id?<Loader size={20} color={"white"}/>:"Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedeemItemsTable;
