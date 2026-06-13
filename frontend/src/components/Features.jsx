function Features() {

  const features = [
    "JWT Authentication",
    "Event Registration",
    "Schedule Management",
    "Feedback & Ratings",
    "Email Notifications",
    "Search & Filter",
  ];

  return (

    <section className="py-12 px-8 bg-white">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose EventSphere?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => (

            <div
              key={feature}
              className="
                border
                rounded-3xl
                p-6
                hover:shadow-xl
                transition
              "
            >
              <h3 className="font-bold text-xl">
                {feature}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Features;