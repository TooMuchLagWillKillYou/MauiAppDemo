import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";
import useFetchReservations, {
  useUpdateReservation,
} from "../../hooks/reservationHooks";
import ApiStatus from "../../apiStatus";
import { Snackbar } from "@mui/joy";

export default function ReservationsDataGrid() {
  const [cellModesModel, setCellModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const { data, status, isSuccess } = useFetchReservations();
  const updateReservationMutation = useUpdateReservation();
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      width: 300,
      editable: true,
      sortable: true,
    },
    {
      field: "hour",
      headerName: "Ora",
      width: 200,
      editable: true,
      sortable: true,
      valueGetter: (value) => {
        if (!value) {
          return value;
        }
        return dayjs(value).format("HH:mm");
      },
    },
    {
      field: "people",
      headerName: "Persone",
      type: "number",
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: "table",
      headerName: "Tavolo",
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: "notes",
      headerName: "Note",
      flex: 1,
      editable: true,
      sortable: true,
    },
  ];

  const handleCellClick = useCallback((params, event) => {
    if (!params.isEditable) {
      return;
    }

    // Ignore portal
    if (
      event.target.nodeType === 1 &&
      !event.currentTarget.contains(event.target)
    ) {
      return;
    }

    setCellModesModel((prevModel) => {
      return {
        // Revert the mode of the other cells from other rows
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          // Revert the mode of other cells in the same row
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);

  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  const processRowUpdate = useCallback(
    async (updatedRow, originalRow) => {
      if (updatedRow == originalRow) {
        return originalRow;
      }

      const response = await updateReservationMutation.mutateAsync(updatedRow);
      setSnackbar({
        message: "Item successfully saved",
        color: "success",
      });
      return response;
    },
    [updateReservationMutation]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    // TODO: this wil not trigger multiple snackbars in case of multiple errors
    error.response?.data.errors &&
      Object.entries(error.response?.data.errors).map(([key, value, index]) => {
        setSnackbar({ key: index, message: value, color: "danger" });
      });
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  if (!isSuccess) {
    return <ApiStatus status={status} />;
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={data}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      {!!snackbar && (
        <Snackbar
          key={snackbar.key}
          open
          color={snackbar.color}
          variant="soft"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          {snackbar.message}
          {/* <Alert {...snackbar} onClose={handleCloseSnackbar} /> */}
        </Snackbar>
      )}
    </>
  );
}
