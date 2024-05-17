import React from "react";
import { Stack } from "@mui/joy";
import FormInput from "./components/FormInput";

export default function ReservationForm(props) {
  const { reservation, validationErrors, handleChange, horizontal } = props;

  return (
    <>
      <FormInput
        label="Nome"
        name="name"
        onChange={handleChange}
        errorMessage={validationErrors.name}
        defaultValue={reservation.name}
      />
      <FormInput
        label="Ora"
        name="hour"
        type="time"
        onChange={handleChange}
        errorMessage={validationErrors.hour}
        defaultValue={reservation.hour}
      />
      <FormInput
        label="Persone"
        name="people"
        type="number"
        onChange={handleChange}
        errorMessage={validationErrors.people}
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
        errorMessage={validationErrors.table}
        sx={{
          width: 85,
        }}
        defaultValue={reservation.table}
      />
      <FormInput
        label="Note"
        name="notes"
        onChange={handleChange}
        errorMessage={validationErrors.notes}
        sx={{ flexGrow: 1 }}
        defaultValue={reservation.notes}
      />
    </>
  );
}
