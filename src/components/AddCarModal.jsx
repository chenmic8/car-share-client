import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { post } from "../services/dataService";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const AddCarModal = ({ closeModal }) => {
  const carColors = [
    "Black",
    "White",
    "Gray",
    "Silver",
    "Blue",
    "Red",
    "Other",
  ];

  const { family } = useContext(LoadingContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [car, setCar] = useState({
    make: "",
    model: "",
    color: "Gray",
    year: 2023,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCar((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!car.make || !car.model) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      const newCar = await post(`/cars/create/${family._id}`, car);
      console.log("new car: ", newCar);
      window.location.reload(true)
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Typography variant='h5'>Add Car</Typography>
            {errorMessage && <p>{errorMessage}</p>}
            <label htmlFor='make'>Make:</label>
            <input
              type='text'
              id='make'
              name='make'
              value={car.make}
              onChange={handleChange}
            />
            <label htmlFor='model'>Model:</label>
            <input
              type='text'
              id='model'
              name='model'
              value={car.model}
              onChange={handleChange}
            />
            <br />

            <label htmlFor='color'>Color:</label>
            <select name='color' id='color' onChange={handleChange}>
              {carColors.map((color, i) => {
                return (
                  <option key={i} value={color}>
                    {color}
                  </option>
                );
              })}
            </select>
            <br />
            <label htmlFor='year'>Year:</label>
            <input
              type='number'
              id='year'
              name='year'
              value={car.year}
              onChange={handleChange}
            />

            <button type='submit'>Submit</button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddCarModal;
