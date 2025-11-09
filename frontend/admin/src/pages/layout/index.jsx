import { Outlet, NavLink } from "react-router-dom";
import { getLocalState } from "../../util/local.helpers";

const TabButton = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-medium transition-all",
        "hover:scale-[1.02] active:scale-100",
        isActive
          ? "bg-black text-white shadow-lg shadow-black/10 ring-1 ring-black/10"
          : "text-gray-600 hover:bg-gray-100"
      ].join(" ")
    }
  >
    <span className="text-lg leading-none">{icon}</span>
    <span className="leading-none">{label}</span>
  </NavLink>
);

export default function Layout() {
  const userData = getLocalState("user");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-black/10 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-md px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold capitalize text-gray-900 tracking-tight">
                Hi, {userData?.name}
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                Manage dashboard, user points & rewards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                Online
              </span>
              <div className="h-9 w-9 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 ring-1 ring-inset ring-white/60 grid place-items-center text-sm font-bold text-gray-700">
                {userData?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-md p-4">
        <div className="h-full">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-10 border-t border-transparent">
        <div className="mx-auto max-w-md p-3 pb-[calc(env(safe-area-inset-bottom,0)+12px)]">
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/90 backdrop-blur ring-1 ring-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
            <TabButton to="/" label="Dashboard" icon="📊" />
            <TabButton to="/user-points" label="User Points" icon="🎯" />
            <TabButton to="/redeem" label="Redeem" icon="🎁" />
          </div>
        </div>
      </nav>
    </div>
  );
}
