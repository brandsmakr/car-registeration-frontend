import { ApiConfig } from "../config";
import Storage from "./Storage.service";

const SignUp = (data: any) => {
  return ApiConfig.post("/auth/sign-up", data).then((res: any) => {
    return res.data;
  });
};

const SignIn = (data: any) => {
  return ApiConfig.post("/auth/sign-in", data).then((res: any) => {
    return res.data;
  });
};


const VerifyEmail = (data: any) => {
  return ApiConfig.post(`/auth/verify-email`, data).then((res: any) => {
    return res.data;
  });
};

const ResendVerificationEmail = (data: any) => {
  return ApiConfig.post("/auth/resend-verification-email", data).then((res: any) => {
    return res.data;
  });
};

const IsUserLogedIn = ()=>{
  const token = Storage.getToken();
  if(token)
  {
    return true;
  }
  return false;
}


const Logout = ()=>{
  Storage.clearSession()
}



const Auth = {
  ResendVerificationEmail,
  IsUserLogedIn,
  SignUp,
  SignIn,
  VerifyEmail,
  Logout
};

export default Auth;
