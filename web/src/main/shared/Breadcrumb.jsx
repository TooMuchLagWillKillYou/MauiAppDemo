import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";

export default function Breadcrumb() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs aria-label="breadcrumbs">
        <Link underline="none" color="inherit" href="/">
          <HomeRounded />
        </Link>
        <Link underline="hover" color="neutral" fontSize={12} fontWeight={500}>
          Dashboard
        </Link>
        <Typography color="primary" fontWeight={500} fontSize={12}>
          Orders
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}
