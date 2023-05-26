import { TextField, Modal, Box, Button } from "@mui/material";
import { LoadingContext } from "../context/loadingContext";
import { useContext, useState } from "react";
import EditProfilePicture from "../components/EditProfilePicture";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";

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
          <ProfileDetails user={user} />
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
