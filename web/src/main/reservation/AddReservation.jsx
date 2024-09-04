import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, Button, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../../hooks/reservationHooks";
import ReservationForm from "./ReservationForm";
import FormInput from "../shared/FormInput";

export default function AddReservation({ currentDate }) {
  const [reservation, setReservation] = useState({});
  const addReservationMutation = useAddReservation();
  const validationErrors = getValidationErrors();

  function getValidationErrors() {
    const errorsDictionary = {};
    if (
      addReservationMutation.isError &&
      addReservationMutation.error &&
      addReservationMutation.error.response?.status == 400
    ) {
      Object.entries(addReservationMutation.error.response?.data.errors).map(
        ([key, value]) => (errorsDictionary[key] = value)
      );
    }
    return errorsDictionary;
  }

  const handleChange = (e) => {
    const inputName = e.target.name;
    setReservation({ ...reservation, [inputName]: e.target.value });
    validationErrors[inputName] = null;
  };

  const submit = (e) => {
    e.preventDefault();
    const [hour, minutes] = reservation.Hour.split(":");
    const dateTime = dayjs(currentDate).hour(hour).minute(minutes);
    reservation.Hour = dateTime.format();
    addReservationMutation.mutate(reservation);
    setReservation({});
  };

  return (
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: "sm",
        py: 2,
        mb: 5,
        display: { xs: "none", sm: "flex" },
        flexWrap: "wrap",
        gap: 1.5,
        "& > *": {
          minWidth: { xs: "120px", md: "160px" },
        },
      }}
    >
      <form style={{ flexGrow: 1 }}>
        {/* <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap> */}
        {/* <ReservationForm
            validationErrors={validationErrors}
            handleChange={handleChange}
          /> */}
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
          sx={{ flexGrow: 1, height: 36 }}
        />
        <Button
          type="submit"
          color="primary"
          startDecorator={<AddIcon />}
          size="md"
          // sx={{ placeSelf: "flex-end" }}
          onClick={submit}
        >
          Aggiungi
        </Button>
        {/* </Stack> */}
      </form>
    </Box>
  );
}
