export function CourseSection0003({
  title = "Continue Your Learning Journey",
  subtitle = "Pick up where you left off",
  bgColor = "#ffffff",
  courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "Alex Turner",
      price: "$199",
      image: "/default_bg.jpg",
      rating: 4.9,
      reviews: "1.2k",
      level: "Intermediate",
      progress: 65,
    },
    {
      id: 2,
      title: "Machine Learning A-Z",
      instructor: "Rachel Green",
      price: "$229",
      image: "/default_bg.jpg",
      rating: 4.8,
      reviews: "890",
      level: "Advanced",
      progress: 40,
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      instructor: "Tom Hardy",
      price: "$139",
      image: "/default_bg.jpg",
      rating: 4.7,
      reviews: "2.1k",
      level: "Beginner",
      progress: 85,
    },
  ],
}) {
  return (
    <section style={{ backgroundColor: bgColor }} className="py-20 border-y">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-blue-500 transition"
            >
              <div className="relative h-56">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-900">
                      {course.rating}
                    </span>
                    <span className="text-gray-500">({course.reviews})</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  by {course.instructor}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-blue-600">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
