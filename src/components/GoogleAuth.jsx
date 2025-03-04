import React,{} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
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
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.error('Google login failed')}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
