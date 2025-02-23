import React from "react";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {Dialog, DialogContent} from "@mui/material";

export default function PaginationModal({ currentDate, setCurrentDate, isOpen, setIsOpen }) {

  const handleChange = (event) => {
    setCurrentDate(event);
    setIsOpen(false);
  };
  return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent dividers>
          <div className="date-picker-container">
            <StaticDatePicker
                value={currentDate}
                minDate={dayjs("2022-06-03")}
                maxDate={dayjs().add(1, "year")}
                onChange={handleChange}
                slotProps={{ actionBar: { actions: [] } }}
                // TODO: shouldDisableDate // prop per gestire i giorni di ferie/chiusura
                // TODO: disable past
            />
          </div>
        </DialogContent>
      </Dialog>
  )
}
