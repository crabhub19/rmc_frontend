import "./App.css";
import { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Bars } from "react-loader-spinner";
import { Flip, ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpForm from "./pages/SignUpForm";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/auth/AuthSlice";
import { getProducts } from "./features/product/ProductSlice";
const AuthForm = lazy(() => import("./pages/AuthForm"));
const ProductDetail = lazy(()=>import("./components/products/ProductDetail"))

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // authenticate
  const token = localStorage.getItem("access_token");
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token); // Decode token
      return exp * 1000 > Date.now(); // Check if token is still valid
    } catch (error) {
      return false; // Token is invalid
    }
  };
  // useEffect(() => {
  //   if (!isTokenValid(token)) {
  //     dispatch(logoutUser());
  //     navigate("/");
  //   }
  // }, [token]);

  useEffect(()=>{
    dispatch(getProducts())
  },[])
  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  
  return (
    <>
      <NavBar />
      <button onClick={() => {dispatch(logoutUser());navigate('/')}}>logout</button>
      <ToastContainer theme="dark" transition={Flip} />
      {/* <button onClick={()=>{toast.info("hello")}}>click</button> */}
      {/* routers */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="activate/:uid/:token" element={<VerifyEmail />} />
        <Route path="product_detail/:slug" element={
          <Suspense
          fallback={
            <div className="flex justify-center items-center py-48">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          }
        >
          <ProductDetail />
        </Suspense>
        } />

        {localStorage.getItem("access_token") ? (
          <></>
        ) : (
          <>
            <Route
              path="auth"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center py-48">
                      <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  }
                >
                  <AuthForm />
                </Suspense>
              }
            />
            <Route
              path="signup"
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center py-48">
                      <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  }
                >
                  <SignUpForm />
                </Suspense>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
