const config = {
  baseApiUrl: "https://localhost:4000",
};

const dateTimeFormatter = Intl.DateTimeFormat("it-IT", {
  hour: "numeric",
  minute: "numeric",
});

export default config;
export { dateTimeFormatter };
