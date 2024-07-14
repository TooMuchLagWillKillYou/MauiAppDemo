import React, { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/joy";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import "dayjs/locale/it";
import PaginationModal from "./PaginationModal";

export default function Pagination() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isToday =
    currentDate.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");

  const getTextToDisplay = () => {
    if (isToday) {
      return "oggi";
    }
    return currentDate.locale("it").format("dddd D MMMM");
  };
  const navigate = (daysToAdd) =>
    setCurrentDate(currentDate.add(daysToAdd, "days"));
  const handleClick = () => setModalIsOpen(true);

  return (
    <div className="pagination-container">
      <div className="date-pagination">
        <Button variant="plain" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <span className="displayed-date" onClick={handleClick}>
          {getTextToDisplay()}
        </span>
        <Button variant="plain" size="sm" onClick={() => navigate(1)}>
          <ChevronRight />
        </Button>
      </div>
      <PaginationModal
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </div>
  );
}
