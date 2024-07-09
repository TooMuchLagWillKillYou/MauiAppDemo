import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/joy";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
require("dayjs/locale/it");

export default function Pagination() {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [isToday, setIsToday] = useState(
    currentDay.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")
  );

  useEffect(() => {
    setIsToday(currentDay.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY"));
  }, [currentDay]);

  const getTextToDisplay = () => {
    if (isToday) {
      return "oggi";
    }
    return currentDay.locale("it").format("dddd D MMMM");
  };

  const navigate = (daysToAdd) =>
    setCurrentDay(currentDay.add(daysToAdd, "day"));

  const handleChange = (event) => setCurrentDay(event);
  const handleClick = () => setCurrentDay(dayjs());

  return (
    <div className="pagination-container">
      <div className="date-pagination">
        <Button variant="plain" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <span className="displayed-day" onClick={handleClick}>
          {getTextToDisplay()}
        </span>
        <Button variant="plain" size="sm" onClick={() => navigate(1)}>
          <ChevronRight />
        </Button>
      </div>
      <div className="date-picker-container">
        <StaticDatePicker
          value={currentDay}
          minDate={dayjs("2022-06-03")}
          maxDate={dayjs().add(1, "year")}
          onChange={handleChange}
          // shouldDisableDate // prop per gestire i giorni di ferie/chiusura
        />
      </div>
    </div>
  );
}
