import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  FormHelperText,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useAddReservation } from "../hooks/reservationHooks";
import { InfoOutlined } from "@mui/icons-material";

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
              placeholder="Es: Mario Rossi"
              variant="plain"
              onChange={handleChange}
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
              type="time"
              variant="plain"
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  hour: new Date(e.target.value),
                })
              }
            />
            {validationErrors["Hour"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["Hour"]}
              </FormHelperText>
            )}
          </FormControl>
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
              onChange={(e) =>
                setReservation({ ...reservation, people: e.target.value })
              }
            />
            {validationErrors["People"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["People"]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={
              validationErrors["Table"] != null &&
              validationErrors["Table"].length > 0
            }
            sx={{
              width: 85,
            }}
          >
            <FormLabel>Tavolo</FormLabel>
            <Input
              name="Table"
              variant="plain"
              onChange={(e) =>
                setReservation({ ...reservation, table: e.target.value })
              }
            />
            {validationErrors["Table"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["Table"]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={
              validationErrors["Notes"] != null &&
              validationErrors["Notes"].length > 0
            }
            sx={{ flexGrow: 1 }}
          >
            <FormLabel>Note</FormLabel>
            <Input
              name="Notes"
              placeholder="Es: il cliente chiede il tavolo 4"
              variant="plain"
              onChange={(e) =>
                setReservation({ ...reservation, notes: e.target.value })
              }
            />
            {validationErrors["Notes"] && (
              <FormHelperText>
                <InfoOutlined />
                {validationErrors["Notes"]}
              </FormHelperText>
            )}
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
