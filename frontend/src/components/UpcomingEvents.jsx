function UpcomingEvents() {

  const events = [
    {
      id: 1,
      title: "AI Workshop",
      date: "20 June 2026",
      venue: "Seminar Hall A",
      seats: 45,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    },
    {
      id: 2,
      title: "Code Quest Hackathon",
      date: "15 July 2026",
      venue: "Tech Hub",
      seats: 20,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    },
    {
      id: 3,
      title: "Cultural Fest",
      date: "5 August 2026",
      venue: "Open Grounds",
      seats: 100,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    },
  ];

  return (
    <section className="py-12 px-8 bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <p className="text-indigo-600 font-semibold uppercase text-2xl">
              Upcoming Events
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-7">

          {events.map((event) => (

            <div
              key={event.id}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
                hover:-translate-y-2
                transition
              "
            >

              <img
                src={event.image}
                alt={event.title}
                className="h-50 w-full object-cover"
              />

              <div className="p-6">

                <p className="text-indigo-600 text-sm">
                  📅 {event.date}
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {event.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  📍 {event.venue}
                </p>

                <p className="text-purple-600 mt-1">
                  👥 Seats Left: {event.seats}
                </p>

                <button
                  className="
                    mt-5
                    w-full
                    border
                    border-indigo-300
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-indigo-50
                  "
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default UpcomingEvents;