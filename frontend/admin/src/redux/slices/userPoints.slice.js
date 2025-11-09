import { createSlice } from "@reduxjs/toolkit";
import { getUserPoints, modifyUserPoints } from "../thunk/userPoints.thunk";

const initialState = {
  data: null,
  loading: false,
  success: false,
  error: false,
  pointsUpdate:{
    loading:false,
    success:false,
    error:false
  }
};

const userPointSlice = createSlice({
  name: "userPoints",
  initialState,
  reducers: {
    resetPointsState:(state)=>{
      state.success=false;
    },
    resetPointsUpdateState:(state)=>{
      state.pointsUpdate.success=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPoints.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getUserPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(getUserPoints.rejected, (state) => {
        state.loading = false;
        state.data = null;
        state.error = true;
        state.success=false;
      })
      .addCase(modifyUserPoints.pending,(state)=>{
        state.pointsUpdate.loading=true;
        state.pointsUpdate.success=false;
        state.pointsUpdate.error=false;
      })
      .addCase(modifyUserPoints.fulfilled,(state)=>{
        state.pointsUpdate.loading=false;
        state.pointsUpdate.success=true;
        state.pointsUpdate.error=false
      })
      .addCase(modifyUserPoints.rejected,(state)=>{
        state.pointsUpdate.loading=true;
        state.pointsUpdate.success=false;
        state.pointsUpdate.error=true;
      })
  },
});

export default userPointSlice.reducer;
export const {resetPointsState,resetPointsUpdateState}=userPointSlice.actions;