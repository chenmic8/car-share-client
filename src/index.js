import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/authContext";
import { LoadingProvider } from "./context/loadingContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

// import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that accesses the theme
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='287469780305-pp6nvpk6g3vgua17t1dkulfsg1g3bruf.apps.googleusercontent.com'>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LoadingProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LoadingProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
