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
import { useContext, useState, useEffect } from "react";
import EditProfilePicture from "../components/EditProfilePicture";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";
import Loading from "../components/Loading";
import { get } from "../services/dataService";

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

  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formatDate = (date) => {
    if (user) {
      const bday = new Date(date);
      const year = bday.toLocaleString("default", { year: "numeric" });
      const month = bday.toLocaleString("default", { month: "2-digit" });
      const day = bday.toLocaleString("default", { day: "2-digit" });
      const formattedDate = year + "-" + month + "-" + day;
      return formattedDate;
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userinfo = await get(`/users/details/${user._id}`);
        setUserData(userinfo.data);
        console.log("user info:", userinfo.data);
      };
      fetchData().catch(console.error);
    }
  }, [user]);

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
                    <img src={user.profilePic} alt={`${userData.firstName}`} />
                  </div>
                  {/* <EditProfilePicture userData={userData} /> */}
                </Box>

                <Typography variant='h5'>{`${userData.firstName} ${userData.lastName}`}</Typography>

                <Typography variant='body1'>{userData.email}</Typography>
              </Stack>
            </Box>
            <Box sx={{ bgcolor: "white" }}>
              <Typography variant='body1'>{userData.role}</Typography>
              birthday
              <Typography variant='body1'>
                {formatDate(userData.birthdate)}
              </Typography>
              <Typography variant='body1'>{userData.phone}</Typography>
            </Box>

            <Button onClick={handleOpen}>Edit UserData</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <EditProfile
                  user={userData}
                  closeModal={handleClose}
                  formatDate={formatDate}
                />
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
