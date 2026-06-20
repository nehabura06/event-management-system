import {
  useEffect,
  useState
} from "react";

import Navbar
  from "../components/Navbar";

import Footer
  from "../components/Footer";

import {
  getUpcomingEvents
} from "../services/eventService";

import RegisteredEventCard
  from "../components/RegisteredEventCard";

import {
  getRegisteredEventsCount,
  getUpcomingRegisteredCount,
  getPastRegisteredCount,
  getMyRegistrations
} from "../services/registrationService";

function AttendeeDashboard() {

  const [
    registeredCount,
    setRegisteredCount
  ] = useState(0);

  const [
    upcomingCount,
    setUpcomingCount
  ] = useState(0);

  const [
    pastCount,
    setPastCount
  ] = useState(0);

  const [
    availableEvents,
    setAvailableEvents
  ] = useState(0);

  const [
    registrations,
    setRegistrations
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

//         const registeredResponse =
//           await getRegisteredEventsCount();
//
//         const upcomingResponse =
//           await getUpcomingRegisteredCount();
//
//         const pastResponse =
//           await getPastRegisteredCount();
//
//         const availableResponse =
//           await getUpcomingEvents();
//
//         const registrationsResponse =
//           await getMyRegistrations();
const [
  registeredResponse,
  upcomingResponse,
  pastResponse,
  availableResponse,
  registrationsResponse
] = await Promise.all([
  getRegisteredEventsCount(),
  getUpcomingRegisteredCount(),
  getPastRegisteredCount(),
  getUpcomingEvents(),
  getMyRegistrations()
]);

        setRegisteredCount(
          registeredResponse.data
        );

        setUpcomingCount(
          upcomingResponse.data
        );

        setPastCount(
          pastResponse.data
        );

        setAvailableEvents(
          availableResponse.data.length
        );

        setRegistrations(
          registrationsResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

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

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-indigo-700
              "
            >
              Welcome Attendee
            </h1>

            <p
              className="
                text-gray-600
                mt-1
              "
            >
              Discover events, manage registrations and stay updated.
            </p>

          </div>

          {/* Stats Cards */}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-6
              mt-10
            "
          >

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
                {registeredCount}
              </h3>

              <p
                className="
                  text-gray-600
                  mt-1
                "
              >
                Registered Events
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
                  text-3xl
                  font-bold
                  text-green-600
                "
              >
                {availableEvents}
              </h3>

              <p
                className="
                  text-gray-600
                  mt-1
                "
              >
                Available Events
              </p>

            </div>

          </div>

          {/* My Registrations */}

          <h2
            className="
              text-2xl
              font-bold
              text-indigo-700
              mt-12
              mb-6
            "
          >
            My Registrations
          </h2>

          {loading ? (

            <p>
              Loading...
            </p>

          ) : registrations.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                shadow
                p-10
                text-center
              "
            >

              <p
                className="
                  text-gray-500
                "
              >
                No registrations yet.
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

              {registrations.map(
                registration => (

                  <RegisteredEventCard
                    key={registration.id}
                    registration={registration}
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

export default AttendeeDashboard;