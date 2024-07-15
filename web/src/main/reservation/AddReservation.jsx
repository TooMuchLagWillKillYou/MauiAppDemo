import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Box, Button, Grid, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../../hooks/reservationHooks";
import ReservationForm from "./ReservationForm";

export default function AddReservation(props) {
  const [reservation, setReservation] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const addReservationMutation = useAddReservation();

  useEffect(() => {
    const errorsDictionary = {};
    if (
      addReservationMutation.error &&
      addReservationMutation.error.response?.status == 400
    ) {
      Object.entries(addReservationMutation.error.response?.data.errors).map(
        ([key, value]) => (errorsDictionary[key] = value)
      );
    }
    setValidationErrors(errorsDictionary);
  }, [addReservationMutation.isError]);

  const handleChange = (e) => {
    const inputName = e.target.name;
    setReservation({ ...reservation, [inputName]: e.target.value });
    setValidationErrors({ ...validationErrors, [inputName]: null });
  };

  const submit = (e) => {
    const hour = reservation.Hour.split(":")[0];
    const minute = reservation.Hour.split(":")[1];
    const dateTime = dayjs().hour(hour).minute(minute);
    reservation.Hour = dateTime.format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    console.log("res", reservation);
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
