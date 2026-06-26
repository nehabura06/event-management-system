import {
  useEffect,
  useState
} from "react";

import Navbar
  from "../components/Navbar";

import Footer
  from "../components/Footer";

import UserTable
  from "../components/UserTable";

import AdminEventTable
  from "../components/AdminEventTable";

import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllAdminEvents,
  deleteEvent,
  getInsights
} from "../services/adminService";

function AdminDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [
    stats,
    setStats
  ] = useState({});

  const [
    users,
    setUsers
  ] = useState([]);

  const [
    events,
    setEvents
  ] = useState([]);
  const [showAllUsers,
    setShowAllUsers] =
    useState(false);

  const [showAllEvents,
    setShowAllEvents] =
    useState(false);

  const [
    insights,
    setInsights
  ] = useState({});

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      try {

        const statsResponse =
          await getAdminStats();

        const usersResponse =
          await getAllUsers();

        const eventsResponse =
          await getAllAdminEvents();

        const insightsResponse =
          await getInsights();

        setInsights(
          insightsResponse.data
        );

        setStats(
          statsResponse.data
        );

        setUsers(
          usersResponse.data
        );

        setEvents(
          eventsResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

            setLoading(false);

      }

    };

//   const handleDeleteUser =
//     async (id) => {
//
//       if (
//         !window.confirm(
//           "Delete this user?"
//         )
//       ) {
//         return;
//       }
//
//       await deleteUser(id);
//
//       fetchData();
//
//     };
const handleDeleteUser =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?\n\nThis action cannot be undone."
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteUser(id);

      fetchData();

      alert(
        "User deleted successfully."
      );

    } catch (error) {

      alert(
        "Failed to delete user."
      );

      console.error(error);

    }

  };

//   const handleDeleteEvent =
//     async (id) => {
//
//       if (
//         !window.confirm(
//           "Delete this event?"
//         )
//       ) {
//         return;
//       }
//
//       await deleteEvent(id);
//
//       fetchData();
//
//     };
const handleDeleteEvent =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?\n\nThis action cannot be undone."
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteEvent(id);

      fetchData();

      alert(
        "Event deleted successfully."
      );

    } catch (error) {

      alert(
        "Failed to delete event."
      );

      console.error(error);

    }

  };

  if (loading) {

      return (

        <div
          className="
            min-h-screen
            flex
            justify-center
            items-center
          "
        >

          <div
            className="
              h-10
              w-10
              border-4
              border-indigo-600
              border-t-transparent
              rounded-full
              animate-spin
            "
          ></div>

        </div>

      );

    }
const displayedUsers =
  showAllUsers
    ? users
    : users.slice(0, 5);

const displayedEvents =
  showAllEvents
    ? events
    : events.slice(0, 5);

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
          pt-24
          pb-14
          px-4
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
              Welcome Admin
            </h1>

            <p
              className="
                text-gray-600
                mt-1
              "
            >
              Manage users, events and platform statistics.
            </p>

          </div>

          {/* Stats */}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-5
              gap-6
              mt-8
            "
          >

            <StatCard
              title="Users"
              value={stats.users}
              color="text-indigo-700"
            />

            <StatCard
              title="Organizers"
              value={stats.organizers}
              color="text-purple-700"
            />

            <StatCard
              title="Attendees"
              value={stats.attendees}
              color="text-pink-600"
            />

            <StatCard
              title="Events"
              value={stats.events}
              color="text-amber-600"
            />

            <StatCard
              title="Registrations"
              value={stats.registrations}
              color="text-green-600"
            />

          </div>
          <h2
            className="
              text-2xl
              font-bold
              text-indigo-700
              mt-12
              mb-4
            "
          >
            Quick Insights
          </h2>

          <div
            className="
              grid
              md:grid-cols-2
              gap-4
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                shadow
                p-6
              "
            >

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Upcoming Events
              </h3>

              <p
                className="
                  text-4xl
                  font-bold
                  text-indigo-700
                  mt-2
                "
              >
                {
                  insights.upcomingEvents
                }
              </p>

            </div>

            <div
              className="
                bg-white
                rounded-3xl
                shadow
                p-4
              "
            >

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Past Events
              </h3>

              <p
                className="
                  text-4xl
                  font-bold
                  text-amber-600
                  mt-2
                "
              >
                {
                  insights.pastEvents
                }
              </p>

            </div>

          </div>

          {/* User Management */}

          <h2
            className="
              text-2xl
              font-bold
              text-indigo-700
              mt-10
              mb-4
            "
          >
            User Management
          </h2>

<UserTable
  users={displayedUsers}
  onDelete={handleDeleteUser}
/>
<div className="text-right mt-3">

  {users.length > 5 && (

    <button
      onClick={() =>
        setShowAllUsers(
          !showAllUsers
        )
      }
      className="
        text-indigo-700
        font-semibold
        hover:underline
      "
    >
      {showAllUsers
        ? "Show Less"
        : "View All Users "}
    </button>

  )}

</div>

          {/* Event Management */}

          <h2
            className="
              text-2xl
              font-bold
              text-indigo-700
              mt-10
              mb-4
            "
          >
            Event Management
          </h2>

<AdminEventTable
  events={displayedEvents}
  onDelete={handleDeleteEvent}
/>
<div className="text-right mt-3">

  {events.length > 5 && (

    <button
      onClick={() =>
        setShowAllEvents(
          !showAllEvents
        )
      }
      className="
        text-indigo-700
        font-semibold
        hover:underline
      "
    >
      {showAllEvents
        ? "Show Less"
        : "View All Events "}
    </button>

  )}

</div>

        </div>

      </div>

      <Footer />

    </>

  );

}

function StatCard({
  title,
  value,
  color
}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-5
        shadow
      "
    >

      <h3
        className={`
          text-3xl
          font-bold
          ${color}
        `}
      >
        {value ?? 0}
      </h3>

      <p
        className="
          text-gray-700
          mt-1
        "
      >
        {title}
      </p>

    </div>

  );

}

export default AdminDashboard;