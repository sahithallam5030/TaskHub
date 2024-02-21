import React from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { userLogin } from '../../slices/userSlice';

function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm();
  const dispatch=useDispatch();
  const onFormSubmit=(userdata)=>{
    console.log(userdata);
    dispatch(userLogin(userdata));
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" {...register('username',{required:true})}/>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" {...register('password',{required:true})}/>
          <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
