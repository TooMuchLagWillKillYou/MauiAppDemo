import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Button, Typography } from "@mui/joy";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import PaginationModal from "./PaginationModal";

export default function Pagination({ currentDate, onChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isToday =
    currentDate.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");

  const getTextToDisplay = () => {
    if (isToday) {
      return "oggi";
    }
    return currentDate.locale("it").format("dddd D MMMM");
  };

  const handleClick = () => setModalIsOpen(true);

  return (
    <div className="pagination-container">
      <div className="date-pagination">
        <Button variant="plain" size="sm" onClick={() => onChange(-1)}>
          <ChevronLeft />
        </Button>
        <span className="displayed-date" onClick={handleClick}>
          <Typography level="h1">{getTextToDisplay()}</Typography>
        </span>
        <Button variant="plain" size="sm" onClick={() => onChange(1)}>
          <ChevronRight />
        </Button>
      </div>
      <PaginationModal
        currentDate={currentDate}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </div>
  );
}
