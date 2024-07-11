import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFetchReservations from "../../hooks/reservationHooks";
import ApiStatus from "../../apiStatus";

export default function ReservationsDataGrid() {
  const { data, status, isSuccess } = useFetchReservations();

  useEffect(() => {
    console.log("data", data);
  });

  const columns = [
    {
      field: "name",
      headerName: "Nome",
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: "hour",
      headerName: "Ora",
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: "people",
      headerName: "Persone",
      type: "number",
      width: 110,
      editable: true,
      sortable: true,
    },
    {
      field: "table",
      headerName: "Tavolo",
      width: 160,
      editable: true,
      sortable: true,
    },
    {
      field: "notes",
      headerName: "Note",
      width: 160,
      editable: true,
      sortable: true,
    },
  ];

  const handleEditStart = (event) => {
    console.log("start", event);
  };

  const handleEditStop = (event) => {
    console.log("stop", event);
  };

  //   TODO: to test
  //   if (!isSuccess) {
  //     return <ApiStatus status={status} />;
  //   }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={data}
        onCellEditStart={(event) => handleEditStart(event)}
        onCellEditStop={(event) => handleEditStop(event)}
      />
    </>
  );
}
