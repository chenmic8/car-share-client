import { TextField, Button } from "@mui/material";
import { useState } from "react";

const EditProfilePicture = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          name='profilePic'
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        {/* <TextField
          label='Profile Picture'
          name='profilePic'
          value={user.profilePic}
          onChange={(e) => setProfilePicture(e.target.value)}
          fullWidth
          margin='normal'
        /> */}
        <br />
        <Button type='submit'>Update Picture</Button>
      </form>
    </>
  );
};

export default EditProfilePicture;
