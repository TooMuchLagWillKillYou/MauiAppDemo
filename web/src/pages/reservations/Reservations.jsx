import React, { useState } from "react";
import Pagination from "./Pagination.jsx";
import ReservationForm from "./ReservationForm.jsx";
import ReservationsDataGrid from "./ReservationsDataGrid.jsx";
import dayjs from "dayjs";
import PageTitle from "../../shared/PageTitle.jsx";

export default function Reservations() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  return (
    <React.Fragment>
      <PageTitle text="Prenotazioni" />
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
