export function defaultHeaders() {
  return {
    "Content-Type": "application/json",
    accept: "application/json",
    origin: process.env.API_ORIGIN,
    referer: process.env.API_REFERER,
  };
}
