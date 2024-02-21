import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const userLogin=createAsyncThunk('loginuser',async(userCredentials,thunkApi)=>{
    console.log(userCredentials);
    let response=await axios.post('http://localhost:4000/users/login',userCredentials);
    let data=response.data;
    if(data.message==="Success"){
        let token=data.payload;
        localStorage.setItem('token',token);
        return data.userObject;
    }
    else if(data.message==="Invalid user" || data.message==="Incorrect password"){
        return thunkApi.rejectWithValue(data);
    }
})

export const userSlice=createSlice({
    name:'users',
    initialState:{
        userObj:{},
        isLoading:false,
        isSuccess:false,
        isError:false,
        errorMsg:""
    },
    reducers:{

    },
    extraReducers:(builder)=>{
       builder.addCase(userLogin.pending,(state,action)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.userObj=null;
            state.errorMsg="";
        })
        .addCase(
        userLogin.fulfilled,(state,action)=>{
            state.isSuccess=true;
            state.userObj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.errorMsg='';
        })
        .addCase(
        userLogin.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.isLoading=false;
            state.userObj=null;
            state.errorMsg=action.payload.message;
        })
    }
})

export default userSlice.reducer;