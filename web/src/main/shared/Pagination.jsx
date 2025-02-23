import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import PaginationModal from "./PaginationModal";

export default function Pagination({ currentDate, setCurrentDate, onChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isToday =
    currentDate.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 39) onChange(1)
      if (e.keyCode === 37) onChange(-1)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  });

  const getTextToDisplay = () => {
    if (isToday) return "oggi";
    return currentDate.locale("it").format("dddd D MMMM");
  };
  return (
      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
        <Stack direction="row">
          <Button variant="outlined" size="sm" onClick={() => onChange(-1)}>
            <ChevronLeft/>
          </Button>
          <Button sx={{width: 400, paddingX: 5, cursor: 'pointer'}} onClick={() => setModalIsOpen(true)}>
            <Typography variant="h6" sx={{fontWeight: 600}}>{getTextToDisplay()}</Typography>
          </Button>
          <Button variant="outlined" size="sm" onClick={() => onChange(1)}>
            <ChevronRight/>
          </Button>
        </Stack>
        <PaginationModal
            currentDate={currentDate}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            setCurrentDate={setCurrentDate}
        />
      </Box>
  )
}
