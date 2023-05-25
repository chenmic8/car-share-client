import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { useState } from "react";
import EditLocationModal from "./EditLocationModal";

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

const LocationCard = ({ location }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked!!");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h6' component='div'>
              {location.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {location.address}
            </Typography>
            {/* <Typography variant='body2'>{}</Typography> */}
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
          <EditLocationModal
            originalLocation={location}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default LocationCard;
