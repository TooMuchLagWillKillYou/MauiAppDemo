import React from "react";
import { Grid } from "@mui/joy";
import FormInput from "./components/ReservationInput";

export default function ReservationForm(props) {
  const { reservation, validationErrors, handleChange, horizontal } = props;

  return (
    <>
      <Grid xs={3}>
        <FormInput
          label="Nome"
          name="name"
          onChange={handleChange}
          errorMessage={validationErrors.name}
          defaultValue={reservation.name}
        />
      </Grid>
      <Grid xs={1}>
        <FormInput
          label="Ora"
          name="hour"
          type="time"
          onChange={handleChange}
          errorMessage={validationErrors.hour}
          defaultValue={reservation.hour}
        />
      </Grid>
      <Grid xs={1}>
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
      </Grid>
      <Grid xs={1}>
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
      </Grid>
      <Grid xs={4}>
        <FormInput
          label="Note"
          name="notes"
          onChange={handleChange}
          errorMessage={validationErrors.notes}
          sx={{ flexGrow: 1 }}
          defaultValue={reservation.notes}
        />
      </Grid>
    </>
  );
}
