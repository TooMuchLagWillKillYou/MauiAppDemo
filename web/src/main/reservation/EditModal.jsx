import {
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/joy";
import { WarningRounded } from "@mui/icons-material";
import { useUpdateReservation } from "../../hooks/reservationHooks";
import { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";

export default function EditModal(props) {
  const { itemToEdit, isOpen, setIsOpen } = props;
  const [reservation, setReservation] = useState(itemToEdit);
  const [validationErrors, setValidationErrors] = useState({});
  const updateReservationMutation = useUpdateReservation();

  useEffect(() => {
    if (
      updateReservationMutation.error &&
      updateReservationMutation.error.response?.status == 400
    ) {
      const errorsDictionary = {};
      Object.entries(updateReservationMutation.error.response?.data.errors).map(
        ([key, value]) => {
          return (errorsDictionary[key] = value);
        }
      );
      setValidationErrors(errorsDictionary);
    }
  }, [updateReservationMutation.isError]);

  const handleChange = (e) => {
    const inputName = e.target.name;
    setReservation({ ...reservation, [inputName]: e.target.value });
    setValidationErrors({ ...validationErrors, [inputName]: "" });
  };

  const submit = (e) => {
    e.preventDefault();
    updateReservationMutation.mutate(reservation);

    if (!updateReservationMutation.isError) {
      setReservation(itemToEdit);
      setIsOpen(true);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      size="lg"
    >
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRounded />
          Conferma
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form style={{ flexGrow: 1 }}>
            <Stack spacing={1} flexWrap="wrap" useFlexGap>
              <ReservationForm
                reservation={reservation}
                validationErrors={validationErrors}
                handleChange={handleChange}
              />
            </Stack>
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
