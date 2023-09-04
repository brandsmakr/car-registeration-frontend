const CryptoJS = require("crypto-js");
const EncryptionKey = process.env.REACT_APP_CryptoEnSecKey;

//  encrypt log in user data
const encrypUsertData = (user: any) => {
  const encryptedData = CryptoJS.AES.encrypt(user, EncryptionKey).toString();
  return encryptedData;
};

// decrypt loged in user data
const dcryptUserData = (getUser: String) => {
  const bytes = CryptoJS.AES.decrypt(getUser, EncryptionKey);
  const decryptedJsonData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedJsonData;
};


//  encrypt log in user data
const encrypUserRole = (user: string) => {
  const encryptedData = CryptoJS.AES.encrypt(user, EncryptionKey).toString();
  return encryptedData;
};

// decrypt loged in user data
const dcryptUserRole = (getRole: String) => {
  const bytes = CryptoJS.AES.decrypt(getRole, EncryptionKey);
  const decryptedJsonData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedJsonData;
};



const Crypto = {
  encrypUsertData,
  dcryptUserData,
  encrypUserRole,
  dcryptUserRole,
};

// export all functions
export default Crypto;
