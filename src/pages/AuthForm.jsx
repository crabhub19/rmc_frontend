import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';
import GoogleAuth from '../components/GoogleAuth';

export default function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authStatus } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.password.length<8){
      toast.warn("password must be 8 characters");
      return;
    }

    const data = await dispatch(loginUser(userData));
    if (loginUser.fulfilled.match(data)) {
      toast.success("successfully logged in");
      navigate("/");
    }else if (loginUser.rejected.match(data)) {
      toast.error(data.payload.non_field_errors || "something went wrong");
    }
  }
  return (
    <section className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
    <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2">
      <div className="">
        <p className="text-4xl font-bold">LOGIN</p>
        <p>Welcome back, customer!</p>
      </div>

      <form className="mt-6 flex flex-col">
        <label htmlFor="email">Email Address</label>
        <input
          className="my-1 border px-4 py-2"
          type="email"
          placeholder="youremail@domain.com"
          name='email'
          required = {true}
          onChange={handleOnChange}
        />

        <label htmlFor="email">Password</label>
        <input
          className="mt-1 border px-4 py-2"
          type="password"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          name='password'
          required = {true}
          minLength={8}
          onChange={handleOnChange}
        />
      </form>

      <div className="mt-2 flex justify-end">
        <a href="#" className="text-theme">Forgot password</a>
      </div>

      {authStatus === 'loading'?
      <button disabled className="my-3 w-full bg-theme  py-2 text-white flex justify-center items-center gap-4">
      LOGIN <span className='w-6 h-6 border-l-2 border-b-2 border-white animate-spin rounded-full'></span>
    </button>
      :
      <button onClick={handleLogin} className="my-3 w-full bg-theme hover:bg-theme-dark cursor-pointer py-2 text-white">
        LOGIN
      </button>
      }

      <p className="text-center text-gray-500">OR LOGIN WITH</p>

      <div className="my-2 gap-2 w-full">
      <GoogleAuth/>
      </div>

      <p className="text-center">
        Don`t have account?
        <a href="sign-up.html" className="text-theme">Register now</a>
      </p>
    </div>
  </section>
  )
}
