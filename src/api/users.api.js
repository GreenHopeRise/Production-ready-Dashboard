import api from "./axios";

export const getUsers = () =>
  api.get("/auth/users");