import { Navigate } from "react-router-dom";
import { getlocalState } from "../util/local.helpers";

export default function ProtectedRoute({ children }) {
    const token=getlocalState('token');

    if (!token) return <Navigate to="/login" replace />;
    return children;
}