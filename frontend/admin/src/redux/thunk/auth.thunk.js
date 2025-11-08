import { createAsyncThunk } from "@reduxjs/toolkit";
import { openErrorToaster, openSuccessToaster } from "../../util/toaster.helper";

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async ({ phone, password }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:4000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, password })
        })
        const data = await response.json();
        if (!data?.token) {
            openErrorToaster({ message: data?.error || "Invalid login credentials" });
            return rejectWithValue({ error: data?.error || "Login Failed" });
        }
        openSuccessToaster({ message: "Login Success" });
        return data;
    }
    catch (error) {
        openErrorToaster({ message: "Something went wrong" });
        return rejectWithValue({ error: "Something went wrong" });
    }
})