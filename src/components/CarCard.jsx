import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import EditCarModal from "./EditCarModal";

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

const CarCard = ({ car }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography variant='h6' component='div'>
              {car.make + " " + car.model}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {car.year}
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
          <EditCarModal originalCar={car} closeModal={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
