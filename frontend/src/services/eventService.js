import axios from "axios";

const API_URL = "http://localhost:8080/api/events";

export const getAllEvents = () =>
  axios.get(API_URL);

export const getUpcomingEvents = () =>
  axios.get(`${API_URL}/upcoming`);

export const getEventById = (id) =>
  axios.get(`${API_URL}/${id}`);
//
//export const searchEvents = (title) =>
//  axios.get(`${API_URL}/search?title=${title}`);
export const searchEvents = (keyword) =>
  axios.get(
    `${API_URL}/search?keyword=${keyword}`
  );

export const getEventsByCategory = (category) =>
  axios.get(`${API_URL}/category/${category}`);

export const createEvent = (
  eventData
) =>
  axios.post(
    API_URL,
    eventData,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem(
            "token"
          )}`,
      },
    }
  );

  export const getMyEvents = () =>
    axios.get(
      `${API_URL}/my`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem(
              "token"
            )}`,
        },
      }
    );

    export const updateEvent = (
      id,
      eventData
    ) =>
      axios.put(
        `${API_URL}/${id}`,
        eventData,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );