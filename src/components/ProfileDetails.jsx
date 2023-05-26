import { Button, Typography, Box, Stack } from "@mui/material";
import EditProfilePicture from "./EditProfilePicture";

// const useStyles = makeStyles((theme) => ({
//   avatar: {
//     width: theme.spacing(10),
//     height: theme.spacing(10),
//   },
// }));

const ProfileDetails = ({ user }) => {
  //   const classes = useStyles();

  const { profilePic, firstName, lastName, email, birthdate, phone, role } =
    user;

  return (
    <>
      <Box spacing={2} alignItems='center'>
        <Stack>
          <Box>
            <div className='avatar'>
              <img src={profilePic} alt={`${firstName}`} />
            </div>
            {/* <EditProfilePicture user={user} /> */}
          </Box>

          <Typography variant='h5'>{`${firstName} ${lastName}`}</Typography>

          <Typography variant='body1'>{email}</Typography>

          <Typography variant='body1'>{role}</Typography>

          <Typography variant='body1'>{birthdate}</Typography>

          <Typography variant='body1'>{phone}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default ProfileDetails;
