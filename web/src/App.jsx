import { Box } from "@mui/material";
import Reservations from "./pages/reservations/Reservations.jsx";
import Breadcrumb from "./shared/Breadcrumb.jsx";
import MiniDrawer from "./shared/MiniDrawer.jsx";
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Template from "./pages/template/Template.jsx";

function App() {
  const pages = [
    { title: "Home", icon: <HomeRoundedIcon />, route: "/" },
    {
      title: "Prenotazioni",
      icon: <TableRestaurantRoundedIcon />,
      route: "/reservations",
    },
    { title: "Menù", icon: <MenuBookRoundedIcon />, route: "/menu" },
    { title: "Template", icon: <DescriptionRoundedIcon />, route: "/template" },
  ];
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <MiniDrawer menuItems={pages} />
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="menu" element={<Menu />} />
            <Route path="template" element={<Template />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
