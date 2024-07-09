import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, Divider } from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import { useDeleteReservation } from "../../hooks/reservationHooks";
import DeleteModal from "../reservation/DeleteModal";
import EditModal from "../reservation/EditModal";

export default function RowMenu({ item }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const deleteReservationMutation = useDeleteReservation();

  const deleteRow = () => {
    deleteReservationMutation.mutate(item.id);
  };

  const editRow = () => {};

  return (
    <React.Fragment>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRounded />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => setEditModalIsOpen(true)}>Modifica</MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => setDeleteModalIsOpen(true)}>
            Cancella
          </MenuItem>
        </Menu>
      </Dropdown>
      <DeleteModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        onClick={deleteRow}
      />
      <EditModal
        isOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        onClick={editRow}
        itemToEdit={item}
      />
    </React.Fragment>
  );
}
