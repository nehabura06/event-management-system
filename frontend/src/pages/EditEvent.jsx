import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createEvent, getEventById, updateEvent }
  from "../services/eventService";
//
// import {
//   getEventById,
//   updateEvent
// } from "../services/eventService";

function CreateEvent() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading,
    setLoading] = useState(false);

  const [eventData,
    setEventData] = useState({

      title: "",
      description: "",
      venue: "",
      date: "",
      endDate: "",
      time: "",
      capacity: "",
      category: "",
      organizer: "",
      contactEmail: "",

    });

useEffect(() => {

  fetchEvent();

}, []);

const fetchEvent =
  async () => {

    try {

      const response =
        await getEventById(id);

      setEventData(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setEventData({

      ...eventData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await updateEvent(
              id,
            eventData
          );

        alert(
          response.data
        );

        navigate(
          "/organizer"
        );

      } catch (error) {

          console.log(error);

          console.log(
            error.response
          );

          alert(
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Event creation failed"
          );

        } finally {

        setLoading(false);

      }

    };

  const handleReset = () => {

    setEventData({

      title: "",
      description: "",
      venue: "",
      date: "",
      time: "",
      capacity: "",
      category: "",
      organizer: "",
      contactEmail: "",

    });

  };

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <section
        className="
          pt-24
          pb-12
          px-6
        "
      >

        <div
          className="
            max-w-3xl
            mx-auto
          "
        >

          <div
            className="
              text-center
              mb-6
            "
          >

            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
              "
            >
              Edit Event
            </h1>

          </div>

          <div
            className="
              bg-white
              p-5
              rounded-2xl
              shadow-lg
            "
          >

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* Title */}

              <div className="mb-5">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    eventData.title
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="
                  Enter event title
                  "
                  className="
                    w-full
                    border
                p-3
                    rounded-xl
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              {/* Description */}

              <div className="mb-5">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Description
                </label>

                <textarea
                  rows="3"
                  name="description"
                  value={
                    eventData.description
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="
                    Describe the event
                  "
                  className="
                    w-full
                    border
                    p-3
                    rounded-xl
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-4
                "
              >

                {/* Category */}

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      eventData.category
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="WORKSHOP">
                      Workshop
                    </option>

                    <option value="CONFERENCE">
                      Conference
                    </option>

                    <option value="HACKATHON">
                      Hackathon
                    </option>

                    <option value="SEMINAR">
                      Seminar
                    </option>

                    <option value="CULTURAL">
                      Cultural
                    </option>

                    <option value="COMPETITION">
                      Competition
                    </option>

                  </select>

                </div>

                {/* Capacity */}

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    Capacity
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    value={
                      eventData.capacity
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="
                      Enter capacity
                    "
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  />

                </div>

              </div>

              {/* Venue */}

              <div className="mt-4">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={
                    eventData.venue
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    border
                    p-3
                    rounded-xl
                  "
                />

              </div>

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-4
                  mt-4
                "
              >

                {/* Date */}

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={
                      eventData.date
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  />

                </div>

{/*                 End Date */}
<div>

  <label
    className="
      block
      mb-2
      font-medium
    "
  >
    End Date
  </label>

  <input
    type="date"
    name="endDate"
    value={eventData.endDate}
    onChange={handleChange}
    required
    className="
      w-full
      border
      p-3
      rounded-xl
    "
  />

</div>

                {/* Time */}

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={
                      eventData.time
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  />

                </div>

              </div>

              {/* Organizer */}

              <div
                className="
                  mt-8
                  border-t
                  pt-6
                "
              >

                <h2
                  className="
                    text-xl
                    font-semibold
                    mb-3
                  "
                >
                  Organizer Details
                </h2>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                >

                  <input
                    type="text"
                    name="organizer"
                    value={
                      eventData.organizer
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="
                      Organizer Name
                    "
                    className="
                      border
                      p-3
                      rounded-xl
                    "
                  />

                  <input
                    type="email"
                    name="contactEmail"
                    value={
                      eventData.contactEmail
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="
                      Contact Email
                    "
                    className="
                      w-full
                        border
                        p-3
                        rounded-xl
                    "
                  />

                </div>

              </div>

              {/* Buttons */}

              <div
                className="
                  mt-6
                  flex
                  gap-4
                "
              >

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="
                    w-60
                    max-w-md
                    mx-auto
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    text-white
                    py-2.5
                    rounded-xl
                    font-semibold
                    text-0.5xl
                    hover:scale-105
                    transition
                    duration-300

                  "
                >

                  {loading
                    ? "Updating Event..."
                    : "Update Event"}

                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default CreateEvent;