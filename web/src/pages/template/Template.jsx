import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  Page,
  PageTitle,
  Container,
  PizzaGroup,
} from "../../utils/menuComponents.jsx";
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
        <Page>
          <PageTitle>Le Specialita'</PageTitle>
          <Container>
            {data?.map((item, index) => (
              <PizzaGroup {...item} key={index} />
            ))}
          </Container>
        </Page>
      </Box>
    </React.Fragment>
  );
}
