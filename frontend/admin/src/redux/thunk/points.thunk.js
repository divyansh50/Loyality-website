import { createAsyncThunk } from "@reduxjs/toolkit";
import {getLocalState} from '../../util/local.helpers';

export const getUserPoints=createAsyncThunk('admin/userPoints',async (data)=>{
    const token=getLocalState('token');
    const res=await fetch('http://localhost:4000/api/admin/login',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    return res.json();
})