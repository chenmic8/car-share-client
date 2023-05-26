import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import LocationCard from "../components/LocationCard";
import { Typography, Button, Box, Modal } from "@mui/material";
import AddLocationModal from "../components/AddLocationModal";
import Mapbox from "../components/Mapbox";
// import AddLocation from "../components/AddLocation";
import axios from "axios";
import { post } from "../services/dataService";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGluYWNrIiwiYSI6ImNsaTQ0cTRyYjA2OGkzcXBodHBwNXVtNjkifQ.QVI0-fNiKsyDp6XSp80alQ";

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
  const { familyLocations, viewport, user } = useContext(LoadingContext);

  const reverseGeocode = async () => {
    try {
      const config = { headers: { access_token: MAPBOX_TOKEN } };
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${viewport.longitude},${viewport.latitude}.json?access_token=${MAPBOX_TOKEN}`
      );
      // console.log("RESPONSE FROM REVERSE GEOCODE", response.data);
      // console.log("TEXT", response.data.features[0].text);
      // console.log("address", response.data.features[0].properties.address);
      // console.log("place formatted", response.data.features[1].place_name);
      // console.log(
      //   "longitude",
      //   response.data.features[1].geometry.coordinates[0]
      // );
      // console.log(
      //   "latitude",
      //   response.data.features[1].geometry.coordinates[1]
      // );
      const newLocation = await post(`/locations/create/${user._id}`, {
        type: "other",
        name: response.data.features[0].text,
        address: response.data.features[0].properties.address,
        placeFormatted: response.data.features[1].place_name,
        coordinates: {
          longitude: response.data.features[1].geometry.coordinates[0],
          latitude: response.data.features[1].geometry.coordinates[1],
        },
      });
      console.log("new location: ", newLocation);
      window.location.reload(true)
      // console.log(response.data.features[0].plac)
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {familyLocations ? (
        <>
          <Typography variant='h5'>Locations</Typography>
          <Button onClick={handleOpen}>Manually Add Location</Button>
          {familyLocations.map((location) => {
            return (
              <LocationCard
                key={location._id}
                location={location}
                closeModal={handleClose}
              />
            );
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
          <Button onClick={reverseGeocode}>Add Mapped Location</Button>
          <Mapbox />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Locations;
