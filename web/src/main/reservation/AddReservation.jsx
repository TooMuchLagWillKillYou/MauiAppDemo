import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, Button, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../../hooks/reservationHooks";
import ReservationForm from "./ReservationForm";

export default function AddReservation({ currentDate }) {
  const [reservation, setReservation] = useState({});
  const addReservationMutation = useAddReservation();
  const validationErrors = getValidationErrors();

  function getValidationErrors() {
    const errorsDictionary = {};
    if (
      addReservationMutation.isError &&
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
    addReservationMutation.mutate(reservation);
  };

  return (
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: "sm",
        py: 2,
        display: { xs: "none", sm: "flex" },
        flexWrap: "wrap",
        gap: 1.5,
        "& > *": {
          minWidth: { xs: "120px", md: "160px" },
        },
      }}
    >
      <form style={{ flexGrow: 1 }}>
        <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
          <ReservationForm
            validationErrors={validationErrors}
            handleChange={handleChange}
          />
          <Button
            type="submit"
            color="primary"
            startDecorator={<AddIcon />}
            size="md"
            sx={{ placeSelf: "flex-end" }}
            onClick={submit}
          >
            Aggiungi
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
