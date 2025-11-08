    import { createSlice } from "@reduxjs/toolkit";
    import { loginAdmin } from "../thunk/auth.thunk";
import { clearLocalState, setLocalState } from "../../util/local.helpers";

    const initialState={
       user:null,
       token:null,
       isAuthenticated:false,
       loading:false,
       error:null
    };
    const authSlice=createSlice({
        name:'auth',
        initialState,
        reducers:{
            logout:(state)=>{
                 state.user = null;
                state.token = null;
                state.loading = false;
                state.error = null;
                state.isAuthenticated = false;
                clearLocalState('token');
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(loginAdmin.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled,(state,action)=>{
                state.loading=false;
                if(action.payload.token){
                    state.token=action.payload.token;
                    state.user=action.payload.admin;
                    state.isAuthenticated=true;
                    setLocalState('token',action?.payload?.token);
                }
                else{
                    state.error = "Invalid login credentials";
                    state.isAuthenticated = false;
                }
            })
            .addCase(loginAdmin.rejected,(state,action)=>{
                state.loading=false;
                state.isAuthenticated=false;
                state.error=action.payload.error||'Login Failed';
            })
        }
    })

    export default authSlice.reducer;
    export const {logout}=authSlice.actions;