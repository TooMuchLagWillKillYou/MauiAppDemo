import { Box, Typography } from "@mui/material";

export default function PageTitle({ text }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h3">{text}</Typography>
    </Box>
  );
}
