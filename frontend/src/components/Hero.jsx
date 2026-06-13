import { Link } from "react-router-dom";
import { FaUsersCog } from "react-icons/fa";

function Hero() {
  return (
    <section className="pt-32 pb-20 px-8">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>

          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium mb-6">
            Event Management Made Easy
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">

            Manage and Participate in
            <span className="text-indigo-700">
              {" "}Events Seamlessly
            </span>

          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">

            Discover workshops, seminars,
            hackathons and cultural events
            with ease. Register instantly and
            stay updated with notifications.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/events"
              className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                px-6 py-3
                rounded-xl
                font-semibold
                hover:scale-105
                transition duration-300
              "
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="
                bg-white
                text-indigo-700
                border
                border-indigo-300
                px-6 py-3
                rounded-xl
                font-semibold
                hover:bg-indigo-50
                transition
              "
            >
              Get Started
            </Link>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200"
            alt="Event"
            className="
              rounded-3xl
              shadow-2xl
              h-[450px]
              object-cover
              w-full
            "
          />

          {/* Multi Role Access Card */}
          <div
            className="
              absolute
              -bottom-6
              left-6
              bg-white
              shadow-xl
              rounded-2xl
              px-5 py-4
              flex items-center gap-3
              border border-gray-100
            "
          >

            <div className="
              w-12 h-12
              rounded-full
              bg-indigo-100
              flex items-center
              justify-center
            ">
              <FaUsersCog className="text-indigo-600 text-2xl" />
            </div>

            <div>
              <p className="font-bold text-lg text-gray-900">
                Multi-Role Access
              </p>

              <p className="text-gray-500 text-sm">
                Admin • Organizer • Attendee
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;