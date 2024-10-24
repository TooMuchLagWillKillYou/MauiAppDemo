import React, { useState } from "react";
import dayjs from "dayjs";
import Sidebar from "./Sidebar";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
// import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import HomeRounded from "@mui/icons-material/HomeRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import Pagination from "./shared/Pagination";
import "./style.css";
import ReservationsDataGrid from "./reservation/ReservationsDataGrid";
import AddReservation from "./reservation/AddReservation";
import { useFetchReservationsByDate } from "../hooks/reservationHooks";

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { data, status, isSuccess } = useFetchReservationsByDate(currentDate);

  const handleDateChange = (daysToAdd) => {
    setCurrentDate(currentDate.add(daysToAdd, "days"));
  };

  return (
    <>
      {/* if you uncomment this component, <StaticDatePicker /> will crash */}
      {/* TODO: solve with this? https://github.com/mui/mui-x/issues/13799 */}
      {/* <CssVarsProvider disableTransitionOnChange> */}
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRounded fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRounded />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Prenotazioni
            </Typography>
          </Box>
          <Pagination currentDate={currentDate} onChange={handleDateChange} />
          <AddReservation currentDate={currentDate} />
          <ReservationsDataGrid
            data={data}
            status={status}
            isSuccess={isSuccess}
          />
        </Box>
      </Box>

      {/* </CssVarsProvider> */}
    </>
  );
}

export default App;
