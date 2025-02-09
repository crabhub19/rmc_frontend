import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resendEmail } from "../features/auth/AuthSlice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authStatus} = useSelector((state)=>state.auth);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    agree: false,
  });
  const handleOnChange = (e) => {
    const { name, type, value, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox state
    });
  };
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (userData.email == "") {
      toast.warn("Email required");
      return;
    }else if (userData.password.length < 8) {
      toast.warn("Password must not be 8 characters");
      return;
    }
    if (userData.password == userData.confirm_password) {
      const registerUserData = {
        email: userData.email,
        password: userData.password,
      };
      const data = await dispatch(registerUser(registerUserData));
      if (registerUser.fulfilled.match(data)) {
        toast.success("verify your email from gmail");
        navigate('/');
        return;
      } else if (registerUser.rejected.match(data)) {
        if (data.payload.password) {
          toast.warn(data.payload.password[1]);
          toast.warn(data.payload.password[2]);
          return;
        }else if (data.payload.email) {
          toast.error("email already exist. Try to login or check your email for verification",{
            autoClose: 13000,});
          dispatch(resendEmail({ email: userData.email }));
          return;
      }
      }
    }else{
      toast.warn("Password and Confirm Password do not match");
      return;
    }
  };
  return (
    <section className="mx-auto mt-10 w-full flex-grow mb-10 max-w-[1200px] px-5">
      <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2">
        <div className="">
          <p className="md:text-4xl text-2xl font-bold">CREATE AN ACCOUNT</p>
        </div>

        <form className="mt-6 flex flex-col">
          <label className="mt-1" htmlFor="email">
            Email Address
          </label>
          <input
            className="mt-1 border px-4 py-2"
            type="email"
            placeholder="user@mail.com"
            name="email"
            required = {true}
            onChange={handleOnChange}
          />

          <label className="mt-1" htmlFor="email">
            Password
          </label>
          <input
            className="mt-1 border px-4 py-2"
            type="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            name="password"
            minLength={8}
            required = {true}
            onChange={handleOnChange}
          />

          <label className="mt-1" htmlFor="email">
            Confirm password
          </label>
          <input
            className="mt-1 border px-4 py-2"
            type="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            minLength={8}
            required = {true}
            name="confirm_password"
            onChange={handleOnChange}
          />

          <div className="mt-2 flex justify-between">
            <div className="flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                name="agree"
                checked={userData.agree}
                onChange={handleOnChange}
              />
              <label htmlFor="checkbox">
                I have read and agree with
                <a href="#" className="text-theme">
                  {" "}
                  terms &amp; conditions
                </a>
              </label>
            </div>
          </div>
          {authStatus === "loading"?
          <button
          type="submit"
          className={`my-2 w-full bg-theme  py-2 text-white flex justify-center items-center gap-4`}
          disabled={true}
        >
          CREATING... <span className="inline-block border-white border-t-2 border-l-2 rounded-full animate-spin w-6 h-6"></span>
        </button>
          :
          <button
            type="submit"
            className={`my-2 w-full bg-theme  py-2 text-white ${
              !userData.agree
                ? "opacity-80 cursor-not-allowed"
                : "hover:bg-theme-dark"
            }`}
            disabled={!userData.agree}
            onClick={handleCreateAccount}
          >
            CREATE ACCOUNT
          </button>
          }
          
        </form>

        <p className="text-center text-gray-500">OR SIGN UP WITH</p>

        <div className="my-1 flex gap-2">
          <button className="w-1/2 bg-blue-800 py-2 text-white">
            FACEBOOK
          </button>
          <button className="w-1/2 bg-orange-500 py-2 text-white">
            GOOGLE
          </button>
        </div>

        <p className="text-center">
          Already have an account?
          <a href="login.html" className="text-theme">
            Login now
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;
