import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function OrganizerEventCard({ event }) {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] =
    useState(false);

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
     {/* Three Dots Menu */}

      <div
        className="
          flex
          justify-end
          relative
        "
      >

        <button
          onClick={() =>
            setShowMenu(
              !showMenu
            )
          }
          className="
            text-gray-500
            hover:text-gray-700
          "
        >
          <BsThreeDotsVertical
            size={20}
          />
        </button>

        {showMenu && (

          <div
            className="
              absolute
              top-8
              right-0
              bg-white
              shadow-lg
              rounded-xl
              border
              w-40
              z-10
              overflow-hidden
            "
          >

            <button
              onClick={() =>
                navigate(
                  `/edit-event/${event.id}`
                )
              }
              className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
            >
              Edit Event
            </button>

            <button
              className="
                w-full
                text-left
                px-4
                py-3
                text-red-600
                hover:bg-red-50
              "
            >
              Delete Event
            </button>

          </div>

        )}

      </div>


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
          pt-4
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

{/*         <button */}
{/*           onClick={() => */}
{/*             navigate( */}
{/*               `/edit-event/${event.id}` */}
{/*             ) */}
{/*           } */}
{/*           className=" */}
{/*             flex-1 */}
{/*             bg-amber-100 */}
{/*             text-amber-700 */}
{/*             py-2 */}
{/*             rounded-xl */}
{/*             font-medium */}
{/*           " */}
{/*         > */}
{/*           Edit */}
{/*         </button> */}

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