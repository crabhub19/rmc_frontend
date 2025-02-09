import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../features/auth/AuthSlice";
import { MailOpen } from "lucide-react";
import { toast } from "react-toastify";
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authStatus } = useSelector((state) => state.auth);
  const { uid, token } = useParams();
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    console.log(uid, token);

    const data = await dispatch(verifyEmail({ uid, token }));
    if (verifyEmail.fulfilled.match(data)) {
      toast.success("successfully created an account");
      navigate("/auth");
    }else if (verifyEmail.rejected.match(data)) {
      toast.error(data.payload.detail || data.payload.uid || data.payload.token || "something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
      <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 className="text-2xl">Thanks for signing up for RMC!</h3>
        <div className="flex justify-center">
          <MailOpen size={150} color="#008000" />
        </div>

        <p>We're happy you're here. Let's get your email address verified:</p>
        <div className="mt-4 flex justify-center items-center">
          {authStatus === "loading" ? (
            <button
              disabled = {true}
              className="px-2 py-2 text-white bg-theme rounded flex justify-center items-center gap-4"
            >
              verifying... <span className="inline-block bg-white rounded-lg animate-spin w-6 h-6"></span>
            </button>
          ) : (
            <button
              onClick={handleVerifyEmail}
              className="px-2 py-2 text-white bg-theme hover:bg-theme-dark hover:scale-105 rounded"
            >
              Click to Verify Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
