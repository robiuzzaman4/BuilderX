export function AvailableCourseSection0002({
  title = "Explore Courses",
  subtitle = "Find the perfect course for your learning journey",
  bgColor = "#ffffff",
  courses = [
    {
      id: 1,
      title: "Python Programming Complete",
      instructor: "Dr. James Wilson",
      price: "$129",
      image: "/default_bg.jpg",
      rating: 4.9,
      students: "18k",
      hours: "24",
      bestseller: true,
    },
    {
      id: 2,
      title: "Graphic Design Essentials",
      instructor: "Maria Garcia",
      price: "$99",
      image: "/default_bg.jpg",
      rating: 4.8,
      students: "14k",
      hours: "16",
      bestseller: false,
    },
    {
      id: 3,
      title: "Financial Accounting Basics",
      instructor: "Robert Johnson",
      price: "$109",
      image: "/default_bg.jpg",
      rating: 4.7,
      students: "10k",
      hours: "20",
      bestseller: true,
    },
    {
      id: 4,
      title: "Content Marketing Mastery",
      instructor: "Anna Taylor",
      price: "$119",
      image: "/default_bg.jpg",
      rating: 4.8,
      students: "13k",
      hours: "18",
      bestseller: false,
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      instructor: "Kevin Brown",
      price: "$139",
      image: "/default_bg.jpg",
      rating: 4.9,
      students: "9k",
      hours: "22",
      bestseller: true,
    },
    {
      id: 6,
      title: "Project Management Professional",
      instructor: "Linda Martinez",
      price: "$149",
      image: "/default_bg.jpg",
      rating: 4.8,
      students: "16k",
      hours: "28",
      bestseller: false,
    },
  ],
}) {
  return (
    <section style={{ backgroundColor: bgColor }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-blue-500 transition flex flex-col sm:flex-row"
            >
              <div className="sm:w-80 h-48 sm:h-auto relative shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.bestseller && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Bestseller
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        by {course.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {course.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-900">
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{course.hours} hours</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Enroll Now
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
