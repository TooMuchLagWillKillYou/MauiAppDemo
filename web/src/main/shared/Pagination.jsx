import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Button, Typography } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import PaginationModal from "./PaginationModal";

export default function Pagination({ currentDate, setCurrentDate, onChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isToday =
    currentDate.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");

  const getTextToDisplay = () => {
    if (isToday) {
      return "oggi";
    }
    return currentDate.locale("it").format("dddd D MMMM");
  };

  return (
    <div className="pagination-container">
      <div className="date-pagination">
        <Button variant="text" size="sm" onClick={() => onChange(-1)}>
          <ChevronLeft />
        </Button>
        <span className="displayed-date" onClick={() => setModalIsOpen(true)}>
          <Typography variant="h4" sx={{fontWeight: 600}}>{getTextToDisplay()}</Typography>
        </span>
        <Button variant="text" size="sm" onClick={() => onChange(1)}>
          <ChevronRight />
        </Button>
      </div>
      <PaginationModal
        currentDate={currentDate}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        setCurrentDate={setCurrentDate}
      />
    </div>
  );
}
