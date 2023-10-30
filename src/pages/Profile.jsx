import {
  TextField,
  Modal,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingContext } from "../context/loadingContext";
import { useContext, useState } from "react";
import EditProfilePicture from "../components/EditProfilePicture";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";
import Loading from "../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { user } = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {user ? (
        <>
          <Box
            sx={{
              bgcolor: "green",
              height: "100vh",
              gap: "40px",
              p: "80px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ bgcolor: "white" }}>YOUR PROFILE MY DETAILS</Box>
            <Box sx={{ bgcolor: "white" }}>
              <Stack>
                <Box>
                  <div className='avatar'>
                    <img src={user.profilePic} alt={`${user.firstName}`} />
                  </div>
                  {/* <EditProfilePicture user={user} /> */}
                </Box>

                <Typography variant='h5'>{`${user.firstName} ${user.lastName}`}</Typography>

                <Typography variant='body1'>{user.email}</Typography>
              </Stack>
            </Box>
            <Box sx={{ bgcolor: "white" }}>
              <Typography variant='body1'>{user.role}</Typography>
              {/* birthday */}
              {/* <Typography variant='body1'>{user.birthdate}</Typography> */}

              <Typography variant='body1'>{user.phone}</Typography>
            </Box>

            <Button onClick={handleOpen}>Edit User</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <EditProfile user={user} closeModal={handleClose} />
              </Box>
            </Modal>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
