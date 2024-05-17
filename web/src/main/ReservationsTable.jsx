import React, { useState } from "react";
import { Table, Checkbox, Link, Typography, Sheet } from "@mui/joy";
import { ArrowDropDown } from "@mui/icons-material";
import useFetchReservations from "../hooks/reservationHooks";
import { dateTimeFormatter } from "../config";
import ApiStatus from "../apiStatus";
import RowMenu from "./components/RowMenu";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ReservationsTable() {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("desc");
  const { data, status, isSuccess } = useFetchReservations();

  if (!isSuccess) {
    return <ApiStatus status={status} />;
  }

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== data.length
                  }
                  checked={selected.length === data.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? data.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === data.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDown />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Nome
                </Link>
              </th>
              <th style={{ width: 100, padding: "12px 6px" }}>Ora</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Persone</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Tavolo</th>
              <th style={{ width: 220, padding: "12px 6px" }}>Note</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>

          <tbody>
            {/* <AddReservationForm /> */}
            {data.length > 0
              ? stableSort(data, getComparator(order, "id")).map((row) => (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.id)}
                        color={
                          selected.includes(row.id) ? "primary" : undefined
                        }
                        onChange={(event) => {
                          setSelected((ids) =>
                            event.target.checked
                              ? ids.concat(row.id)
                              : ids.filter((itemId) => itemId !== row.id)
                          );
                        }}
                        slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                        sx={{ verticalAlign: "text-bottom" }}
                      />
                    </td>
                    <td>
                      <Typography level="body-xs">{row.name}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {dateTimeFormatter.format(row.Hour)}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.people}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.table}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.notes}</Typography>
                    </td>
                    <td>
                      <RowMenu item={row} />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
