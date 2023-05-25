import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { post } from "../services/dataService";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const EditCarModal = ({ originalCar, closeModal }) => {
  const { family } = useContext(LoadingContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [car, setCar] = useState({
    make: originalCar.make,
    model: originalCar.model,
    color: originalCar.color,
    year: originalCar.year,
  });

  const carColors = [
    "Black",
    "White",
    "Gray",
    "Silver",
    "Blue",
    "Red",
    "Other",
  ];

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await post(`/cars/delete/${originalCar._id}`)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

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
      console.log("CAR:", car);
      const updatedCar = await post(`/cars/update/${originalCar._id}`, car);
      console.log("new car: ", updatedCar);
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
            <Typography variant='h5'>Edit Car</Typography>
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
            <select
              name='color'
              id='color'
              defaultValue={originalCar.color}
              onChange={handleChange}
            >
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
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={closeModal}>Close</button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default EditCarModal;
