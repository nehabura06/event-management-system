function HowItWorks() {

  const steps = [
    "Register/Login",
    "Explore Events",
    "Register",
    "Receive Emails"
  ];

  return (

    <section className="py-12 px-8 bg-white">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          How It Works
        </h2>

        <p className="text-gray-500 mt-3">
          Participate in events in four simple steps.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {steps.map((step, index) => (

            <div
              key={index}
              className="
                bg-indigo-50
                p-6
                rounded-3xl
                shadow-md
              "
            >

              <div
                className="
                  w-12 h-12
                  mx-auto
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-lg
                "
              >
                {index + 1}
              </div>

              <h3 className="mt-4 font-semibold text-lg">
                {step}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default HowItWorks;