// src/components/AddRedeemItemsModal.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRedeemItems } from "../../redux/thunk/redeemItems.thunk";
// import { createRedeemItem } from "../../redux/thunk/redeemItems.thunk"; // If you have it

const AddRedeemItemsModal = ({ setOpenAddModal }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    costPoints: ""
  });
  const [errors, setErrors] = useState({});
  
  // Click outside to close
  const handleBackdropClick = (e) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      setOpenAddModal(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "costPoints" ? value.replace(/[^\d]/g, "") : value }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.costPoints) next.costPoints = "Cost Points are required.";
    if (form.costPoints && Number(form.costPoints) <= 0) next.costPoints = "Cost Points must be greater than 0.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(createRedeemItems({title:form.title,costPoints:Number(form.costPoints)}));
    setOpenAddModal(false);
  };

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg translate-y-0 rounded-3xl border border-gray-200 bg-white p-4 shadow-2xl transition sm:p-6"
        style={{
          boxShadow:
            "0 10px 25px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.6)"
        }}
      >
        {/* Accent stripe */}
        <div className="absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close button */}
        <button
          onClick={() => setOpenAddModal(false)}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:rotate-90 hover:bg-gray-200 active:scale-95"
          aria-label="Close"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5 mt-1 pr-10">
          <h3 className="text-center bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-xl font-bold text-transparent">
            Add Redeem Item
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new reward users can redeem with their points.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Free Coffee"
              value={form.title}
              onChange={onChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none ring-2 ring-transparent transition focus:border-gray-300 focus:ring-indigo-200"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="costPoints" className="mb-1.5 block text-sm font-medium text-gray-700">
              Cost Points
            </label>
            <div className="relative">
              <input
                id="costPoints"
                name="costPoints"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g., 150"
                value={form.costPoints}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pr-12 text-gray-900 placeholder:text-gray-400 outline-none ring-2 ring-transparent transition focus:border-gray-300 focus:ring-indigo-200"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500">
                pts
              </span>
            </div>
            {errors.costPoints && <p className="mt-1 text-xs text-red-600">{errors.costPoints}</p>}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenAddModal(false)}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-px hover:shadow-black/20 active:translate-y-0"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRedeemItemsModal;
