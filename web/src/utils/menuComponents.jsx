import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const Page = styled(Box)(({ theme }) => ({
  width: "148mm",
  height: "210mm",
  background: "white",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  padding: "10mm",
  boxSizing: "border-box",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "BrolimoRegular",
  fontSize: "24pt",
  textAlign: "center",
  marginBottom: "15pt",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  gap: "15pt",
}));

const Group = (props) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
      }}
    >
      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: "17pt", fontWeight: 700 }}
      >
        {props.title}
      </Typography>
      <Typography sx={{ fontFamily: "BrolimoRegular", fontSize: "14pt" }}>
        {props.price}
      </Typography>
    </Box>
    <Typography
      component="p"
      sx={{ fontFamily: "Montserrat", fontSize: "12pt" }}
    >
      {props.ingredients}
    </Typography>
  </Box>
);

export { Page, Title, Container, Group };
