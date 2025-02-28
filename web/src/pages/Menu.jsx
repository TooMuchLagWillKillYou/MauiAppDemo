import { Box, Typography } from "@mui/material";

export default function Menu() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="textSecondary">
        Menu!
      </Typography>
    </Box>
  );
}
