import api from "./axios";

export const getUsers = () =>
  api.get("/auth/users");

export const updateUserRole = (id, role) => api.put(`/auth/users/${id}/role`, {role})

export const deleteUser = (id)=> api.delete(`/auth/users/${id}`)