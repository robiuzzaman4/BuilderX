export function CourseSection0001({
  title = "Featured Courses",
  subtitle = "Explore our most popular courses",
  courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      instructor: "John Doe",
      price: "$99",
      image: "/default_bg.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Jane Smith",
      price: "$129",
      image: "/default_bg.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Mike Johnson",
      price: "$119",
      image: "/default_bg.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Sarah Williams",
      price: "$89",
      image: "/default_bg.jpg",
      rating: 4.8,
    },
  ],
}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {course.instructor}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    {course.price}
                  </span>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
