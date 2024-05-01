import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, Divider } from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import { useDeleteReservation } from "../hooks/reservationHooks";
import DeleteModal from "./DeleteModal";

export default function RowMenu({ id }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const deleteReservationMutation = useDeleteReservation();
  const deleteRow = () => {
    deleteReservationMutation.mutate(id);
  };

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
          <MenuItem>Modifica</MenuItem>
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
    </React.Fragment>
  );
}
