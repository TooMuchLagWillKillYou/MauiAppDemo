import React from "react";
import FormInput from "../shared/FormInput";

export default function ReservationForm(props) {
  const { validationErrors, handleChange } = props;
  return (
    <>
      <FormInput
        label="Nome"
        name="Name"
        onChange={handleChange}
        errorMessage={validationErrors.Name}
        sx={{
          width: 300,
        }}
      />
      <FormInput
        label="Ora"
        name="Hour"
        type="time"
        onChange={handleChange}
        errorMessage={validationErrors.Hour}
        sx={{
          width: 200,
        }}
      />
      <FormInput
        label="Persone"
        name="People"
        type="number"
        onChange={handleChange}
        errorMessage={validationErrors.People}
        sx={{
          width: 200,
        }}
        slotProps={{
          input: {
            min: 1,
            step: 1,
          },
        }}
      />
      <FormInput
        label="Tavolo"
        name="Table"
        onChange={handleChange}
        errorMessage={validationErrors.Table}
        sx={{
          width: 200,
        }}
      />
      <FormInput
        label="Note"
        name="Notes"
        onChange={handleChange}
        errorMessage={validationErrors.Notes}
        sx={{ flexGrow: 1 }}
      />
    </>
  );
}
