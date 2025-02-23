import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import { useAddReservation } from "../../hooks/reservationHooks";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import FormTimeInput from "../shared/FormTimeInput";
import ceil from "../../utils/ceil";
dayjs.extend(ceil);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function AddReservation() {
  const currentTime = () => dayjs.tz(dayjs().ceil(5, "minutes"), "Europe/Rome");
  const addReservationMutation = useAddReservation();
  const [name, setName] = useState("");
  const [hour, setHour] = useState(currentTime);
  const [people, setPeople] = useState();
  const [table, setTable] = useState("");
  const [notes, setNotes] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(currentTime);
    }, 300000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const result = {};
    if (
      addReservationMutation.isError &&
      addReservationMutation.error &&
      addReservationMutation.error.response?.status == 400
    ) {
      parseValidationErrorsFromAPI();
      resetUserInputs();
    }
    setValidationErrors(result);

    function parseValidationErrorsFromAPI() {
      Object.entries(addReservationMutation.error.response?.data.errors).map(
        ([key, value]) => (result[key] = value)
      );
    }
    function resetUserInputs() {
      const deserializedPayload = JSON.parse(
        addReservationMutation.error.response?.config.data
      );
      setName(deserializedPayload.name ?? "");
      setHour(dayjs(deserializedPayload.hour) ?? currentTime);
      setPeople(deserializedPayload.people ?? 0);
      setTable(deserializedPayload.table ?? "");
      setNotes(deserializedPayload.notes ?? "");
    }
  }, [addReservationMutation.isError]);
  const onChange = (callback, inputName, inputValue) => {
    setValidationErrors({ ...validationErrors, [inputName]: null });
    callback(inputValue);
  };
  const submit = (e) => {
    e.preventDefault();

    addReservationMutation.mutate({
      name,
      hour: hour.format(),
      people,
      table,
      notes,
    });

    setName("");
    setHour(currentTime);
    setPeople();
    setTable("");
    setNotes("");
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
      <form style={{ flexGrow: 1 }} autoComplete='off'>
        <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap >
          <FormInput
            label="Name"
            name="Name"
            value={name}
            onChange={(e) => onChange(setName, "Name", e.target.value)}
            errorMessage={validationErrors.Name}
            sx={{
              width: 300,
            }}
          />
          <FormTimeInput
            label="Hour"
            format="HH:mm"
            name="Hour"
            value={hour}
            onChange={(value) => onChange(setHour, "Hour", value)}
            errorMessage={validationErrors.Hour}
          />
          <FormInput
            type="number"
            label="People"
            name="People"
            value={people}
            onChange={(e) => onChange(setPeople, "People", e.target.value)}
            errorMessage={validationErrors.People}
            sx={{
              width: 100,
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
            onChange={(e) => onChange(setTable, "Table", e.target.value.toUpperCase())}
            value={table}
            errorMessage={validationErrors.Table}
            sx={{
              width: 100,
            }}
          />
          <FormInput
            label="Notes"
            name="Notes"
            onChange={(e) => onChange(setNotes, "Notes", e.target.value)}
            value={notes}
            errorMessage={validationErrors.Notes}
            sx={{ flexGrow: 1, height: 36 }}
          />
          <Button
            type="submit"
            // color="primary"
              variant="contained"
            startIcon={<AddIcon />}
            // size="md"
            // sx={{ placeSelf: "flex-end" }}
            onClick={submit}
          >
             Aggiungi
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
