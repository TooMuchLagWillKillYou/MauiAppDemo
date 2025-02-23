import React, { useState } from "react";
import Pagination from "../shared/Pagination.jsx";
import AddReservation from "../reservation/AddReservation.jsx";
import ReservationsDataGrid from "../reservation/ReservationsDataGrid.jsx";
import { Box, Typography } from "@mui/joy";
import dayjs from "dayjs";

export default function Reservations() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  return (
    <React.Fragment>
      <Box sx={{ mb: 1 }}>
        <Typography level="h2" component="h1">
          Prenotazioni
        </Typography>
      </Box>
      <Pagination
        currentDate={currentDate}
        onChange={(daysToAdd) =>
          setCurrentDate(currentDate.add(daysToAdd, "days"))
        }
        setCurrentDate={setCurrentDate}
      />
      <AddReservation currentDate={currentDate} />
      <ReservationsDataGrid currentDate={currentDate} />
    </React.Fragment>
  );
}
