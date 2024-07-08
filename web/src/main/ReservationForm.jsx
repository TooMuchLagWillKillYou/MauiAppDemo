import React from "react";
import FormInput from "./components/FormInput";

export default function ReservationForm(props) {
  const { reservation, validationErrors, handleChange } = props;
  console.log("component's error: ", validationErrors);
  return (
    <>
      <FormInput
        label="Nome"
        name="Name"
        onChange={handleChange}
        errorMessage={validationErrors.Name}
        defaultValue={reservation.name}
      />
      <FormInput
        label="Ora"
        name="Hour"
        type="time"
        onChange={handleChange}
        errorMessage={validationErrors.Hour}
        defaultValue={reservation.hour}
      />
      <FormInput
        label="Persone"
        name="People"
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
        name="Table"
        onChange={handleChange}
        errorMessage={validationErrors.Table}
        sx={{
          width: 85,
        }}
        defaultValue={reservation.table}
      />
      <FormInput
        label="Note"
        name="Notes"
        onChange={handleChange}
        errorMessage={validationErrors.Notes}
        sx={{ flexGrow: 1 }}
        defaultValue={reservation.notes}
      />
    </>
  );
}
