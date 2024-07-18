import { Box, CircularProgress } from "@mui/joy";

const ApiStatus = (props) => {
  const { status } = props;

  switch (status) {
    case "pending":
      // return <div>Caricamento...</div>;
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
