import { useNavigate } from "react-router-dom";

function OrganizerDashboard() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-6">
        Attendee Dashboard
      </h1>

      <button
        onClick={logout}
        className="
          bg-red-500
          text-white
          px-4 py-2
          rounded-lg
        "
      >
        Logout
      </button>

    </div>
  );
}

export default OrganizerDashboard;