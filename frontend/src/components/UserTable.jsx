function UserTable({
  users,
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

          <tr
            className="
              border-b
            "
          >

            <th
              className="
                text-left
                py-3
              "
            >
              Name
            </th>

            <th
              className="
                text-left
                py-3
              "
            >
              Email
            </th>

            <th
              className="
                text-left
                py-3
              "
            >
              Role
            </th>

            <th
              className="
                text-left
                py-3
              "
            >
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map(user => (

            <tr
              key={user.id}
              className="
                border-b
              "
            >

              <td
                className="
                  py-4
                "
              >
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>

                {user.role ===
                  "ATTENDEE" ? (

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                      font-medium
                    "
                  >
                    ATTENDEE
                  </span>

                ) : (

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      bg-purple-100
                      text-purple-700
                      text-sm
                      font-medium
                    "
                  >
                    ORGANIZER
                  </span>

                )}

              </td>

              <td>

                {user.role !==
                  "ADMIN" && (

                  <button
                    onClick={() =>
                      onDelete(
                        user.id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded-lg
                    "
                  >
                    Delete
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default UserTable;