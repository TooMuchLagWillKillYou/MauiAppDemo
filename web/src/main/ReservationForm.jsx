import React from "react";
import { Stack } from "@mui/joy";
import FormInput from "./components/FormInput";

export default function ReservationForm(props) {
  const { reservation, validationErrors, handleChange } = props;
  console.log("component's error: ", validationErrors);
  return (
    <>
      <FormInput
        label="Nome"
        name="name"
        onChange={handleChange}
        errorMessage={validationErrors.Name}
        defaultValue={reservation.name}
      />
      <FormInput
        label="Ora"
        name="hour"
        type="time"
        onChange={handleChange}
        errorMessage={validationErrors.Hour}
        defaultValue={reservation.hour}
      />
      <FormInput
        label="Persone"
        name="people"
        type="number"
        onChange={handleChange}
        errorMessage={validationErrors.People}
        sx={{
          width: 85,
        }}
        slotProps={{
          input: {
            min: 1,
            step: 1,
          },
        }}
        defaultValue={reservation.people}
      />
      <FormInput
        label="Tavolo"
        name="table"
        onChange={handleChange}
        errorMessage={validationErrors.Table}
        sx={{
          width: 85,
        }}
        defaultValue={reservation.table}
      />
      <FormInput
        label="Note"
        name="notes"
        onChange={handleChange}
        errorMessage={validationErrors.Notes}
        sx={{ flexGrow: 1 }}
        defaultValue={reservation.notes}
      />
    </>
  );
}
