function Categories() {

 const categories = [
   "Conferences",
   "Workshops",
   "Competitions",
   "Hackathons",
   "Seminars",
 ];

  return (

    <section className="py-8 px-8 bg-gray-50">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          Explore Categories
        </h2>

        <p className="text-gray-500 mt-3">
          Find events according to your interests.
        </p>

        <div className="grid md:grid-cols-5 gap-5 mt-8">

          {categories.map((category) => (

            <div
              key={category}
              className="
                bg-white
                p-6
                rounded-3xl
                shadow-md
                hover:shadow-xl
                hover:scale-105
                transition
              "
            >

              <h3 className="font-semibold text-lg">
                {category}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Categories;