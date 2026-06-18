// import { useNavigate } from "react-router-dom";
//
// function OrganizerEventCard({ event }) {
//
//   const navigate = useNavigate();
//
//   return (
//
//     <div
//       className="
//         bg-white
//         rounded-3xl
//         shadow-lg
//         p-5
//         hover:-translate-y-1
//         transition
//       "
//     >
//
//       <h3
//         className="
//           text-xl
//           font-bold
//           text-indigo-700
//         "
//       >
//         {event.title}
//       </h3>
//
//       <p className="mt-3 text-gray-600">
//         📍 {event.venue}
//       </p>
//
//       <p className="text-gray-600">
//         📅 {event.date}
//         {event.endDate &&
//           ` - ${event.endDate}`}
//       </p>
//
//       <p className="text-gray-600">
//         ⏰ {event.time}
//       </p>
//
//       <p className="text-purple-600 mt-1">
//         👥 Capacity:
//         {" "}
//         {event.capacity}
//       </p>
//
//       <p className="text-gray-500 mt-1">
//         🏷 {event.category}
//       </p>
//
//       <div
//         className="
//           mt-5
//           flex
//           gap-2
//         "
//       >
//
//         <button
//           onClick={() =>
//             navigate(
//               `/events/${event.id}`
//             )
//           }
//           className="
//             flex-1
//             border
//             border-indigo-500
//             text-indigo-600
//             py-2
//             rounded-xl
//             font-medium
//           "
//         >
//           View
//         </button>
//
//         <button
//           disabled
//           className="
//             flex-1
//             bg-amber-100
//             text-amber-700
//             py-2
//             rounded-xl
//             font-medium
//             cursor-not-allowed
//           "
//         >
//           Edit
//         </button>
//
//         <button
//           onClick={() =>
//             navigate(
//               `/add-schedule/${event.id}`
//             )
//           }
//           className="
//             flex-1
//             bg-gradient-to-r
//             from-indigo-600
//             to-purple-600
//             text-white
//             py-2
//             rounded-xl
//             font-medium
//           "
//         >
//           Schedule
//         </button>
//
//       </div>
//
//     </div>
//
//   );
// }
//
// export default OrganizerEventCard;


import { useNavigate } from "react-router-dom";

function OrganizerEventCard({ event }) {

  const navigate = useNavigate();

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

      <p
        className="
          text-indigo-700
          text-0.5xl
        "
      >
        {formattedDate}
      </p>

      <h3
        className="
          text-2xl
          font-bold
          mt-2
        "
      >
        {event.title}
      </h3>

      <p
        className="
          text-gray-600
          mt-3
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
      <p
        className="
          text-green-600
          font-medium
          mt-1
        "
      >
        Registrations:
        {" "}
        {event.registrationCount || 0}
      </p>

      <p className="text-gray-700 mt-1">
        Category:{" "}
        {event.category
          .charAt(0)
          .toUpperCase() +
          event.category
            .slice(1)
            .toLowerCase()}
      </p>

      <div
        className="
          mt-auto
          pt-5
          flex
          gap-2
        "
      >

        <button
          onClick={() =>
            navigate(
              `/events/${event.id}`
            )
          }
          className="
            flex-1
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
          View
        </button>

        <button
          onClick={() =>
            navigate(
              `/edit-event/${event.id}`
            )
          }
          className="
            flex-1
            bg-amber-100
            text-amber-700
            py-2
            rounded-xl
            font-medium
          "
        >
          Edit
        </button>

        <button
          onClick={() =>
            navigate(
              `/add-schedule/${event.id}`
            )
          }
          className="
            flex-1
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            text-white
            py-2
            rounded-xl
            font-semibold
          "
        >
          Schedule
        </button>

      </div>

    </div>

  );

}

export default OrganizerEventCard;