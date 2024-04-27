import React from "react";
import { Input, IconButton } from "@mui/joy";
import { TextMaskAdapter } from "./utils/TextMaskAdapter";
import Add from "@mui/icons-material/Add";

export default function AddReservationForm(props) {
  function click(event) {
    console.log("event", event);
  }

  return (
    <tr>
      <td style={{ textAlign: "center", width: 120 }}></td>
      <td>
        <Input placeholder="Es: Mario" variant="plain" size="sm" required />
      </td>
      <td>
        <Input
          placeholder="20:00"
          variant="plain"
          size="sm"
          required
          slotProps={{ input: { component: TextMaskAdapter } }}
        />
      </td>
      <td>
        <Input variant="plain" size="sm" required />
      </td>
      <td>
        <Input variant="plain" size="sm" />
      </td>
      <td>
        <Input variant="plain" size="sm" />
      </td>
      <td>
        <IconButton variant="solid" color="primary" onClick={click}>
          <Add />
        </IconButton>
      </td>
    </tr>
  );
}
