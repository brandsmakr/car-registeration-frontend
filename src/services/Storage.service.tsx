import Crypto from "./Crypto.service";

// setSession in local storage
const setSession = (token: string, user: JSON) => {
  localStorage.setItem("token", token);
  // encrypt user data before store it on the localstorage
    const userString = JSON.stringify(user);
  const enc_data = Crypto.encrypUsertData(userString);
  localStorage.setItem("user", enc_data);
};

// set access token 
const setToken = (token:string)=>{
  localStorage.setItem("token", token);
}

// update info
const updateUser = (user: JSON) => {
  // encrypt user data before store it on the localstorage
  // const userString = JSON.stringify(user);
  const enc_data = Crypto.encrypUsertData(user);
  localStorage.setItem("user", enc_data);
};

// clear session of local storage
const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const dec_user = localStorage.getItem("user");
  let user;
  if (dec_user && dec_user !== null) {
    // user = Crypto.dcryptUserData(dec_user);
    user = JSON.parse(Crypto.dcryptUserData(dec_user));
  }
  return user;
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const setUserRole = (user_role:string) => {
  if(user_role !== 'admin' && user_role !== 'user')
  {
    return 'unkonwn role';
  }
  const enc_data = Crypto.encrypUserRole(user_role);
  localStorage.setItem("user_role", enc_data);
};

const getCurrentRole:any = () => {
  const dec_user = localStorage.getItem("user_role");
  let user;
  if (dec_user && dec_user !== null) {
    user = Crypto.dcryptUserRole(dec_user);
    // user = JSON.parse(Crypto.dcryptUserData(dec_user));
  }
  return user;
};

const Storage = {
  setUserRole,
  updateUser,
  setSession,
  clearSession,
  getToken,
  getCurrentUser,
  setToken,
  getCurrentRole
};

export default Storage;
