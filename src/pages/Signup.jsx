import { useContext, useState } from "react";
import { post } from "../services/authService";
import { LoadingContext } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Box,
  Button,
  Typography,
  Link,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const Signup = () => {
  const { googleSignup, storeToken } = useContext(AuthContext);
  const { setUser, getToken } = useContext(LoadingContext);
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("rider");
  const [address, setAddress] = useState("");

  /**************
   *
   *  FUNCTIONS
   *
   **************/
  const isOverSixteen = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log("age: ", age);
    return age >= 16;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can perform form validation and submit the form data here
    //check if email field is there
    //check if password field is there
    if (
      !password ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !birthdate ||
      // !phone ||
      !role
      // !address
    ) {
      setSignupError("Please fill in all required fields");
      return;
    }

    //check if driver, has to be over 16
    else if (!isOverSixteen(birthdate) && role === "driver") {
      setSignupError("You must be over sixteen to be a driver");
      return;
      // }
      // //check if user already signed in with a token
      // else if (getToken().length > 0) {
      //   setSignupError("Already signed in!");
      //   // naviagte("/");
      //   return;
    } else {
      setSignupError("");
    }

    const formData = {
      firstName,
      lastName,
      email,
      password,
      birthdate,
      phone,
      role,
      // address, IMPLEMENT THIS WHEN MAPBOX IS IMPLEMENTED!!!!!!!!!!!!!!!!!!!!
    };
    console.log("FORM DATA", formData);

    try {
      console.log("made it to the try catch block");
      const createdUser = await post("/auth/signup", formData);
      console.log("CREATED NEW USER", createdUser.data);
      // setUser(newUser.data);
      storeToken(createdUser.data.authToken);
      setUser(createdUser.data.user);
      navigate("/events")
    } catch (error) {
      console.log("RESPONSE ERROR MESSAGE", error.response.data.message);
      setSignupError(error.response.data.message);
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
            <Typography variant='h5'>Sign up</Typography>
            {signupError && <Typography>{signupError}</Typography>}
            <TextField
              label='First Name'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              margin='normal'
            />
            <TextField
              label='Last Name'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              margin='normal'
            />
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
            <TextField
              label='Birthdate'
              type='date'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label='Phone Number'
              type='number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin='normal'
            />
            <InputLabel id='select-role-label'>Role</InputLabel>
            <Select
              labelId='select-role-label'
              id='role-select'
              value={role}
              label='Role'
              margin='normal'
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value='rider'>Passenger</MenuItem>
              <MenuItem value='driver'>Driver</MenuItem>
            </Select>
            <br />
            <Stack gap={2}>
              <Button type='submit' variant='contained' color='primary'>
                Sign up
              </Button>
              <Button variant='outlined' onClick={googleSignup}>
                Google Sign up
              </Button>
              <Link href='/login'>Already have account?</Link>
            </Stack>
          </Stack>
        </form>
      </Box>
      {/* <h2>google signup/login</h2>
      <button onClick={googleSignup}>signup/login with google</button>
      <h2>Sign up</h2>
      {signupError && <p>{signupError}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label>Last Name:</label>
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
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
        <br />
        <label>Birthdate:</label>
        <input
          type='date'
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <br />
        <label>Phone:</label>
        <input
          type='number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label>Are you a driver?</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='rider' defaultValue>
            Passenger
          </option>
          <option value='driver'>Driver</option>
          <option value='owner'>Car Owner</option>
          <option value='admin'>Admin</option>
        </select>

        <br />
        <label>Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <button type='submit'>Submit</button>
      </form> */}
    </>
  );
};

export default Signup;
