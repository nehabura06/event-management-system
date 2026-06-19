import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUpcomingEvents,
} from "../services/eventService";

function UpcomingEvents() {

  const [events, setEvents] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const response =
        await getUpcomingEvents();

      // Show only first 3 events
      setEvents(
        response.data.slice(0, 3)
      );

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <section className="py-8 px-8 bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">

          <p
            className="
              text-indigo-600
              font-bold
              uppercase
              text-3xl
            "
          >
            Upcoming Events
          </p>

          <p
            className="
              text-gray-600
              mt-2
            "
          >
            Explore exciting upcoming events.
          </p>

        </div>

        <div
          className="
            grid
            md:grid-cols-3
            gap-5
            max-w-6xl
            mx-auto
          "
        >

          {events.map((event) => {

            const formattedDate =
              new Date(event.date)
                .toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

            return (

              <div
                key={event.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  hover:-translate-y-2
                  transition
                  flex
                  flex-col
                  min-h-[320px]
                  p-6

                "
              >

                <div
                  className="
                    flex
                    flex-col
                    flex-grow
                  "
                >

                  <p
                    className="
                      text-indigo-700
                      text-sm
                    "
                  >
                    {formattedDate}
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-1

                    "
                  >
                    {event.title}
                  </h3>

                  <p
                    className="
                      text-gray-600
                      mt-2
                      line-clamp-2
                    "
                  >
                    {event.description}
                  </p>

                  <p
                    className="
                      text-gray-700
                      mt-3
                    "
                  >
                    {event.venue}
                  </p>

                  <p
                    className="
                      text-purple-600
                      mt-1
                    "
                  >
                    Capacity:
                    {" "}
                    {event.capacity}
                  </p>

                  <div
                    className="
                      mt-auto
                      pt-4
                    "
                  >

                    <button
                      onClick={() =>
                        navigate(
                          `/events/${event.id}`
                        )
                      }
                      className="
                        w-full
                        border
                        border-indigo-400
                        text-indigo-600
                        py-2
                        rounded-xl
                        font-semibold
                        hover:bg-indigo-50
                        transition
                      "
                    >
                      View Details →
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

        <div className="mt-8 text-center">

          <button
            onClick={() =>
              navigate("/events")
            }
            className="
              px-8
              py-3
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-white
              font-semibold
            "
          >
            View All Events
          </button>

        </div>

      </div>

    </section>

  );
}

export default UpcomingEvents;