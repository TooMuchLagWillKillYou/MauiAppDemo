import React, { useState } from "react";
import PageTitle from "../../shared/PageTitle.jsx";
import { Box } from "@mui/material";
import { Page, Title, Container, Group } from "../../utils/menuComponents.jsx";
import { useFetchPizzas } from "../../hooks/menuHooks.js";
import ApiStatus from "../../utils/ApiStatus.jsx";

export default function Template() {
  const { data, status, isSuccess } = useFetchPizzas();
  if (!isSuccess) {
    return <ApiStatus status={status} />;
  }
  return (
    <React.Fragment>
      <PageTitle text="Template" />
      <Box>
        <Page className="a5-sheet" id="first-page">
          <Title>Le Specialita'</Title>
          <Container>
            {data?.map((item, index) => (
              <Group {...item} key={index} />
            ))}
          </Container>
        </Page>
      </Box>
    </React.Fragment>
  );
}
