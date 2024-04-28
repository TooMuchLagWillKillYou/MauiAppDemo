import { api } from "./axiosConfig";
import { defineCancelApiObject } from "./axiosUtils";

// https://semaphoreci.com/blog/api-layer-react
export const ReservationAPI = {
  // get: async function (id, cancel = false) {
  //     const response = await api.request({
  //       url: `/products/:id`,
  //       method: "GET",
  //       // retrieving the signal value by using the property name
  //       signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
  //     })

  //     // returning the product returned by the API
  //     return response.data.product
  //   },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/Reservation/GetReservations",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  create: async function (newReservation, cancel = false) {
    await api.request({
      method: "POST",
      url: `/Reservation`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newReservation),
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ReservationAPI);
