import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import CarCard from "../components/CarCard";
import { Button, Box, Modal } from "@mui/material";
import AddCarModal from "../components/AddCarModal";

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

const Cars = () => {
  const { familyCars } = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>add car</Button>

      {familyCars.map((car) => {
        return <CarCard key={car._id} car={car} />;
      })}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AddCarModal closeModal={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Cars;
