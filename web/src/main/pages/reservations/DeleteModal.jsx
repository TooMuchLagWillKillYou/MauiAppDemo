import React from "react";
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

export default function DeleteModal(props) {
  const { isOpen, setIsOpen, onClick, itemToDelete } = props;

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
          Sei sicuro di voler eliminare questa prenotazione?
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => onClick(itemToDelete)}
          >
            Elimina
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
