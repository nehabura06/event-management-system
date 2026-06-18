import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AttendeeDashboard from "../pages/AttendeeDashboard";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";

import CreateEvent
  from "../pages/CreateEvent";

import EditEvent
  from "../pages/EditEvent";

import AddSchedule
  from "../pages/AddSchedule";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/attendee"
          element={<AttendeeDashboard />}
        />

        <Route
          path="/organizer"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/create-event"
          element={<CreateEvent />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/edit-event/:id"
          element={<EditEvent />}
        />

        <Route
          path="/add-schedule/:id"
          element={<AddSchedule />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;