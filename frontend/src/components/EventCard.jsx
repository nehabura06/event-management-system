import { useNavigate } from "react-router-dom";
// import { getUserRole } from "../utils/eventUtils";

function EventCard({ event }) {

  const navigate = useNavigate();

//   const role = getUserRole();

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

  const getImage = (category) => {

    switch (category) {

      case "WORKSHOP":
        return "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200";

      case "CONFERENCE":
        return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200";

      case "CULTURAL":
        return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200";

      case "HACKATHON":
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200";

      default:
        return "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200";
    }

  };


  return (

    <div
      className="
        bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
            hover:-translate-y-2
            transition
            flex
            flex-col
            min-h-[460px]
          "
    >

      <img
        src={getImage(event.category)}
        alt={event.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-3 flex flex-col flex-grow">

        <p className="text-indigo-700 text-sm">
          {formattedDate}

        </p>

        <h2 className="text-2xl font-bold mt-2">
          {event.title}
        </h2>

        <p className="text-gray-600 mt-2 line-clamp-3">
          {event.description}
        </p>

        <p className="mt-2 text-gray-600">
          {event.venue}
        </p>

        <p className="text-purple-600">
          Capacity: {event.capacity}
        </p>
<div className="mt-auto pt-3">

  <button
    onClick={() =>
      navigate(`/events/${event.id}`)
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
}

export default EventCard;