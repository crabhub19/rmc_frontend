import React,{} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSuccess = async (response) => {
        const token = response.credential;
        console.log(token);
        
        if(!token){
            console.error('No token found in the response');
        }
        try {
            const res = await dispatch(googleAuth(token))
            if(googleAuth.fulfilled.match(res)){
                console.log("successfully logged in");
                toast.success("successfully logged in");
                navigate("/");
            }else if (googleAuth.rejected.match(res)){
                toast.error("something went wrong")
            }
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="669443405108-8nctfe97fojmp2h0n1oj78024ueuhlri.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.error('Google login failed')}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
