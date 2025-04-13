import React from "react";
import PageTitle from "../../shared/PageTitle.jsx";
import { Box } from "@mui/material";

export default function Template() {
  return (
    <React.Fragment>
      <PageTitle text="Template" />
      <Box>
        <div className="menuTitle" style={{ fontFamily: "BrolimoRegular" }}>
          Hello, custom font!
        </div>
      </Box>
    </React.Fragment>
  );
}
