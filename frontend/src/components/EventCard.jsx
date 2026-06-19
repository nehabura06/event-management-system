import { useNavigate } from "react-router-dom";

function EventCard({ event }) {

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
        p-6
        min-h-[320px]
      "
    >
        <div className="flex flex-col flex-grow">

        <p className="text-indigo-700 text-0.5xl">
          {formattedDate}

        </p>

        <h2 className="text-2xl font-bold mt-2">
          {event.title}
        </h2>

        <p className="text-gray-600 mt-2 line-clamp-3">
          {event.description}
        </p>

        <p className="mt-2 text-gray-700">
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