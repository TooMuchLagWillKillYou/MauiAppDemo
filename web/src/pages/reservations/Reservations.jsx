import React, { useState } from "react";
import Pagination from "./Pagination.jsx";
import ReservationForm from "./ReservationForm.jsx";
import ReservationsDataGrid from "./ReservationsDataGrid.jsx";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function Reservations() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  return (
    <React.Fragment>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h3">Prenotazioni</Typography>
      </Box>
      <Pagination
        currentDate={currentDate}
        onChange={(daysToAdd) =>
          setCurrentDate(currentDate.add(daysToAdd, "days"))
        }
        setCurrentDate={setCurrentDate}
      />
      <ReservationForm currentDate={currentDate} />
      <ReservationsDataGrid currentDate={currentDate} />
    </React.Fragment>
  );
}
