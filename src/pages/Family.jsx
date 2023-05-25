import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import FamilyDetails from "../components/FamilyDetails";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import { post } from "../services/dataService";

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

const Family = () => {
  const { family, user, dataIsLoading } = useContext(LoadingContext);

  const [errorMessage, setErrorMessage] = useState("");

  const [newFamilyId, setNewFamilyId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeFamily = async (e) => {
    e.preventDefault();
    try {
      if (!newFamilyId || newFamilyId === family._id) {
        setErrorMessage("Please provide a new valid family code");
        return;
      }
      const changedFamily = post(`/families/join-other-family/${user._id}`, {
        newFamilyId,
      });
      console.log(changedFamily.data);
    } catch (error) {
      setErrorMessage('')
      console.log(error);
    }
  };

  return (
    <>
      {!dataIsLoading ? (
        <>
          <Button onClick={handleOpen}>Family Options</Button>
          <FamilyDetails family={family} />
          <Button onClick={handleChangeFamily}>Join Different Family</Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Stack justifyContent='center' alignItems='center'>
                <Typography variant='h5'>
                  Share this family code to add members!
                </Typography>

                <Typography>{family._id}</Typography>

                <Typography>or</Typography>
                <form>
                  <Box>
                    <Stack>
                      <TextField
                        label='New Family Code'
                        type='text'
                        value={newFamilyId}
                        onChange={(e) => setNewFamilyId(e.target.value)}
                        required
                        margin='normal'
                      />
                      <Button>Join different</Button>
                    </Stack>
                  </Box>
                </form>
                <br />
              </Stack>
            </Box>
          </Modal>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Family;
