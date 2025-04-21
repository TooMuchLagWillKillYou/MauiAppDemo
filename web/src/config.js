const config = {
  baseApiUrl: "https://localhost:4000/api",
};
const endpoints = {
  reservation: {
    getAll: "/reservation/getAll",
    getByDate: (date) => `/reservation/getByDate/${date}`,
    get: (id) => `/reservation/get/${id}`,
    add: "/reservation/add",
    update: "/reservation/update",
    delete: (id) => `/reservation/delete/${id}`,
  },
  pizza: {
    getAll: "/pizza/getAll",
    add: "/pizza/add",
    update: "/pizza/update",
    delete: (id) => `/pizza/delete/${id}`,
  },
};
const dateTimeFormatter = Intl.DateTimeFormat("it-IT", {
  hour: "numeric",
  minute: "numeric",
});

export default config;
export { dateTimeFormatter, endpoints };
