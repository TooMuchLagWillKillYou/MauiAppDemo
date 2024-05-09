import React from "react";
import { Box, FormControl, FormLabel, Input, Stack } from "@mui/joy";

export default function ReservationForm({ reservation }) {
  return (
    <form style={{ flexGrow: 1 }}>
      <Box>
        <Stack direction="row" spacing={2}>
          <FormControl
            error={
              validationErrors["Name"] != null &&
              validationErrors["Name"].length > 0
            }
          >
            <FormLabel>Nome</FormLabel>
            <Input
              name="Name"
              variant="plain"
              defaultValue={reservation.name}
            />
            {validationErrors["Name"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["Name"]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={
              validationErrors["Hour"] != null &&
              validationErrors["Hour"].length > 0
            }
          >
            <FormLabel>Ora</FormLabel>
            <Input
              name="Hour"
              variant="plain"
              type="time"
              defaultValue={reservation.hour}
            />
            {validationErrors["Hour"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["Hour"]}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl
            error={
              validationErrors["People"] != null &&
              validationErrors["People"].length > 0
            }
            sx={{
              width: 85,
            }}
          >
            <FormLabel>Persone</FormLabel>
            <Input
              name="People"
              type="number"
              variant="plain"
              slotProps={{
                input: {
                  min: 1,
                  step: 1,
                },
              }}
              defaultValue={reservation.people}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tavolo</FormLabel>
            <Input
              name="Hour"
              variant="plain"
              defaultValue={reservation.table}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Input
              name="Notes"
              variant="plain"
              defaultValue={reservation.notes}
            />
          </FormControl>
        </Stack>
      </Box>
    </form>
  );
}
