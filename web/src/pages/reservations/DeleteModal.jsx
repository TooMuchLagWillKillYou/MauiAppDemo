import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  onClick,
  itemToDelete,
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        <DialogContentText>
          Sei sicuro di voler eliminare questa prenotazione?
        </DialogContentText>
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
    </Dialog>
  );
}
