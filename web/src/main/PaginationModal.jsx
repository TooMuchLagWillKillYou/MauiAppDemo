import React from "react";
import dayjs from "dayjs";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/joy";
import { WarningRounded } from "@mui/icons-material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export default function PaginationModal(props) {
  const { currentDate, setCurrentDate, isOpen, setIsOpen } = props;

  const handleChange = (event) => {
    setCurrentDate(event);
    setIsOpen(false);
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
          Seleziona una data
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className="date-picker-container">
            <StaticDatePicker
              value={currentDate}
              minDate={dayjs("2022-06-03")}
              maxDate={dayjs().add(1, "year")}
              onChange={handleChange}
              //shouldDisableDate // prop per gestire i giorni di ferie/chiusura
            />
          </div>
        </DialogContent>
        <DialogActions>
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
