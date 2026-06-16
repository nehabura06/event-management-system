import axios from "axios";

const API_URL =
  "http://localhost:8080/api/registrations";

const getAuthHeader = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const registerForEvent = (
  eventId
) =>
  axios.post(
    API_URL,
    { eventId },
    getAuthHeader()
  );

export const cancelRegistration = (
  eventId
) =>
  axios.delete(
    `${API_URL}/${eventId}`,
    getAuthHeader()
  );

export const getAvailableSeats = (
  eventId
) =>
  axios.get(
    `${API_URL}/seats/${eventId}`
  );

export const checkRegistration = (
  eventId
) =>
  axios.get(
    `${API_URL}/check/${eventId}`,
    getAuthHeader()
  );