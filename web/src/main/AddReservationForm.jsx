import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../hooks/reservationHooks";

export default function AddReservationForm(props) {
  const [reservation, setReservation] = useState({});
  const addReservationMutation = useAddReservation();

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
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Es: Mario Rossi"
              variant="plain"
              onChange={(e) =>
                setReservation({ ...reservation, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ora</FormLabel>
            <Input
              type="time"
              variant="plain"
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  hour: new Date(e.target.value),
                })
              }
            />
          </FormControl>
          <FormControl
            sx={{
              width: 85,
            }}
          >
            <FormLabel>Persone</FormLabel>
            <Input
              type="number"
              variant="plain"
              slotProps={{
                input: {
                  min: 1,
                  step: 1,
                },
              }}
              onChange={(e) =>
                setReservation({ ...reservation, people: e.target.value })
              }
            />
          </FormControl>
          <FormControl
            sx={{
              width: 85,
            }}
          >
            <FormLabel>Tavolo</FormLabel>
            <Input
              variant="plain"
              onChange={(e) =>
                setReservation({ ...reservation, table: e.target.value })
              }
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Note</FormLabel>
            <Input
              placeholder="Es: il cliente chiede il tavolo 4"
              variant="plain"
              onChange={(e) =>
                setReservation({ ...reservation, notes: e.target.value })
              }
            />
          </FormControl>
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
