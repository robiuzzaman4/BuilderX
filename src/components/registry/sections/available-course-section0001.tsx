export function AvailableCourseSection0001({
  title = "All Available Courses",
  subtitle = "Browse our complete course catalog",
  bgColor = "#f9fafb",
  courses = [
    {
      id: 1,
      title: "Complete Web Developer Bootcamp",
      instructor: "John Smith",
      price: "$99",
      image: "/default_bg.jpg",
      rating: 4.8,
      students: "15k",
      modules: 42,
      category: "Development",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Lisa Anderson",
      price: "$89",
      image: "/default_bg.jpg",
      rating: 4.9,
      students: "8.5k",
      modules: 28,
      category: "Design",
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Mark Wilson",
      price: "$119",
      image: "/default_bg.jpg",
      rating: 4.7,
      students: "12k",
      modules: 35,
      category: "Marketing",
    },
    {
      id: 4,
      title: "iOS App Development with Swift",
      instructor: "Emma Davis",
      price: "$149",
      image: "/default_bg.jpg",
      rating: 4.8,
      students: "6.2k",
      modules: 50,
      category: "Mobile",
    },
    {
      id: 5,
      title: "Photography Masterclass",
      instructor: "Chris Martin",
      price: "$79",
      image: "/default_bg.jpg",
      rating: 4.6,
      students: "9.8k",
      modules: 32,
      category: "Creative",
    },
    {
      id: 6,
      title: "Business Analytics with Excel",
      instructor: "Susan Lee",
      price: "$99",
      image: "/default_bg.jpg",
      rating: 4.7,
      students: "11k",
      modules: 38,
      category: "Business",
    },
  ],
}) {
  return (
    <section style={{ backgroundColor: bgColor }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[
            "All",
            "Development",
            "Design",
            "Marketing",
            "Business",
            "Creative",
          ].map((cat) => (
            <button
              key={cat}
              className="px-5 py-2 rounded-full bg-white border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition whitespace-nowrap font-medium"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <span>📚</span>
                    <span>{course.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{course.students} students</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price}
                  </span>
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
            Load More Courses
          </button>
        </div>
      </div>
    </section>
  );
}
