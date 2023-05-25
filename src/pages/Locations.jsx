import { useContext,useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import LocationCard from "../components/LocationCard";
import { Typography, Button,Box,Modal } from "@mui/material";
import AddLocationModal from "../components/AddLocationModal";



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

const Locations = () => {
  const { familyLocations } = useContext(LoadingContext);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {familyLocations ? (
        <>
          <Typography variant="h5">Locations</Typography>
          <Button onClick={handleOpen}>Add location</Button>
          {familyLocations.map((location) => {
            return <LocationCard key={location._id} location={location} closeModal={handleClose} />;
          })}
           <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AddLocationModal closeModal={handleClose} />
        </Box>
      </Modal>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Locations;
