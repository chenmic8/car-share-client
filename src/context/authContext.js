import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { LoadingContext } from "./loadingContext";
import { get } from "../services/authService";

import { googleLogout } from "@react-oauth/google";

// import { GoogleAuthProvider } from "firebase/auth";

// const GoogleAuthenticationProvider = new GoogleAuthProvider();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    setIsLoading,
    setUser,
    user,
    isLoadingUser,
    setIsLoadingUser
    // setErrorMessage,
    // setFamily,
    // setFamilyCars,
    // setFamilyUsers,
    // setFamilySnapshots,
    // setFamilyEvents,
    // setFamilyLocations,
  } = useContext(LoadingContext);

  const navigate = useNavigate();
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post("http://localhost:4000/auth/google", {
          // http://localhost:4000/auth/google backend that will exchange the code
          code,
        });
        console.log("TOKENS", tokens);
        const { accessToken, user, authToken } = tokens.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authToken", authToken);

        setUser(user);
        setIsLoading(false);

        // const familyDataPromise = await get(
        //   `/families/user-family-info/${user._id}`
        // );
        // setFamily(familyDataPromise.data.family);
        // setFamilyCars(familyDataPromise.data.family.cars);
        // setFamilyUsers(familyDataPromise.data.family.users);
        // setFamilySnapshots(familyDataPromise.data.snapshots);
        // setFamilyEvents(familyDataPromise.data.snapshots.events);
        // setFamilyLocations(familyDataPromise.data.locations);

        navigate("/events");
      } catch (error) {
        console.log("response", error);
        navigate("/events");
      }
    },
    onError: (err) => {
      console.log("login failed", err);
      navigate("/");
    },
    flow: "auth-code",
  });

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");

    // setIsLoading(true);

    if (token) {
      //check token validity
      get("/auth/verify")
        .then((results) => {
          console.log("Are we logged in?", results.data);
          setIsLoading(false)
          setUser(results.data);
        })
        .catch((err) => {
          localStorage.clear();
          setIsLoading(false);
          setUser(null)
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
          // setUser(null)
          // console.log("This is the user", user)
          // console.log("LINee 38 message", message)
        });
        
    } else {
      console.log('clearing tokens')
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    console.log("we've logged out");
    setUser(null);
    googleLogout();
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  },[]);

  return (
    <AuthContext.Provider
      value={{ googleSignup, authenticateUser, logout, storeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
