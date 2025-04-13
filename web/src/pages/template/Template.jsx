import React from "react";
import PageTitle from "../../shared/PageTitle.jsx";
import { Box } from "@mui/material";
import { Page, Title, Container, Group } from "../../utils/menuComponents.jsx";

export default function Template() {
  const pizzas = [
    {
      title: "Marinara",
      ingredients:
        "pomodoro pelato italiano macerato a mano, origano calabrese, aglio tritato fine, olio extravergine di oliva 100% italiano, basilico fresco",
      price: 6.5,
    },
    {
      title: "Bufala",
      ingredients:
        "pomodoro pelato San Marzano Dop, mozzarella di bufala campana DOP, parmigiano reggiano, olio extravergine 100% italiano, basilico fresco",
      price: 10.5,
    },
  ];

  return (
    <React.Fragment>
      <PageTitle text="Template" />
      <Box>
        <Page className="a5-sheet">
          <Title>Le Specialita'</Title>
          <Container>
            {pizzas.map((pizza, i) => (
              <Group {...pizza} key={`menu-group-${i}`} />
            ))}
          </Container>
        </Page>
      </Box>
    </React.Fragment>
  );
}
