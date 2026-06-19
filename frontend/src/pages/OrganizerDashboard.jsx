import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar
  from "../components/Navbar";

import Footer
  from "../components/Footer";

import OrganizerEventCard
  from "../components/OrganizerEventCard";

import {
  getMyEvents
} from "../services/eventService";

import {
  getOrganizerRegistrationCount
} from "../services/registrationService";

function OrganizerDashboard() {

  const navigate =
    useNavigate();

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    totalRegistrations,
    setTotalRegistrations
  ] = useState(0);

  useEffect(() => {

    fetchMyEvents();

  }, []);

  const fetchMyEvents =
    async () => {

      try {

        const response =
          await getMyEvents();

        setEvents(
          response.data
        );
    const registrationResponse =
      await getOrganizerRegistrationCount();

    setTotalRegistrations(
      registrationResponse.data
    );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

const today = new Date();

today.setHours(0, 0, 0, 0);

const upcomingCount =
  events.filter(event => {

    const eventDate =
      new Date(event.date);

    eventDate.setHours(
      0,
      0,
      0,
      0
    );

    return eventDate >= today;

  }).length;

const pastCount =
  events.filter(event => {

    const eventDate =
      new Date(event.date);

    eventDate.setHours(
      0,
      0,
      0,
      0
    );

    return eventDate < today;

  }).length;

  return (
    <>

      <Navbar />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-indigo-100
          via-white
          to-purple-100
          pt-28
          pb-16
          px-6
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          {/* Hero */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-3
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-indigo-700
                "
              >
                Welcome Organizer
              </h1>

              <p
                className="
                  text-gray-600
                  mt-1
                "
              >
                Manage your events efficiently and engage attendees.
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/create-event"
                )
              }
              className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:scale-105
                transition
              "
            >
              + Create Event
            </button>

          </div>

<div
  className="
    grid
    md:grid-cols-2
    lg:grid-cols-4
    gap-6
    mt-10
  "
>

  {/* Events Created */}

  <div
    className="
      bg-white
      rounded-3xl
      p-6
      shadow
    "
  >
    <h3
      className="
        text-3xl
        font-bold
        text-indigo-700
      "
    >
      {events.length}
    </h3>

    <p
      className="
        text-gray-600
        mt-1
      "
    >
      Events Created
    </p>

  </div>

  {/* Upcoming */}

  <div
    className="
      bg-white
      rounded-3xl
      p-6
      shadow
    "
  >
    <h3
      className="
        text-3xl
        font-bold
        text-purple-700
      "
    >
      {upcomingCount}
    </h3>

    <p
      className="
        text-gray-600
        mt-1
      "
    >
      Upcoming Events
    </p>

  </div>

  {/* Past */}

  <div
    className="
      bg-white
      rounded-3xl
      p-6
      shadow
    "
  >
    <h3
      className="
        text-3xl
        font-bold
        text-amber-600
      "
    >
      {pastCount}
    </h3>

    <p
      className="
        text-gray-600
        mt-1
      "
    >
      Past Events
    </p>

  </div>

<div
  className="
    bg-white
    rounded-3xl
    p-6
    shadow
  "
>
  <h3
    className="
      text-2xl
      font-bold
      text-green-600
    "
  >
    {totalRegistrations}
  </h3>

  <p
    className="
      text-gray-600
      mt-2
    "
  >
    Registrations
  </p>

</div>
</div>

          {/* My Events */}

          <h2
            className="
              text-2xl
                  font-bold
                  text-indigo-700
                  mt-12
                  mb-6
                "
          >
            My Events
          </h2>

          {loading ? (

            <p>
              Loading...
            </p>

          ) : events.length === 0 ? (

            <div
              className="
                bg-white
                p-10
                rounded-3xl
                shadow
                text-center
              "
            >

              <h3
                className="
                  text-xl
                  font-semibold
                "
              >
                No events created yet
              </h3>

              <p
                className="
                  text-gray-500
                  mt-2
                "
              >
                Create your first event.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {events.map(
                event => (

                  <OrganizerEventCard
                    key={event.id}
                    event={event}
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

      <Footer />

    </>
  );
}

export default OrganizerDashboard;