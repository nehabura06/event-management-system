import axios from "axios";

const API_URL =
  "http://localhost:8080/api/admin";

const getAuthHeader = () => {

  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  };

};

export const getAdminStats =
  () =>
    axios.get(
      `${API_URL}/stats`,
      getAuthHeader()
    );

export const getAllUsers =
  () =>
    axios.get(
      `${API_URL}/users`,
      getAuthHeader()
    );

export const deleteUser =
  (id) =>
    axios.delete(
      `${API_URL}/users/${id}`,
      getAuthHeader()
    );

export const getAllAdminEvents =
  () =>
    axios.get(
      `${API_URL}/events`,
      getAuthHeader()
    );

export const deleteEvent =
  (id) =>
    axios.delete(
      `${API_URL}/events/${id}`,
      getAuthHeader()
    );

export const getInsights =
  () =>
    axios.get(
      `${API_URL}/insights`,
      getAuthHeader()
    );