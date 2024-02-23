import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { get } from 'react-hook-form';

export const userLogin=createAsyncThunk('loginuser',async(userCredentials,thunkApi)=>{
    let response=await axios.post('/users/login',userCredentials);
    let data=response.data;
    if(data.message==="Success"){
        let duration=(+data.expiry);
        console.log("duration ",duration);
        let expiry=new Date().getTime()+duration;
        console.log(expiry);
        let token={ticket:data.payload,userdetails:userCredentials,expiry:expiry};
        console.log(token);
        localStorage.setItem('token',JSON.stringify(token));
        
        return data.userObject;
    }
    else if(data.message==="Invalid user" || data.message==="Incorrect password"){
        return thunkApi.rejectWithValue(data);
    }
})

export const saveToDo=createAsyncThunk('updatelist',async(todolist,thunkApi)=>{
    let tokendetails=localStorage.getItem('token');
    let token=JSON.parse(tokendetails);
    const curtime=new Date().getTime();
    if(curtime<token.expiry){
        let response=await axios.put('/users/update',todolist);
        let data=response.data;
        if(data.message==="Data updated successfully"){
            alert('Data updated successfully');
            return;
        }
        else 
        return thunkApi.rejectWithValue(data);
    }
    else{
        alert("Session expired please login to continue");
        return;
    }
})

export const refreshPage=createAsyncThunk('pagerefesh',async(userCredentials,thunkApi)=>{
    let token=localStorage.getItem('token');
    let details=JSON.parse(token);
    userCredentials={...userCredentials,headers:{Authorization:" Bearer Token"+details.ticket}}
    let response=axios.post('/users/page-refresh',userCredentials);
    console.log(response);
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
        clearLogin:(state)=>{
            localStorage.clear();
            state.isSuccess=false;
            state.isLoading=false;
            state.isError=false;
            state.userObj=null;
            state.errorMsg="";
            return state;
        },
        addTodo:(state,action)=>{
            state.userObj.tasklist.push(action.payload);
            return state;
        },
        deleteToDo:(state,action)=>{
            state.userObj.tasklist=action.payload;
            return state;
        },
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
            return state;
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

export const {clearLogin,addTodo,deleteToDo}=userSlice.actions 
export default userSlice.reducer;