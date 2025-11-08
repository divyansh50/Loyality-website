import { Suspense,lazy } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading…</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />

                    {/* <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute fallback={<div>Loading...</div>}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                /> */}

                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App  
