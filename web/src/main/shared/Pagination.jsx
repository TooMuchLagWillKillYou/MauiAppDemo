import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/joy";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

export default function Pagination() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isToday, setIsToday] = useState(true);

  useEffect(() => {
    setIsToday(
      currentDate.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")
    );
  }, [currentDate]);

  const getTextToDisplay = () => {
    if (isToday) {
      return "Today";
    }

    return currentDate.format("dddd D MMMM");
  };
  const navigate = (daysToAdd) =>
    setCurrentDate(currentDate.add(daysToAdd, "days"));
  const handleClick = () => setCurrentDate(dayjs());
  const handleChange = (event) => setCurrentDate(event);

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
      <div className="date-picker-container">
        {/* <StaticDatePicker
          // value={currentDate}
          minDate={dayjs("2022-06-03")}
          maxDate={dayjs().add(1, "year")}
          // onChange={handleChange}
          // shouldDisableDate // prop per gestire i giorni di ferie/chiusura
        /> */}
      </div>
    </div>
  );
}
