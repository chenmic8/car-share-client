import { Box, Typography, Button, Modal } from "@mui/material";

import EventCard from "../components/EventCard";
import { useContext, useState } from "react";
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {!dataIsLoading ? (
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
      )}
    </>

    //FOR SEVEN COLUMNS, ONE FOR EACH DAY OF THE WEEK!!!!!!!!!!!!!!!!!!!!!!!
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={12 / 7}>
    //       {/* <Item>Sunday</Item> */}
    //       <Box sx={{ height: "100%", background: "red" }}>
    //         <Typography>Sunday</Typography>
    //         <EventCard />
    //       </Box>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Monday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Tuesday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Wednesday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Thursday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Friday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Saturday</Typography>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default Events;
