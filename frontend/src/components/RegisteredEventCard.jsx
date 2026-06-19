import { useNavigate } from "react-router-dom";

function RegisteredEventCard({ registration }) {

  const navigate = useNavigate();

  const event = registration.event;

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
        min-h-[300px]
        p-4
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
          mt-2
        "
      >
        {event.venue}
      </p>

      <div
        className="
          mt-2
        "
      >

        <span
          className="
            inline-block
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          ✓ Registered
        </span>

      </div>

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

  );

}

export default RegisteredEventCard;