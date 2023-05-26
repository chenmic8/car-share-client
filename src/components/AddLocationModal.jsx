import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { post } from "../services/dataService";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const AddLocationModal = ({ closeModal }) => {
  const [location, setLocation] = useState({
    name: "",
    address: "",
    placeFormatted: "",
    fullAddress: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  });

  const locationTypes = ["residential", "other"];

  const { user } = useContext(LoadingContext);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setLocation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !location.name ||
      !location.address ||
      !location.placeFormatted 
      // !location.fullAddress ||
      // !location.coordinates.latitude ||
      // !location.coordinates.longitude
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      const newLocation = await post(`/locations/create/${user._id}`, location);
      console.log("new location: ", newLocation);
      window.location.reload(true)
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return <Box>
  <form onSubmit={handleSubmit}>
    <Stack>
      <Typography variant='h5'>Add Location</Typography>
      {errorMessage && <p>{errorMessage}</p>}

   
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        name='name'
        value={location.name}
        onChange={handleChange}
      />
      <label htmlFor='address'>Address:</label>
      <input
        type='text'
        id='address'
        name='address'
        value={location.address}
        onChange={handleChange}
      />
      <br />

    
      <br />
      <label htmlFor='placeFormatted'>City, State, ZIP:</label>
      <input
        type='text'
        id='placeFormatted'
        name='placeFormatted'
        value={location.placeFormatted}
        onChange={handleChange}
      />

      <button type='submit'>Submit</button>
    </Stack>
  </form>
</Box>;
};

export default AddLocationModal;
