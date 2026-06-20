import {
  Link
} from "react-router-dom";

function AdminEventTable({
  events,
  onDelete
}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow
        p-6
        overflow-x-auto
      "
    >

      <table
        className="
          w-full
        "
      >
<thead>
  <tr className="border-b text-left text-lg">

    <th className="w-[40%] py-3">
      Event
    </th>

    <th className="w-[25%] py-3">
      Organizer
    </th>

    <th className="w-[15%] py-3">
      Date
    </th>

    <th className="w-[20%] py-3 text-center">
      Actions
    </th>

  </tr>
</thead>

        <tbody>

          {events.map(event => (

            <tr
              key={event.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-5">
                <h3 className="font-bold text-lg">
                  {event.title}
                </h3>

                <span
                  className="
                    inline-block
                    mt-1
                    px-3 py-1
                    rounded-full
                    bg-indigo-100
                    text-indigo-700
                    text-xs
                  "
                >
                  {event.category}
                </span>
              </td>

              <td>
                {event.organizer}
              </td>

              <td>
                {new Date(event.date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }
                )}
              </td>

              <td>
                <div className="flex justify-center gap-2">

                  <Link
                    to={`/events/${event.id}`}
                    className="
                      bg-indigo-600
                      text-white
                      px-4 py-2
                      rounded-lg
                    "
                  >
                    View
                  </Link>

                  <button
                    onClick={() => onDelete(event.id)}
                    className="
                      bg-red-500
                      text-white
                      px-4 py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminEventTable;