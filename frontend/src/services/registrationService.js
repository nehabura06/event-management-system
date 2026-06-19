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

export const getEventRegistrationCount =
  (eventId) =>
    axios.get(
      `${API_URL}/count/${eventId}`
    );

export const getOrganizerRegistrationCount =
  () =>
    axios.get(
      `${API_URL}/organizer/count`,
      getAuthHeader()
    );

export const getRegisteredEventsCount =
  () =>
    axios.get(
      `${API_URL}/attendee/count`,
      getAuthHeader()
    );

export const getUpcomingRegisteredCount =
  () =>
    axios.get(
      `${API_URL}/attendee/upcoming`,
      getAuthHeader()
    );

export const getPastRegisteredCount =
  () =>
    axios.get(
      `${API_URL}/attendee/past`,
      getAuthHeader()
    );

 export const getMyRegistrations =
   () =>
     axios.get(
       `${API_URL}/my`,
       getAuthHeader()
     );