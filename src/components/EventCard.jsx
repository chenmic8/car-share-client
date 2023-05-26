import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { useState } from "react";
import EditEventModal from "./EditEventModal";

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

const EventCard = ({ event }) => {
  const formatDate = (date) => {};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log('EVENT: ')
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log("CLICKED!THIS IS THIS EVENT'S ID", event);
  // };
  const formatAMPM = (date) => {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + ampm;
    return strTime;
  };

  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h6' component='div'>
              {event.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {formatAMPM(event.beginTime)} - {formatAMPM(event.endTime)}
            </Typography>
            <Typography>{event.driver.firstName}</Typography>
            <Typography>
              {event.car.make} {event.car.model}
            </Typography>
            {event.endLocation && (
              <Typography variant='body2'>{event.endLocation.name}</Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <EditEventModal event={event} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default EventCard;
