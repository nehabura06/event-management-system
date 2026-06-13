function AboutUs() {

  return (

    <section
      id="about"
      className="py-12 px-8 bg-indigo-50"
    >

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          About EventSphere
        </h2>

        <p className="mt-6 text-gray-700 text-lg leading-8">

          EventSphere is an Event Management
          System developed using Spring Boot,
          React, JWT Authentication and MySQL.

          The platform enables organizers to
          create and manage events while
          allowing attendees to explore,
          register and participate efficiently.

        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">

          <span className="bg-white px-4 py-2 rounded-full shadow">
            Spring Boot
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow">
            React.js
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow">
            MySQL
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow">
            JWT
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow">
            Tailwind CSS
          </span>

        </div>

      </div>

    </section>

  );
}

export default AboutUs;