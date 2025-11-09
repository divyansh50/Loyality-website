import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalState } from "../../util/local.helpers";
import {openErrorToaster,openSuccessToaster} from '../../util/toaster.helper';

export const getRedeemItems = createAsyncThunk('admin/getRedeemItems', async () => {
    const token = getLocalState('token');
    const res = await fetch('http://localhost:4000/api/admin/items', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const result=await res.json();
    return result;
});

export const createRedeemItems=createAsyncThunk('admin/createRedeemItems',async (data,{rejectWithValue})=>{
    const token=getLocalState("token")
    const res=await fetch('http://localhost:4000/api/admin/items/add',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    const result =await res.json();
    if(!res.ok){
        openErrorToaster({message:result.error||"Something wrong, try again"})
        return rejectWithValue(result)
    }
    openSuccessToaster({message:'Item Added'});
    return result;
})

export const removeRedeemItems = createAsyncThunk('admin/removeRedeemItems', async (data,{rejectWithValue}) => {
    const token = getLocalState('token');
    const res = await fetch(`http://localhost:4000/api/admin/items/${data}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const result=await res.json();
    if(!res.ok){
        openErrorToaster({message:result.error||'Try Again'});
        return rejectWithValue(result);
    }
    openSuccessToaster({message:"Item Deleted"})
    return result;
});