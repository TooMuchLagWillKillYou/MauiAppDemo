import axios from "axios";

export const api = axios.create({
  //   withCredentials: true,
  baseURL: "https://localhost:44387/api",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   //  "Access-Control-Allow-Headers":
  //   //    "Origin, X-Requested-With, Content-Type, Accept",
  //   "Content-Type": "application/json",
  // },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
