import { Box, Typography, Button, Modal, Grid } from "@mui/material";

import EventCard from "../components/EventCard";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import AddEvent from "../components/AddEventModal";

// import { AuthContext } from "../context/authContext";

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

const Events = () => {
  const { dataIsLoading, familyEvents } = useContext(LoadingContext);

  const [orderedDates, setOrderedDates] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //GET THE DAYS OF THIS WEEK

  //MAP THROUGH THE EVENTS AND ASSIGN THEM TO SUN-SAT ARRAYS

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const sortByTime = (data) => {
    return data.sort(function (a, b) {
      return a.beginTime.localeCompare(b.beginTime);
    });
  };

  const dates = (current) => {
    var week = new Array();
    // Starting Sunday
    current.setDate(current.getDate() - current.getDay());
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  // console.log(data)

  // console.log(datesAreOnSameDay(new Date("2023-05-25T15:11:00.000Z"),new Date("2023-05-25T15:11:00.000Z")))
  const [sunday, setSunday] = useState([]);
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  let Sunday = [];
  let Monday = [];
  let Tuesday = [];
  let Wednesday = [];
  let Thursday = [];
  let Friday = [];
  let Saturday = [];
  useEffect(() => {
    console.log(dates(new Date()));
    const thisWeek = dates(new Date());
    familyEvents.map((event) => {
      let eventDate = new Date(event.beginTime);
      if (datesAreOnSameDay(thisWeek[0], eventDate)) Sunday.push(event);
      else if (datesAreOnSameDay(thisWeek[1], eventDate)) Monday.push(event);
      else if (datesAreOnSameDay(thisWeek[2], eventDate)) Tuesday.push(event);
      else if (datesAreOnSameDay(thisWeek[3], eventDate)) Wednesday.push(event);
      else if (datesAreOnSameDay(thisWeek[4], eventDate)) Thursday.push(event);
      else if (datesAreOnSameDay(thisWeek[5], eventDate)) Friday.push(event);
      else if (datesAreOnSameDay(thisWeek[6], eventDate)) Saturday.push(event);
    });
    console.log(
      "Sunday",
      Sunday,
      "\n\n\nMonday",
      Monday,
      "\n\n\nTuesday",
      Tuesday,
      "\n\n\nThursday",
      Thursday,
      "\n\n\nFriday",
      Friday,
      "\n\n\nSaturday",
      Saturday
    );

    //SORT BY TIME
    Sunday = sortByTime(Sunday);
    Monday = sortByTime(Monday);
    Tuesday = sortByTime(Tuesday);
    Wednesday = sortByTime(Wednesday);
    Thursday = sortByTime(Thursday);
    Friday = sortByTime(Friday);
    Saturday = sortByTime(Saturday);

    setSunday(Sunday);
    setMonday(Monday);
    setTuesday(Tuesday);
    setWednesday(Wednesday);
    setThursday(Thursday);
    setFriday(Friday);
    setSaturday(Saturday);
  }, [familyEvents]);

  return (
    <>
      {/* {!dataIsLoading ? (
        <>
          <Button onClick={handleOpen}>Add Event</Button>
          <Typography>Show week</Typography>
          <Typography>Show day</Typography>

          {familyEvents.map((event) => {
            return <EventCard key={event._id} event={event} />;
          })}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <AddEvent />
            </Box>
          </Modal>
        </>
      ) : (
        <p>LOADING...</p>
      )} */}
      {/* //FOR SEVEN COLUMNS, ONE FOR EACH DAY OF THE WEEK!!!!!!!!!!!!!!!!!!!!!!! */}
      {!dataIsLoading && familyEvents ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12 / 7}>
                {/* <Item>Sunday</Item> */}
                <Box>
                  <Typography>Sunday</Typography>
                  {sunday.map((event) => {
                    return <EventCard key={event._id} event={event} />;
                  })}
                  {/* <EventCard event={familyEvents} /> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Monday</Typography>
                {monday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Tuesday</Typography>
                {tuesday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Wednesday</Typography>
                {wednesday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Thursday</Typography>
                {thursday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Friday</Typography>
                {friday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
              <Grid item xs={12} md={12 / 7}>
                <Typography>Saturday</Typography>
                {saturday.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Events;
