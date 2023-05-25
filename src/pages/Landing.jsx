import { Typography, Button, Container, Stack } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Landing = () => {
  const { googleSignup } = useContext(AuthContext);
  return (
    <div id='landing'>
      <Container fixed>
        <Typography variant='h3' sx={{ p: 4 }}>
          Welcome to Car Share!
        </Typography>
        <Stack
          justifyContent='center'
          alignItems='center'
          direction='row'
          spacing={3}
        >
          <Button href='/login' variant='contained'>Login</Button>
          <Button href='/signup' variant='outlined'>Sign up</Button>
        </Stack>
      </Container>
      <br />
      <Button onClick={googleSignup}>Google Login</Button>
    </div>
  );
};

export default Landing;
