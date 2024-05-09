import {
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@mui/joy";
import { WarningRounded } from "@mui/icons-material";
import { InfoOutlined } from "@mui/icons-material";
import { useUpdateReservation } from "../hooks/reservationHooks";
import { useState } from "react";
import FormInput from "./components/ReservationInput";

export default function EditModal(props) {
  const { itemToEdit, isOpen, setIsOpen } = props;
  const [reservation, setReservation] = useState(itemToEdit);
  const [validationErrors, setValidationErrors] = useState({});
  const updateReservationMutation = useUpdateReservation();

  const handleChange = (e) => {
    const inputName = e.target.name;
    setReservation({ ...reservation, [inputName]: e.target.value });
    setValidationErrors({ ...validationErrors, [inputName]: "" });
  };

  const submit = (e) => {
    e.preventDefault();
    updateReservationMutation.mutate(reservation);
    setIsOpen(false);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRounded />
          Conferma
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form style={{ flexGrow: 1 }}>
            <Box>
              <Stack direction="row" spacing={2}>
                <FormInput
                  label="Nome"
                  name="name"
                  onChange={handleChange}
                  errorMessage={validationErrors.name}
                  defaultValue={reservation.name}
                />
                <FormInput
                  label="Ora"
                  name="hour"
                  type="time"
                  onChange={handleChange}
                  errorMessage={validationErrors.hour}
                  defaultValue={reservation.hour}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormInput
                  label="Persone"
                  name="people"
                  type="number"
                  onChange={handleChange}
                  errorMessage={validationErrors.people}
                  sx={{
                    width: 85,
                  }}
                  slotProps={{
                    input: {
                      min: 1,
                      step: 1,
                    },
                  }}
                  defaultValue={reservation.people}
                />
                <FormInput
                  label="Tavolo"
                  name="table"
                  onChange={handleChange}
                  errorMessage={validationErrors.table}
                  sx={{
                    width: 85,
                  }}
                  defaultValue={reservation.table}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormInput
                  label="Note"
                  name="notes"
                  onChange={(e) =>
                    setReservation({ ...reservation, notes: e.target.value })
                  }
                  errorMessage={validationErrors.notes}
                  sx={{ flexGrow: 1 }}
                />
              </Stack>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="primary" onClick={submit}>
            Modifica
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setIsOpen(false)}
          >
            Chiudi
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
