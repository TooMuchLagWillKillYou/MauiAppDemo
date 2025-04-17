import React from "react";
import PageTitle from "../../shared/PageTitle.jsx";
import { Box } from "@mui/material";
import { Page, Title, Container, Group } from "../../utils/menuComponents.jsx";

export default function Template() {
  const dummy = {
    title: "Title",
    ingredients:
      "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    price: 10.5,
  };

  return (
    <React.Fragment>
      <PageTitle text="Template" />
      <Box>
        <Page className="a5-sheet" id="first-page">
          <Title>Le Specialita'</Title>
          <Container>
            <Group {...dummy} />
          </Container>
        </Page>
        <Page className="a5-sheet">
          <Title>Le Classiche</Title>
          <Container>
            <Group {...dummy} />
          </Container>
        </Page>
      </Box>
    </React.Fragment>
  );
}
