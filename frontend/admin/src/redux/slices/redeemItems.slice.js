import { createSlice } from "@reduxjs/toolkit"
import { createRedeemItems, removeRedeemItems, getRedeemItems } from "../thunk/redeemItems.thunk"

const initialState={
    data:[],
    success:false,
    loading:false,
    error:false,
    addRedeemItems:{
        data:null,
        success:false,
        error:false,
        loading:false
    },
    deleteRedeemItems:{
        success:false,
        error:false,
        loading:false
    }
}

const redeemItemsSlice=createSlice({
    name:'redeemItems',
    initialState,
    reducers:{
        setRedeemItemsData:(state,action)=>{
           state.data.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getRedeemItems.pending,(state)=>{
            state.loading=true;
            state.success=false;
            state.error=false;
        })
        .addCase(getRedeemItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.data=action.payload;
        })
        .addCase(getRedeemItems.rejected,(state)=>{
            state.loading=false;
            state.error=true;
        })
        .addCase(createRedeemItems.pending,(state)=>{
            state.addRedeemItems.loading=true;
            state.addRedeemItems.success=false;
            state.addRedeemItems.error=false;
        })
        .addCase(createRedeemItems.fulfilled,(state,action)=>{
            state.addRedeemItems.loading=false;
            state.addRedeemItems.success=true;
            state.addRedeemItems.data=action.payload;
        })
        .addCase(createRedeemItems.rejected,(state)=>{
            state.addRedeemItems.loading=false;
            state.addRedeemItems.error=true;
        })
        .addCase(removeRedeemItems.pending,(state)=>{
            state.deleteRedeemItems.loading=true;
            state.deleteRedeemItems.success=false;
            state.deleteRedeemItems.error=false;
        })
        .addCase(removeRedeemItems.fulfilled,(state,action)=>{
            state.deleteRedeemItems.loading=false;
            state.deleteRedeemItems.success=true;
            state.deleteRedeemItems.data=action.payload;
        })
        .addCase(removeRedeemItems.rejected,(state)=>{
            state.deleteRedeemItems.loading=false;
            state.deleteRedeemItems.error=true;
        })
    }
})

export default redeemItemsSlice.reducer;
export const {setRedeemItemsData}=redeemItemsSlice.actions;