import { createAsyncThunk } from "@reduxjs/toolkit";
import {getLocalState} from '../../util/local.helpers';
import {openErrorToaster, openSuccessToaster} from '../../util/toaster.helper';

export const getUserPoints=createAsyncThunk('admin/userPoints',async (data,{ rejectWithValue })=>{
    const token=getLocalState('token');
    const res=await fetch('http://localhost:4000/api/admin/users',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    const result = await res.json();

    if (!res.ok) {
      openErrorToaster({message:result.error})
      return rejectWithValue(result); // sends to rejected block
    }

    return result; // goes to fulfilled
})

export const modifyUserPoints = createAsyncThunk(
  "admin/modifyUserPoints",
  async (data) => {
    const token = getLocalState("token");
    const res = await fetch(
      `http://localhost:4000/api/admin/users/${data?.userId}/points`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ delta: data?.delta }),
      }
    );
    const result= res.json();
      if (!res.ok) {
      openErrorToaster({message:result.error})
      return rejectWithValue(result); // sends to rejected block
    }
    openSuccessToaster({message:'Points Modified'})
    return result; // goes to fulfilled
  }
);