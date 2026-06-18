import { useState, useEffect } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar
  from "../components/Navbar";

import Footer
  from "../components/Footer";

import {
  addSchedule, getSchedules
} from "../services/scheduleService";

function AddSchedule() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  useEffect(() => {

    fetchSchedules();

  }, []);

  const fetchSchedules =
    async () => {

      try {

        const response =
          await getSchedules(id);

        setSchedules(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const [loading,
    setLoading] =
    useState(false);

  const [schedules,
    setSchedules] =
    useState([]);

  const [scheduleData,
    setScheduleData] =
    useState({

      eventId: id,

      sessionTitle: "",

      speakerName: "",

      description: "",

      startTime: "",

      endTime: ""

    });

  const handleChange =
    (e) => {

      setScheduleData({

        ...scheduleData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

//         await addSchedule(
//           scheduleData
//         );
//
//         alert(
//           "Schedule added successfully"
//         );
//
//         navigate(
//           "/organizer"
//         );
await addSchedule(
  scheduleData
);

alert(
  "Session added successfully"
);

await fetchSchedules();

setScheduleData({

  eventId: id,

  sessionTitle: "",

  speakerName: "",

  description: "",

  startTime: "",

  endTime: ""

});

      } catch (error) {

        alert(
          error.response?.data ||
          "Failed to add schedule"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        bg-gray-50
        min-h-screen
      "
    >

      <Navbar />

      <section
        className="
          pt-24
          pb-12
          px-6
        "
      >

        <div
          className="
            max-w-3xl
            mx-auto
          "
        >

          <div
            className="
              text-center
              mb-6
            "
          >

            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
              "
            >
              Add Schedule
            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Create event sessions and agenda
            </p>

          </div>

          <div
            className="
              bg-white
              p-5
              rounded-2xl
              shadow-lg
            "
          >

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* Session Title */}

              <div className="mb-5">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Session Title
                </label>

                <input
                  type="text"
                  name="sessionTitle"
                  value={
                    scheduleData.sessionTitle
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    border
                    p-3
                    rounded-xl
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                />

              </div>

              {/* Speaker */}

              <div className="mb-5">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Speaker Name
                </label>

                <input
                  type="text"
                  name="speakerName"
                  value={
                    scheduleData.speakerName
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    border
                    p-3
                    rounded-xl
                  "
                />

              </div>

              {/* Description */}

              <div className="mb-5">

                <label
                  className="
                    block
                    font-medium
                    mb-2
                  "
                >
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={
                    scheduleData.description
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    border
                    p-3
                    rounded-xl
                  "
                />

              </div>

              {/* Times */}

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-4
                "
              >

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    Start Time
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={
                      scheduleData.startTime
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  />

                </div>

                <div>

                  <label
                    className="
                      block
                      font-medium
                      mb-2
                    "
                  >
                    End Time
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={
                      scheduleData.endTime
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      border
                      p-3
                      rounded-xl
                    "
                  />

                </div>

              </div>

              {/* Button */}

              <div
                className="
                  mt-5
                  flex
                  justify-center
                  gap-4
                "
              >

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="
                    w-50
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    text-white
                    py-2.5
                    rounded-xl
                    font-semibold
                    hover:scale-105
                    transition
                    duration-300
                  "
                >

                  {loading
                    ? "Adding Schedule..."
                    : "Add Schedule"}

                </button>


                  <button
                    type="button"
                    onClick={() =>
                      navigate("/organizer")
                    }
                    className="
                      w-50
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                      text-white
                      py-2.5
                      rounded-xl
                      font-semibold
                      hover:scale-105
                      transition
                      duration-300
                    "
                  >
                    Done
                  </button>

              </div>
              <div
                                                className="
                                                  mt-3
                                                  text-center
                                                "
                                              >

                                                <p
                                                  className="
                                                    text-indigo-700
                                                    font-semibold
                                                  "
                                                >
                                                  Sessions Added:
                                                  {" "}
                                                  {schedules.length}
                                                </p>

                                              </div>

            </form>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default AddSchedule;