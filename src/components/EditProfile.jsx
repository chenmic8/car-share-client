import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { post } from "../services/dataService";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditProfile = ({ closeModal, user, formatDate }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [profileInfo, setProfileInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: user.birthdate,
    phone: user.phone,
    role: user.role,
  });

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
    if (!profileInfo.firstName || !profileInfo.lastName || !profileInfo.email) {
      setErrorMessage("Please provide the required information");
      return;
    } else if (
      profileInfo.birthdate &&
      !isOverSixteen(profileInfo.birthdate) &&
      profileInfo.role === "driver"
    ) {
      setErrorMessage("You must be over sixteen to be a driver");
      return;
    }
    try {
      console.log("this is the profile info: ", profileInfo);
      const updatedUser = await post(`/users/update/${user._id}`, profileInfo);
      console.log("updated user", updatedUser.data);
      closeModal();
      window.location.reload(false);
    } catch (error) {
      setErrorMessage("User with that email may already exist");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProfileInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setProfileInfo((prev) => {
      return { ...prev, [e.target.name]: new Date(e.target.value) };
    });
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setProfileInfo((prev) => {
      return { ...prev, [e.target.name]: Number(e.target.value) };
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <TextField
          label='First Name'
          name='firstName'
          value={profileInfo.firstName}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Last Name'
          name='lastName'
          value={profileInfo.lastName}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Email'
          name='email'
          type='email'
          value={profileInfo.email}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Birthdate'
          name='birthdate'
          type='date'
          defaultValue={formatDate(profileInfo.birthdate)}
          onChange={handleDateChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Phone'
          type='number'
          name='phone'
          value={profileInfo.phone}
          onChange={handleNumberChange}
          fullWidth
          margin='normal'
        />

        <select defaultValue={user.role} name='role' onChange={handleChange}>
          <option value='driver'>Driver</option>
          <option value='rider'>Passenger</option>
          <option value='admin'>Admin</option>
        </select>

        <Button type='submit' variant='contained' color='primary'>
          Save
        </Button>
      </form>
    </>
  );
};

export default EditProfile;
