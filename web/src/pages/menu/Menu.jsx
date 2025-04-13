import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreateModal from "./CreateModal.jsx";
import PageTitle from "../../shared/PageTitle.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Menu() {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [openTab, setOpenTab] = useState(0);

  return (
    <React.Fragment>
      <PageTitle text="Menù" />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalIsOpen(true)}
        >
          Aggiungi
        </Button>
      </Box>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={openTab}
            onChange={(e, i) => setOpenTab(i)}
            aria-label="basic tabs example"
          >
            <Tab label="Pizze" />
            <Tab label="Birre" />
            <Tab label="Birre in bottiglia" />
          </Tabs>
        </Box>
        <TabPanel value={openTab} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={openTab} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={openTab} index={2}>
          Item Three
        </TabPanel>
      </Box>
      <CreateModal
        isOpen={createModalIsOpen}
        close={() => setCreateModalIsOpen(false)}
      />
    </React.Fragment>
  );
}
