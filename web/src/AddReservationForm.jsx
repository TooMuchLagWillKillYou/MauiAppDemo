import React, { useState } from "react";
import { Input, IconButton } from "@mui/joy";
import { TextMaskAdapter } from "./utils/TextMaskAdapter";
import Add from "@mui/icons-material/Add";
import { ReservationAPI } from "./apis/ReservationAPI";

export default function AddReservationForm(props) {
  const [newReservation, setNewReservation] = useState({});
  function createReservation(event) {
    // ReservationAPI.create(newReservation).then((response) =>
    //   console.log(response)
    // );

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "https://localhost:44387");

    const raw = JSON.stringify({
      id: 0,
      name: "Ciao",
      people: 5,
      dateTime: "2024-04-28T15:02:09.712Z",
      table: "4",
      notes: "",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://localhost:44387/api/Reservation", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result));
    // .catch((error) => console.error(error));
  }
  function setReservationProperty(event) {
    setNewReservation({
      ...newReservation,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <tr>
      <td style={{ textAlign: "center", width: 120 }}></td>
      <td>
        <Input
          id="name"
          onChange={setReservationProperty.bind(this)}
          placeholder="Es: Mario"
          variant="plain"
          size="sm"
          required
        />
      </td>
      <td>
        <Input
          id="dateTime"
          onChange={setReservationProperty.bind(this)}
          placeholder="20:00"
          variant="plain"
          size="sm"
          required
          slotProps={{ input: { component: TextMaskAdapter } }}
        />
      </td>
      <td>
        <Input
          id="people"
          onChange={setReservationProperty.bind(this)}
          variant="plain"
          size="sm"
          required
        />
      </td>
      <td>
        <Input
          id="table"
          onChange={setReservationProperty.bind(this)}
          variant="plain"
          size="sm"
        />
      </td>
      <td>
        <Input
          id="notes"
          onChange={setReservationProperty.bind(this)}
          variant="plain"
          size="sm"
        />
      </td>
      <td>
        <IconButton
          variant="solid"
          color="primary"
          onClick={() => createReservation()}
        >
          <Add />
        </IconButton>
      </td>
    </tr>
  );
}
