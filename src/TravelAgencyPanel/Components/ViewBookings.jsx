import useBookings from "../Hooks/useBookings";
import {
  CssBaseline,
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ViewBookings = () => {
  const { isLoading, error, data } = useBookings();

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
      <Typography variant="h4" component="div" gutterBottom align="center">
        View Bookings
      </Typography>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        color="primary"
        align="center"
      >
        Revenue:{" "}
        {data.reduce(
          (total, bookings) =>
            total +
            bookings.reduce((total, booking) => total + booking.totalAmount, 0),
          0
        )}
      </Typography>
      {data.map((bookings, index) => (
        <Box key={index} sx={{ mt: 4 }}>
          {bookings.length > 0 && (
            <Box sx={{ m: 2 }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                color="primary"
              >
                {bookings[0].packageId.name}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Booking ID</TableCell>
                      <TableCell>Customer ID</TableCell>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>No of Persons</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking, bookingIndex) => (
                      <TableRow key={bookingIndex}>
                        <TableCell>{booking._id}</TableCell>
                        <TableCell>{booking.customerId}</TableCell>
                        <TableCell>{booking.bookingDate}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{booking.noOfPersons}</TableCell>
                        <TableCell>{booking.totalAmount}</TableCell>
                        <TableCell>{booking.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                color="secondary"
              >
                Total Amount:{" "}
                {bookings.reduce(
                  (total, booking) => total + booking.totalAmount,
                  0
                )}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ViewBookings;
