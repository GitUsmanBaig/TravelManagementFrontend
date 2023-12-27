import useFeedback from "../Hooks/useFeedback";
import useResponse from "../Hooks/useResponse";
import { useState } from "react";
import {
  CssBaseline,
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
} from "@mui/material";
import { toast } from "react-toastify";

const Feedback = () => {
  const { isLoading, error, data: feedbackData } = useFeedback();
  const mutation = useResponse();

  const [open, setOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [response, setResponse] = useState("");

  const handleSubmit = item => {
    setCurrentFeedback(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    try {
      const feedbackId = currentFeedback._id;
      const reqBody = { feedbackId, response };
      const result = await mutation.mutateAsync(reqBody);
      console.log(result);
      setOpen(false);

      toast.success("Response Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      window.location.href = "/travel-agency/feedback";
    } catch (error) {
      console.log(error);
      toast.error("Error: Please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CssBaseline />
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            Could not fetch booking data
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ mx: 3, my: 3 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="div" gutterBottom align="center">
          Travel Agency Feedback
        </Typography>
      </Box>
      {feedbackData.map(item => (
        <Box key={item._id}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle" component="div" gutterBottom>
              {item.feedback}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(item)}
              disabled={item.responded}
            >
              Respond
            </Button>
          </Box>
          <hr />
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Respond to Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Response"
            type="text"
            fullWidth
            value={response}
            onChange={e => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feedback;
