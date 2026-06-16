import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getEventById,
} from "../services/eventService";

import {
  getAvailableSeats,
  registerForEvent,
  cancelRegistration,
  checkRegistration,
} from "../services/registrationService";

import { getUserRole }
  from "../utils/eventUtils";

import {
  getFeedbackByEvent,
  submitFeedback,
  checkFeedback,
} from "../services/feedbackService";

function EventDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const role = getUserRole();

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [availableSeats,
    setAvailableSeats] =
    useState(0);

  const [registered,
    setRegistered] =
    useState(false);

  const [feedbacks,
    setFeedbacks] =
    useState([]);

const [registerLoading,
  setRegisterLoading] =
  useState(false);

const [feedbackSubmitted,
      setFeedbackSubmitted] =
      useState(false);

  const [feedbackData,
    setFeedbackData] =
    useState({
      rating: 0,
      comment: "",
    });
  useEffect(() => {

    fetchEvent();

  }, [id]);

  const fetchEvent = async () => {

    try {

      const eventResponse =
        await getEventById(id);

      setEvent(
        eventResponse.data
      );

      const seatsResponse =
        await getAvailableSeats(id);

      setAvailableSeats(
        seatsResponse.data
      );

      const feedbackResponse =
        await getFeedbackByEvent(id);

      setFeedbacks(
        feedbackResponse.data
      );

      if (role === "ATTENDEE") {

        try {

          const registerResponse =
            await checkRegistration(
              id
            );

          setRegistered(
            registerResponse.data
          );
      const feedbackCheck =
            await checkFeedback(id);

          setFeedbackSubmitted(
            feedbackCheck.data
          );

        } catch (error) {

          console.log(error);

        }

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
    const handleRegister =
      async () => {

        if (role === "GUEST") {

          alert(
            "Please login as attendee to register."
          );

          navigate("/login");

          return;
        }

        if (
          role === "ADMIN"
        ) {

          alert(
            "Admins cannot register for events."
          );

          return;
        }

        if (
          role === "ORGANIZER"
        ) {

          alert(
            "Organizer accounts cannot register for events."
          );

          return;
        }
//         try {
//
//           const response =
//             await registerForEvent(
//               id
//             );
//
//           alert(
//             response.data
//           );
//
//           setRegistered(true);
//
//           fetchEvent();
//
//         } catch (error) {
//
//           alert(
//             error.response?.data ||
//             "Registration failed"
//           );
//
//         }
try {

  setRegisterLoading(true);

  const response =
    await registerForEvent(
      id
    );

  alert(
    response.data
  );

  setRegistered(true);

  fetchEvent();

} catch (error) {

  alert(
    error.response?.data ||
    "Registration failed"
  );

} finally {

  setRegisterLoading(false);

}

      };
    const handleCancel =
      async () => {

        try {

          const response =
            await cancelRegistration(
              id
            );

          alert(
            response.data
          );

          setRegistered(false);

          fetchEvent();

        } catch (error) {

          alert(
            "Cancellation failed"
          );

        }

      };
    const handleFeedback =
      async (e) => {

        e.preventDefault();

        try {

          const response =
            await submitFeedback({
              eventId: id,
              rating:
                feedbackData.rating,
              comment:
                feedbackData.comment,
            });

          alert(
            response.data
          );

          setFeedbackData({
            rating: 0,
            comment: "",
          });

setFeedbackSubmitted(true);
          fetchEvent();

        } catch (error) {

          alert(
            error.response?.data ||
            "Feedback failed"
          );

        }

      };
    if (loading) {

      return (
        <h1 className="text-center mt-40">
          Loading...
        </h1>
      );

    }

    if (!event) {

      return (
        <h1 className="text-center mt-40">
          Event not found
        </h1>
      );

    }

    const formattedDate =
      new Date(event.date)
        .toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

    const formattedTime =
      new Date(
        `1970-01-01T${event.time}`
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit",
        }
      );

return (

  <div className="bg-gray-50 min-h-screen">

    <Navbar />

    <section className="pt-24 pb-8 px-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-4">

          {/* Category Badge */}

          <span
            className="
              bg-indigo-100
              text-indigo-700
              px-4 py-2
              rounded-full
              text-sm
              font-semibold
            "
          >
            {event.category}
          </span>

          {/* Title */}

          <h1
            className="
              text-3xl md:text-4xl
              font-bold
              mt-4
              text-gray-900
            "
          >
            {event.title}
          </h1>

          {/* Description */}

          <p
            className="
              text-gray-600
              mt-4
              leading-7
            "
          >
            {event.description}
          </p>

          {/* Event Info Cards */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-4
              mt-4
            "
          >

            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Date
              </h3>

              <p className="text-gray-600 mt-2">
                {formattedDate}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Time
              </h3>

              <p className="text-gray-600 mt-2">
                {formattedTime}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Venue
              </h3>

              <p className="text-gray-600 mt-2">
                {event.venue}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Seats Left
              </h3>

              <p className="text-gray-600 mt-2">
                {availableSeats}
              </p>
            </div>

          </div>

                    {/* Schedule */}

                    <div className="mt-4">

                      <h2 className="text-2xl font-bold">
                        Event Schedule
                      </h2>

                      <div
                        className="
                          mt-3
                          bg-indigo-50
                          p-5
                          rounded-2xl
                        "
                      >
                        <p className="text-gray-700">
                          Detailed schedules will be
                          integrated later.
                        </p>
                      </div>

                    </div>
                              {/* Feedback Section */}

                              <div className="mt-4">

                                <h2 className="text-2xl font-bold">
                                  Feedback & Ratings
                                </h2>

                                <div className="space-y-4 mt-4">

                                  {feedbacks.length === 0 ? (

                                    <div
                                      className="
                                        bg-gray-100
                                        p-5
                                        rounded-2xl
                                      "
                                    >
                                      No feedback available.
                                    </div>

                                  ) : (

                                    feedbacks.map(
                                      (feedback) => (

                                        <div
                                          key={feedback.id}
                                          className="
                                            bg-gray-100
                                            p-5
                                            rounded-2xl
                                          "
                                        >

                                          <div className="flex justify-between">

                                            <h3 className="font-semibold">
                                              {feedback.user?.name}
                                            </h3>

                                            <p className="text-yellow-500">
                                              ⭐ {feedback.rating}/5
                                            </p>

                                          </div>

                                          <p className="mt-2 text-gray-600">
                                            {feedback.comment}
                                          </p>

                                        </div>

                                      )
                                    )

                                  )}

                                </div>

{role === "ATTENDEE" &&
 !registered && (

  <div
    className="
      mt-4
      bg-yellow-50
      text-yellow-700
      p-4
      rounded-xl
    "
  >
    Register for this event
    to submit feedback.
  </div>

)}

                              </div>
                                      {role === "ATTENDEE" && registered && (

                                        <form
                                          onSubmit={handleFeedback}
                                          className="mt-4 space-y-4"
                                        >

                                          <h2 className="text-2xl font-bold">
                                            Submit Feedback
                                          </h2>

<div className="flex gap-2 text-3xl">

  {[1, 2, 3, 4, 5].map((star) => (

    <button
      key={star}
      type="button"
      onClick={() =>
        setFeedbackData({
          ...feedbackData,
          rating: star,
        })
      }
      className="
        transition
        hover:scale-125
      "
    >

      <span
        className={
          star <= feedbackData.rating
            ? "text-yellow-400"
            : "text-gray-300"
        }
      >
        ★
      </span>

    </button>

  ))}

</div>

                                          <textarea
                                            rows="4"
                                            placeholder="Write feedback..."
                                            value={
                                              feedbackData.comment
                                            }
                                            onChange={(e) =>
                                              setFeedbackData({
                                                ...feedbackData,
                                                comment:
                                                  e.target.value,
                                              })
                                            }
                                            className="
                                              w-full
                                              border
                                              p-3
                                              rounded-xl
                                            "
                                          />

                                          <button
                                            className="
                                              bg-gradient-to-r
                                              from-indigo-600
                                              to-purple-600
                                              text-white
                                              px-6 py-3
                                              rounded-xl
                                            "
                                          >
                                            Submit Feedback
                                          </button>

                                        </form>

                                      )}
                                            {/* Register Section */}

                                            <div className="mt-8">

                                              {availableSeats <= 0 ? (

                                                <button
                                                  disabled
                                                  className="
                                                      w-50
                                                      mx-auto
                                                      block
                                                      py-3
                                                      rounded-xl
                                                      bg-gray-400
                                                      text-white
                                                      text-xl
                                                      font-medium
                                                      cursor-not-allowed
                                                  "
                                                >
                                                   Event Full
                                                </button>

                                              ) : role === "ATTENDEE" && registered ? (

                                                <div className="flex justify-center gap-3">

                                                  <button
                                                    disabled
                                                    className="
                                                       w-50
                                                        py-3
                                                        rounded-xl
                                                        bg-green-600
                                                        text-white
                                                        text-xl
                                                        font-medium
                                                        cursor-not-allowed
                                                        "
                                                  >
                                                    Registered
                                                  </button>
                                                  {feedbackSubmitted && (

                                                        <p
                                                          className="
                                                            mt-2
                                                            text-green-600
                                                            text-xl
                                                            font-medium
                                                            text-center
                                                          "
                                                        >
                                                          Feedback Submitted
                                                        </p>

                                                      )}

                                                  {!feedbackSubmitted && (

                                                    <button
                                                      onClick={handleCancel}
                                                      className="
                                                        w-52
                                                          py-2
                                                          rounded-xl
                                                          bg-red-500
                                                          text-white
                                                          text-xl
                                                          font-medium
                                                        "
                                                    >
                                                      Cancel Registration
                                                    </button>

                                                  )}

                                                </div>

                                              ) : (

                                                <button
                                                  onClick={handleRegister}
                                                  disabled={registerLoading}
                                                  className="
                                                    w-56
                                                      mx-auto
                                                      block
                                                      py-3
                                                      rounded-xl
                                                      bg-gradient-to-r
                                                      from-indigo-600
                                                      to-purple-600
                                                      text-white
                                                      text-xl
                                                      font-medium
                                                      hover:scale-[1.02]
                                                      transition
                                                      disabled:opacity-70
                                                      disabled:cursor-not-allowed
                                                  "
                                                >
                                                  {
                                                    registerLoading
                                                      ? "Registering..."
                                                      : role === "GUEST"
                                                      ? "Login to Register"
                                                      : role === "ORGANIZER"
                                                      ? "Organizers Cannot Register"
                                                      : role === "ADMIN"
                                                      ? "Admins Cannot Register"
                                                      : "Register Now"
                                                  }
                                                </button>

                                              )}

                                            </div>

                                            {/* Similar Events */}

                                            <div className="mt-8">

                                              <h2 className="text-2xl font-bold">
                                                Similar Events
                                              </h2>

                                              <div
                                                className="
                                                  mt-3
                                                  bg-indigo-50
                                                  p-5
                                                  rounded-2xl
                                                "
                                              >
                                                <p className="text-gray-700">
                                                  Similar events recommendation
                                                  will be integrated later.
                                                </p>
                                              </div>

                                            </div>

                                          </div>

                                        </div>

                                      </section>

                                      <Footer />

                                    </div>

                                  );
                                  }

                              export default EventDetails;