import { Outlet, NavLink } from "react-router-dom";
import { getlocalState } from "../../util/local.helpers";

const TabButton = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-medium transition-all",
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-500"
      ].join(" ")
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default function Layout() {
  const userData=getlocalState('user');
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top bar (optional) */}
      <header className="sticky top-0 z-10 border-b">
        <div className="mx-auto max-w-md px-4 py-3">
          <h1 className=" text-2xl font-bold capitalize text-black">Hi,{userData?.name}</h1>
        </div>
      </header>

      {/* Page content swaps here */}
      <main className="flex-1 mx-auto w-full max-w-md p-4">
        <Outlet />
      </main>

      {/* Persistent bottom bar */}
      <nav className="sticky bottom-0 z-10 bg-white border-t">
        <div className="mx-auto max-w-md grid grid-cols-3 p-2 bg-gray-100 rounded-t-2xl">
          <TabButton to="/" label="Dashboard" icon="📊" />
          <TabButton to="/user-points" label="User Points" icon="🎯" />
          <TabButton to="/redeem" label="Redeem" icon="🎁" />
        </div>
      </nav>
    </div>
  );
}
