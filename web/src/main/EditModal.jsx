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
                    variant="plain"
                    type="time"
                    defaultValue={reservation.hour}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                >
                  <FormLabel>Tavolo</FormLabel>
                  <Input
                    name="Hour"
                    variant="plain"
                    defaultValue={reservation.table}
                    onChange={handleChange}
                  />
                  {validationErrors["Table"] && (
                    <FormHelperText>
                      <InfoOutlined />
                      {validationErrors["Table"]}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl
                  error={
                    validationErrors["Notes"] != null &&
                    validationErrors["Notes"].length > 0
                  }
                >
                  <FormLabel>Note</FormLabel>
                  <Input
                    name="Notes"
                    variant="plain"
                    defaultValue={reservation.notes}
                    onChange={handleChange}
                  />
                  {validationErrors["Notes"] && (
                    <FormHelperText>
                      <InfoOutlined />
                      {validationErrors["Notes"]}
                    </FormHelperText>
                  )}
                </FormControl>
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
