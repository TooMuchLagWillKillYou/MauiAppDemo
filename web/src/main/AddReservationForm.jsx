import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../hooks/reservationHooks";
import ReservationForm from "./ReservationForm";

export default function AddReservationForm(props) {
  const [reservation, setReservation] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const addReservationMutation = useAddReservation();

  useEffect(() => {
    if (
      addReservationMutation.error &&
      addReservationMutation.error.response?.status == 400
    ) {
      const errorsDictionary = {};
      Object.entries(addReservationMutation.error.response?.data.errors).map(
        ([key, value]) => (errorsDictionary[key] = value)
      );
      setValidationErrors(errorsDictionary);
    }
  }, [addReservationMutation.isError]);

  const handleChange = (e) => {
    const inputName = e.target.name;
    setReservation({ ...reservation, [inputName]: e.target.value });
    setValidationErrors({ ...validationErrors, [inputName]: "" });
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
            reservation={reservation}
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
