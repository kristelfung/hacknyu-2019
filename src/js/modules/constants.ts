export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const STOPS_COUNT = 5;

export const ALERT_TIME_INTERVALS = {
  ANIMATION_BUFFER: 100,
  DISPLAY_TIME: 4000,
  ANIMATION_TIME: 2000
};

export const UNRESTRICTED_ROUTES = new Set([
  "/",
  "/about",
  "/login",
  "/register"
]);
