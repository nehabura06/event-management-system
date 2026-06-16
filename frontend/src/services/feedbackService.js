import axios from "axios";

const API_URL =
  "http://localhost:8080/api/feedback";

const getAuthHeader = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getFeedbackByEvent =
  (eventId) =>
    axios.get(
      `${API_URL}/event/${eventId}`
    );

export const submitFeedback =
  (data) =>
    axios.post(
      API_URL,
      data,
      getAuthHeader()
    );

export const checkFeedback = (eventId) =>
  axios.get(
    `${API_URL}/check/${eventId}`,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );