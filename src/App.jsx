import "./App.css";
import { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Bars } from "react-loader-spinner";
import { Flip, ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpForm from "./pages/SignUpForm";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./features/auth/AuthSlice";
import { getProducts } from "./features/product/ProductSlice";
import { use } from "react";
import { getUser } from "./features/auth/UserSlice";
const AuthForm = lazy(() => import("./pages/AuthForm"));
const ProductDetail = lazy(()=>import("./components/products/ProductDetail"))
const Account = lazy(()=>import("./pages/Account"))

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // authenticate
  const token = localStorage.getItem("access_token");
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now(); // Check if token is expired
    } catch (error) {
      console.error("Token decoding error:", error);
      return false; // Invalid token
    }
  };

  useEffect(() => {
    if (!isTokenValid(token)) {
      dispatch(logoutUser()); // Logout user
      navigate("/"); // Redirect to home/login page
    }
  }, []); // Run only once on mount


  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);


  useEffect(() => {
    if (!isTokenValid(token)) {

    }else{
      dispatch(getUser())
    }
  },[])

  
  return (
    <>
      <NavBar />
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
          <>
          <Route
              path="account"
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
                  <Account />
                </Suspense>
              }
            />
          </>
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
