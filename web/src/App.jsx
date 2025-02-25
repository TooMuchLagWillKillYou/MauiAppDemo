import { Box } from "@mui/joy";
import Sidebar from "./shared/Sidebar.jsx";
import Reservations from "./pages/reservations/Reservations.jsx";
import Breadcrumb from "./shared/Breadcrumb.jsx";

function App() {
  return (
    <>
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
          <Breadcrumb />
          <Reservations />
        </Box>
      </Box>
    </>
  );
}

export default App;
