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