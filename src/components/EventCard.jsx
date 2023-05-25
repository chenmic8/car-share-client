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

  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h6' component='div'>
              {event.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {event.beginTime} - {event.endTime}
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
          <EditEventModal event={event} handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
};

export default EventCard;
