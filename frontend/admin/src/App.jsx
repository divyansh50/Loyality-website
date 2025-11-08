import { Suspense,lazy } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/index';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './pages/layout';
import UserPoints from './pages/UserPoints';
import RedeemItems from './pages/RedeemItems/';
function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading…</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<Layout/>}>
                    <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-points"
                    element={
                        <ProtectedRoute>
                            <UserPoints />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/redeem"
                    element={
                        <ProtectedRoute>
                            <RedeemItems />
                        </ProtectedRoute>
                    }
                />
                </Route>

                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App  
