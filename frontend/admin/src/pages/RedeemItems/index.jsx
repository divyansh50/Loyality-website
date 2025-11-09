// src/pages/RedeemItems.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRedeemItems } from "../../redux/thunk/redeemItems.thunk";
import RedeemItemsTable from "../../components/RedeemItemsTable";
import AddRedeemItemsModal from "../../components/AddRedeemItemsModal";
import { setRedeemItemsData } from "../../redux/slices/redeemItems.slice";

const RedeemItems = () => {
    const dispatch = useDispatch();
    const [openAddModal, setOpenAddModal] = useState(false);
    const { addRedeemItems, deleteRedeemItems } = useSelector((state) => state.redeemItems);

    useEffect(() => {
        dispatch(getRedeemItems());
    }, [dispatch, addRedeemItems.data]);

    useEffect(() => {
        if (deleteRedeemItems.success) {
            dispatch(getRedeemItems());
        }
    }, [deleteRedeemItems.success])

    return (
        <div className="min-h-[calc(100vh-64px)] bg-linear-to-b from-white via-[#f9fafb] to-white">
            <div className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
                {/* Page header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Redeem Items
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Add rewards that users can redeem with their points.
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenAddModal(true)}
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-2.5 font-medium text-white shadow-lg shadow-black/10 transition hover:-translate-y-px hover:shadow-black/20 active:translate-y-0"
                    >
                        <svg
                            className="h-5 w-5 transition group-hover:scale-110"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add Item
                    </button>
                </div>

                {/* Card wrapper for table */}
                <div className="mt-5 rounded-2xl border border-gray-200 bg-white/70 p-3 backdrop-blur-sm sm:p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-800">All Items</h2>
                        {/* Simple legend / badge */}
                        <span className="rounded-full bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Live
                        </span>
                    </div>
                    <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
                        <RedeemItemsTable />
                    </div>
                </div>
            </div>

            {openAddModal && <AddRedeemItemsModal setOpenAddModal={setOpenAddModal} />}
        </div>
    );
};

export default RedeemItems;
