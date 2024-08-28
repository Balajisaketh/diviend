import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTouser } from '../redux/authReducer';
import { Mail, Lock, User } from 'lucide-react';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login successful", response);
    console.log(response.profileObj, "i am print");
    dispatch(addTouser(response.profileObj));
    if (response.accessToken !== "") {
      navigate('/display');
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed", error);
  };

  const clientId = '749071613731-iejh90edkvtb9ugn87n8qfpagpv7e1n5.apps.googleusercontent.com';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <User className="mx-auto h-12 w-auto text-indigo-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         
          <div className="mt-6">
           

            <div className="mt-6">
              <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                    Sign in with Google
                  </button>
                )}
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;