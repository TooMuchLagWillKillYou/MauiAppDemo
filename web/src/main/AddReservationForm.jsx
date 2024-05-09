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
import FormInput from "./components/ReservationInput";

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
          <FormInput
            label="Nome"
            name="name"
            onChange={(e) =>
              setReservation({ ...reservation, name: e.target.value })
            }
            errorMessage={validationErrors["name"]}
          />
          <FormInput
            label="Ora"
            name="hour"
            type="time"
            onChange={(e) =>
              setReservation({
                ...reservation,
                hour: new Date(e.target.value),
              })
            }
            errorMessage={validationErrors["hour"]}
          />
          <FormInput
            label="Persone"
            name="people"
            type="number"
            onChange={(e) =>
              setReservation({ ...reservation, people: e.target.value })
            }
            errorMessage={validationErrors["people"]}
            sx={{
              width: 85,
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
            name="table"
            onChange={(e) =>
              setReservation({ ...reservation, table: e.target.value })
            }
            errorMessage={validationErrors["table"]}
            sx={{
              width: 85,
            }}
          />
          <FormInput
            label="Note"
            name="notes"
            onChange={(e) =>
              setReservation({ ...reservation, notes: e.target.value })
            }
            errorMessage={validationErrors["notes"]}
            sx={{ flexGrow: 1 }}
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
