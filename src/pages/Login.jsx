import { useState, useContext } from "react";
import { post } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { TextField, Stack, Box, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { googleSignup } = useContext(AuthContext);
  const { storeToken } = useContext(AuthContext);
  const {
    setUser,
    user,
    getToken,
    setFamily,
    setFamilyCars,
    setFamilyUsers,
    setFamilySnapshots,
    setFamilyEvents,
    setFamilyLocations,
  } = useContext(LoadingContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //checks for if inputs are valid
    if (email.length === 0 || password.length === 0) {
      setLoginErrorMessage("Please enter your email and password");
      return;
    }
    try {
      const foundUser = await post("/auth/login", { email, password });
      console.log("FOUND USER: ", foundUser.data);
      storeToken(foundUser.data.authToken);
      setUser(foundUser.data.user);

      // const familyDataPromise = await `/families/user-family-info/${user._id}`;
      // setFamily(familyDataPromise.data.family);
      // setFamilyCars(familyDataPromise.data.family.cars);
      // setFamilyUsers(familyDataPromise.data.family.users);
      // setFamilySnapshots(familyDataPromise.data.snapshots);
      // setFamilyEvents(familyDataPromise.data.snapshots.events);
      // setFamilyLocations(familyDataPromise.data.locations);

      navigate("/events");
    } catch (error) {
      console.log(error);
      setLoginErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack justifyContent='center' alignItems='center'>
            <Typography variant='h5'>Login</Typography>
            {loginErrorMessage && <Typography>{loginErrorMessage}</Typography>}
            <TextField
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin='normal'
            />
            <TextField
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin='normal'
            />
            <Stack gap={2}>
              <Button type='submit' variant='contained' color='primary'>
                Log In
              </Button>
              <Button variant='outlined' onClick={googleSignup}>
                Google Login
              </Button>
              <Link href='/signup'>Don't have account?</Link>
            </Stack>
          </Stack>
        </form>
      </Box>
      {/* 
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button> */}
    </>
  );
};

export default Login;
