import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/AuthSlice';

export default function Account() {
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const {userData} = useSelector((state)=>state.user);
    const [sidebar,setSidebar] = useState(false)
    
  return (
    <>
    <section
        className="container mx-auto w-full flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10"
      >
        <section className={` w-[300px] flex-shrink-0 px-4`}>
          <div className="border-b py-5 hidden lg:block">
            <div className="flex items-center">
              {userData?.image_url ? (
                <img
                  className="rounded-full object-cover w-16 h-16"
                  src={userData?.image_url}
                  alt="Red woman portrait"
                />
              ) : (
                <img
                  className="rounded-full object-cover w-16 h-16"
                  src="https://media.istockphoto.com/id/922496674/photo/backlight-of-a-woman-raising-arms-with-thumbs-up.jpg?s=1024x1024&w=is&k=20&c=x2Wl155EDnmrICZ2J71u79rgY-P8t8xWGF2OF4-B_aA="
                />
              )}
              <div className="ml-5">
                <p className="font-medium text-gray-500">Hello,</p>
                <p className="font-bold">{userData?.first_name} {userData?.last_name}</p>
              </div>
            </div>
          </div>

          <div className={` w-[300px] flex-shrink-0 px-4 ${sidebar ? " fixed left-0 bg-white shadow-xl" : "hidden lg:block"} `}>

            <div className="flex border-b py-5 hover:bg-black hover:text-white hover:px-4 transition-all duration-300 ease-out cursor-pointer">
              <div className="flex w-full">
                <div className="flex flex-col gap-2">
                  <a
                    href="my-order-history.html"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>

                    My Order History</a>
                </div>
              </div>
            </div>

            <div className="flex border-b py-5 hover:bg-black hover:text-white hover:px-4 transition-all duration-300 ease-out cursor-pointer">
              <div className="flex w-full">
                <div className="flex flex-col gap-2">
                  <a
                    href="payment-methods.html"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>

                    Payment Methods</a>
                </div>
              </div>
            </div>

            <div className="flex border-b py-5 hover:bg-black hover:text-white hover:px-4 transition-all duration-300 ease-out cursor-pointer">
              <div className="flex w-full">
                <div className="flex flex-col gap-2">
                  <a
                    href="wishlist.html"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>

                    My Wishlist</a>
                </div>
              </div>
            </div>

            <div className="flex py-5 cursor-pointer hover:bg-black hover:text-white hover:px-4 transition-all duration-300 ease-out">
              <div className="flex w-full">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {dispatch(logoutUser());navigate('/')}}
                    className="flex items-center gap-2 font-medium active:text-violet-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>

                    Log Out</button>
                </div>
              </div>
            </div>
          </div>

        </section>


        <div className="mb-5 flex items-center justify-between px-5 lg:hidden">
          <div className="flex gap-3">
            <div className="py-5">
              <div className="flex items-center">
                {userData?.image_url ? (
                  <img
                    className="rounded-full object-cover w-16 h-16"
                    src={userData?.image_url}
                    alt="Red woman portrait"
                  />
                ) : (
                  <img
                    className="rounded-full object-cover w-16 h-16"
                    src="https://media.istockphoto.com/id/922496674/photo/backlight-of-a-woman-raising-arms-with-thumbs-up.jpg?s=1024x1024&w=is&k=20&c=x2Wl155EDnmrICZ2J71u79rgY-P8t8xWGF2OF4-B_aA="
                  />
                )}
                <div className="ml-5">
                  <p className="font-medium text-gray-500">Hello,</p>
                  <p className="font-bold">{userData?.first_name} {userData?.last_name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="border text-white bg-theme hover:bg-theme-light py-2 px-2" onClick={()=>setSidebar(!sidebar)}>
              Profile Info
            </button>
          </div>
        </div>

        <section
          className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 lg:grid-cols-3"
        >
          <div className="">
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="font-bold">Personal Profile</p>
                <a
                  className="text-sm text-theme"
                  href="profile-information.html"
                  >Edit</a>
              </div>

              <div className="px-4">
                <p>{userData?.first_name} {userData?.last_name}</p>
                <p>{userData?.email}</p>
                <p className="">{}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
