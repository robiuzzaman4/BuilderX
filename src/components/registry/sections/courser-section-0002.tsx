export function CourseSection0002({
  title = "New Courses",
  subtitle = "Start learning with our latest courses",
  bgColor = "#f8fafc",
  courses = [
    {
      id: 1,
      title: "Advanced JavaScript",
      instructor: "Sarah Johnson",
      price: "$149",
      image: "/default_bg.jpg",
      students: "2.5k",
      duration: "12 hours",
      badge: "NEW",
    },
    {
      id: 2,
      title: "React Mastery 2024",
      instructor: "David Lee",
      price: "$179",
      image: "/default_bg.jpg",
      students: "3.2k",
      duration: "18 hours",
      badge: "NEW",
    },
    {
      id: 3,
      title: "Node.js Complete Guide",
      instructor: "Emily Chen",
      price: "$159",
      image: "/default_bg.jpg",
      students: "1.8k",
      duration: "15 hours",
      badge: "NEW",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Michael Brown",
      price: "$169",
      image: "/default_bg.jpg",
      students: "4.1k",
      duration: "20 hours",
      badge: "NEW",
    },
  ],
}) {
  return (
    <section style={{ backgroundColor: bgColor }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            ✨ Just Launched
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {course.badge}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  by {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                    Enroll
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
