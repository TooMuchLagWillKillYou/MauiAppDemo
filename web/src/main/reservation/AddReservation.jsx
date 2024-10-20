import { Box, FormControl, FormLabel, Button, Stack } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import { TimeField } from "@mui/x-date-pickers";
import { useAddReservation } from "../../hooks/reservationHooks";
import dayjs from "dayjs";

export default function AddReservation(props) {
  const addReservationMutation = useAddReservation();
  const [name, setName] = useState("");
  const [hour, setHour] = useState(dayjs());
  const [people, setPeople] = useState(2);
  const [table, setTable] = useState("");
  const [notes, setNotes] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const result = {};
    if (
      addReservationMutation.isError &&
      addReservationMutation.error &&
      addReservationMutation.error.response?.status == 400
    ) {
      Object.entries(addReservationMutation.error.response?.data.errors).map(
        ([key, value]) => (result[key] = value)
      );
    }
    setValidationErrors(result);
  }, [addReservationMutation.isError]);

  const handleNameChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setName(e.target.value);
  };
  const handleHourChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setHour(e);
  };
  const handlePeopleChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setPeople(e.target.value);
  };
  const handleTableChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setTable(e.target.value);
  };
  const handleNotesChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setNotes(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();

    addReservationMutation.mutate({
      name,
      hour,
      people,
      table,
      notes,
    });

    setName("");
    setHour(dayjs());
    setPeople(2);
    setTable("");
    setNotes("");
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
        <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
          <FormInput
            label="Name"
            name="Name"
            value={name}
            onChange={handleNameChange}
            errorMessage={validationErrors.Name}
            sx={{
              width: 300,
            }}
          />
          <FormControl>
            <FormLabel>Hour</FormLabel>
            <TimeField
              format="HH:mm"
              name="Hour"
              value={hour}
              onChange={handleHourChange}
              // errorMessage={validationErrors.Hour}
            />
          </FormControl>
          <FormInput
            type="number"
            label="People"
            name="People"
            value={people}
            onChange={handlePeopleChange}
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
            label="Table"
            name="Table"
            onChange={handleTableChange}
            value={table}
            errorMessage={validationErrors.Table}
            sx={{
              width: 200,
            }}
          />
          <FormInput
            label="Notes"
            name="Notes"
            onChange={handleNotesChange}
            value={notes}
            errorMessage={validationErrors.Notes}
            sx={{ flexGrow: 1, height: 36 }}
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
