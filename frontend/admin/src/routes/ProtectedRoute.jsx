import { Navigate } from "react-router-dom";
import { getLocalState } from "../util/local.helpers";

export default function ProtectedRoute({ children }) {
    const token=getLocalState('token');

    if (!token) return <Navigate to="/login" replace />;
    return children;
}