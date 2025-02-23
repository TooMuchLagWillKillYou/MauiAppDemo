import React from "react";
import Pagination from "../shared/Pagination.jsx";
import AddReservation from "../reservation/AddReservation.jsx";
import ReservationsDataGrid from "../reservation/ReservationsDataGrid.jsx";

export default function Reservations({ currentDate, setCurrentDate }) {
  return (
    <React.Fragment>
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
