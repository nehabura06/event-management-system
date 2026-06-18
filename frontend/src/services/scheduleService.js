import axios from "axios";

const API_URL =
  "http://localhost:8080/api/schedules";

const authHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem(
        "token"
      )}`,
  },
});

export const addSchedule = (
  scheduleData
) =>
  axios.post(
    API_URL,
    scheduleData,
    authHeader()
  );

export const getSchedules =
  (eventId) =>
    axios.get(
      `${API_URL}/event/${eventId}`,
      authHeader()
    );

export const updateSchedule =
  (
    scheduleId,
    scheduleData
  ) =>
    axios.put(
      `${API_URL}/${scheduleId}`,
      scheduleData,
      authHeader()
    );

export const deleteSchedule =
  (scheduleId) =>
    axios.delete(
      `${API_URL}/${scheduleId}`,
      authHeader()
    );