import { useEffect, useState } from "react";

import EventCard from "../components/EventCard";

import {
  getUpcomingEvents,
  searchEvents,
  getEventsByCategory,
} from "../services/eventService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Events() {

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const response =
        await getUpcomingEvents();

      setEvents(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

const handleSearch = async () => {

  if (search.trim() === "") {
    fetchEvents();
    return;
  }

  try {

    setLoading(true);

    const response =
      await searchEvents(search);

    setEvents(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

  const handleCategory = async (e) => {

    const selected =
      e.target.value;

    setCategory(selected);

    if (selected === "") {

      fetchEvents();

      return;
    }

    try {

      const response =
        await getEventsByCategory(
          selected
        );

      setEvents(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <section className="pt-24 pb-8 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <h1
            className="
              text-3xl md:text-4xl
              font-bold
              text-gray-900
            "
          >
            Discover Amazing Events
          </h1>

          <p
            className="
              text-gray-600
              mt-4
              text-lg
            "
          >
            Explore workshops,
            conferences,
            hackathons and cultural
            events.
          </p>

<div className="mt-4">

  <span
    className="
      bg-green-100
      text-green-700
      px-4
      py-3
      rounded-full
      text-sm
      font-medium
    "
  >
    Showing Upcoming Events Only
  </span>

</div>
          <div
            className="
              mt-8
              bg-white
              p-4
              rounded-3xl
              shadow-md
              grid
              md:grid-cols-3
              gap-4
            "
          >

            <input
              type="text"
              placeholder="Search by title or venue"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                if (e.target.value.trim() === "") {
                  fetchEvents();
                }
              }}
              className="
                border
                rounded-xl
                px-4
                py-3
                outline-none
              "
            />

            <select
              value={category}
              onChange={handleCategory}
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            >
              <option value="">
                All Categories
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

            <button
              onClick={handleSearch}
              className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                rounded-xl
                py-3
                font-semibold
              "
            >
              Search
            </button>

          </div>

        </div>

      </section>

      <section className="pb-20 px-8">

        <div className="max-w-7xl mx-auto">

          {loading ? (

            <h2 className="text-center">
              Loading events...
            </h2>

          ) : events.length === 0 ? (

            <h2 className="text-center">
              No events found
            </h2>

          ) : (

            <div
              className="
                grid
                md:grid-cols-3
                gap-8
              "
            >

              {events.map((event) => (

                <EventCard
                  key={event.id}
                  event={event}
                />

              ))}

            </div>

          )}

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default Events;