import { Box, CircularProgress } from "@mui/material";

const ApiStatus = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      );
    case "error":
    default:
      return <div>Si è verificato un errore</div>;
  }
};

export default ApiStatus;
