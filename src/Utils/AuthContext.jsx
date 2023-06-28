import React, { createContext, useState, useEffect, useContext } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';

const AuthContext = createContext();

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Set the Appwrite API endpoint
  .setProject('6499a17e7554892c1558'); // Set your Appwrite project ID

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const account = new Account(client); // Pass the client instance to the Account class

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      console.log('accountDetails:', accountDetails)
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
  };

  // Add your authentication logic here
  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
      // Handle the authentication response and set the user state accordingly
      console.log('LOGGED IN:', response);
      const accountDetails = await account.get();
      setUser(accountDetails);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();
    if (credentials.password1 !== credentials.password2) {
      alert('Passwords did not match!');
      return;
    }
    // Add the logic to register the user using the provided credentials
    try{
            
      let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
       
      console.log('User registered!', response)

      await account.createEmailSession(credentials.email, credentials.password1)
      let accountDetails = await account.get();
      setUser(accountDetails)
      navigate('/')
  }catch(error){
      console.error(error)
  }
  };

  const value = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
