import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import { post } from "../services/dataService";
import { Stack, Box, Typography } from "@mui/material";

const AddEvent = ({ closeModal }) => {
  let today = new Date();
  let hourFromNow = new Date();
  hourFromNow.setHours(today.getHours() + 1);

  const {
    familyCars,
    familyLocations,
    familyUsers,
    family,
    user,
    setFamilyEvents,
  } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(hourFromNow);
  const [startLocation, setStartLocation] = useState(family.address._id);
  const [endLocation, setEndLocation] = useState("");
  const [driver, setDriver] = useState(user._id);
  const [riders, setRiders] = useState([]);
  const [car, setCar] = useState(familyCars[0]._id);
  const [eventFormErrorMessage, setEventFormErrorMessage] = useState("");

  const dateTimeDifferenceInMinutes = (startTime, endTime) => {
    const startMinutes = new Date(startTime).getTime();
    const endMinutes = new Date(endTime).getTime();
    return (endMinutes - startMinutes) / 1000 / 60;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !startTime ||
      !endTime ||
      !startLocation ||
      !endLocation ||
      !driver ||
      !car
    ) {
      setEventFormErrorMessage("Please provide all the required fields");
      return;
    } else if (dateTimeDifferenceInMinutes(startTime, endTime) < 0) {
      setEventFormErrorMessage("The start time has to be before the end time");
      return;
    } else {
      setEventFormErrorMessage("");
    }

    try {
      const createdEvent = await post(`/events/create/${family._id}`, {
        title,
        beginTime: startTime,
        endTime,
        startLocation,
        endLocation,
        driver,
        riders,
        car,
        distanceMeters: 1,
      });
      console.log("CREATED AN EVENT: ", createdEvent.data);
      window.location.reload(true)
      closeModal();
    } catch (error) {
      setEventFormErrorMessage("Server Error");
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Typography variant='h5'>Add Event</Typography>
            {eventFormErrorMessage && <p>{eventFormErrorMessage}</p>}
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='startTime'>Start Time:</label>
            <input
              type='datetime-local'
              id='startTime'
              name='startTime'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <br />

            <label htmlFor='endTime'>End Time:</label>
            <input
              type='datetime-local'
              id='endTime'
              name='endTime'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <br />
            <label htmlFor='startLocation'>Start Location:</label>
            <select
              name='startLocation'
              id='startLocation'
              onChange={(e) => setStartLocation(e.target.value)}
            >
              {familyLocations.map((location) => {
                return (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor='endLocation'>End Location:</label>
            <select
              name='startLocation'
              id='startLocation'
              onChange={(e) => setEndLocation(e.target.value)}
            >
              <option value=''></option>
              {familyLocations.map((location) => {
                return (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor='driver'>Driver:</label>
            <select
              name='driver'
              id='driver'
              onChange={(e) => setDriver(e.target.value)}
            >
              {familyUsers.map((driver) => {
                return (
                  <option key={driver._id} value={driver._id}>
                    {driver.firstName}
                  </option>
                );
              })}
            </select>
            <label htmlFor='riders'>Riders:</label>
            <select
              multiple
              name='riders'
              id='riders'
              onChange={(e) => setRiders(e.target.value)}
            >
              <option value=''></option>
              {familyUsers.map((rider) => {
                return (
                  <option key={rider._id} value={rider._id}>
                    {rider.firstName}
                  </option>
                );
              })}
            </select>
            <label htmlFor='car'>Car:</label>
            <select
              name='car'
              id='car'
              onChange={(e) => setCar(e.target.value)}
            >
              {familyCars.map((car, index) => {
                return (
                  <option key={car._id} value={car._id}>
                    {car.make} {car.model}
                  </option>
                );
              })}
            </select>
            <button type='submit'>Submit</button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddEvent;
