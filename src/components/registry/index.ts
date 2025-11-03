import { Footer0001 } from "./footer/footer0001";
import { Footer0002 } from "./footer/footer0002"; // New Import
import { Hero0001 } from "./hero/hero0001";
import { Hero0002 } from "./hero/hero0002";
import { Navbar0001 } from "./navbars/navbar0001";
import { Navbar0002 } from "./navbars/navbar0002";
import { AvailableCourseSection0001 } from "./sections/available-course-section0001";
import { AvailableCourseSection0002 } from "./sections/available-course-section0002";
import { CourseSection0001 } from "./sections/courser-section-0001";
import { CourseSection0002 } from "./sections/courser-section-0002";
import { CourseSection0003 } from "./sections/courser-section-0003";

export type TRegistryComponent = {
  id: string;
  type: string;
  name: string;
  thumbnail: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  editableFields: Array<{
    name: string;
    type: "text" | "color" | "image" | "number" | "array";
    label: string;
  }>;
};

export const componentRegistry: Record<string, TRegistryComponent[]> = {
  navbar: [
    {
      id: "navbar0001",
      type: "navbar",
      name: "Classic Navbar",
      thumbnail: "/thumbnails/navbar0001.png",
      component: Navbar0001,
      defaultProps: {
        links: ["Home", "Courses", "About", "Contact"],
        bgColor: "#ffffff",
      },
      editableFields: [
        { name: "logo", type: "image", label: "Logo" },
        { name: "links", type: "array", label: "Navigation Links" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
    {
      id: "navbar0002",
      type: "navbar",
      name: "Dark Navbar",
      thumbnail: "/thumbnails/navbar0002.png",
      component: Navbar0002,
      defaultProps: {
        links: ["Home", "Courses", "About", "Contact"],
        bgColor: "#1f2937",
      },
      editableFields: [
        { name: "logo", type: "image", label: "Logo" },
        { name: "links", type: "array", label: "Navigation Links" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
  ],
  hero: [
    {
      id: "hero0001",
      type: "hero",
      name: "Hero with Background Image",
      thumbnail: "/thumbnails/hero0001.png",
      component: Hero0001,
      defaultProps: {
        title: "Learn Anything, Anytime",
        subtitle: "Access thousands of courses from world-class instructors",
        buttonText: "Start Learning",
        bgImage: "/hero-bg.jpg",
      },
      editableFields: [
        { name: "title", type: "text", label: "Title" },
        { name: "subtitle", type: "text", label: "Subtitle" },
        { name: "buttonText", type: "text", label: "Button Text" },
        { name: "bgImage", type: "image", label: "Background Image" },
      ],
    },
    {
      id: "hero0002",
      type: "hero",
      name: "Hero with Stats",
      thumbnail: "/thumbnails/hero0002.png",
      component: Hero0002,
      defaultProps: {
        title: "Transform Your Career",
        subtitle: "Join 10,000+ students learning the skills of tomorrow",
        buttonText: "Explore Courses",
        bgColor: "#f9fafb",
      },
      editableFields: [
        { name: "title", type: "text", label: "Title" },
        { name: "subtitle", type: "text", label: "Subtitle" },
        { name: "buttonText", type: "text", label: "Button Text" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
  ],
  section: [
    {
      id: "section0001",
      type: "section",
      name: "Course Grid Section (Featured)",
      thumbnail: "/thumbnails/section0001.png",
      component: CourseSection0001,
      defaultProps: {
        title: "Featured Courses",
        subtitle: "Explore our most popular courses",
        courses: [
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
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
        // Courses array can be complex, adding top-level props for simplicity
      ],
    },
    {
      id: "section0002",
      type: "section",
      name: "Course Grid Section (New)",
      thumbnail: "/thumbnails/section0002.png",
      component: CourseSection0002,
      defaultProps: {
        title: "New Courses",
        subtitle: "Start learning with our latest courses",
        bgColor: "#f8fafc",
        courses: [
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
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
    {
      id: "section0003",
      type: "section",
      name: "Course Grid Section (In Progress)",
      thumbnail: "/thumbnails/section0003.png",
      component: CourseSection0003,
      defaultProps: {
        title: "Continue Your Learning Journey",
        subtitle: "Pick up where you left off",
        bgColor: "#ffffff",
        courses: [
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
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
    {
      id: "availableCourse0001",
      type: "section",
      name: "Available Courses Grid with Categories",
      thumbnail: "/thumbnails/availableCourse0001.png",
      component: AvailableCourseSection0001,
      defaultProps: {
        title: "All Available Courses",
        subtitle: "Browse our complete course catalog",
        bgColor: "#f9fafb",
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
    {
      id: "availableCourse0002",
      type: "section",
      name: "Available Courses List",
      thumbnail: "/thumbnails/availableCourse0002.png",
      component: AvailableCourseSection0002,
      defaultProps: {
        title: "Explore Courses",
        subtitle: "Find the perfect course for your learning journey",
        bgColor: "#ffffff",
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
  ],
  footer: [
    {
      id: "footer0001",
      type: "footer",
      name: "Multi-column Footer",
      thumbnail: "/thumbnails/footer0001.png",
      component: Footer0001,
      defaultProps: {
        companyName: "EduPlatform",
        description: "Empowering learners worldwide with quality education",
        links: {
          company: ["About", "Careers", "Press", "Contact"],
          resources: ["Blog", "Help Center", "Community", "Support"],
          legal: ["Privacy", "Terms", "Cookie Policy"],
        },
        socials: ["Facebook", "Twitter", "LinkedIn", "Instagram"],
        bgColor: "#1f2937",
      },
      editableFields: [
        { name: "companyName", type: "text", label: "Company Name" },
        { name: "description", type: "text", label: "Description" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
    {
      id: "footer0002",
      type: "footer",
      name: "Detailed Multi-column Footer with Links & Socials",
      thumbnail: "/thumbnails/footer0002.png",
      component: Footer0002,
      defaultProps: {
        companyName: "BuilderX LMS",
        description:
          "Empowering learners worldwide with quality education and innovative learning experiences.",
        links: {
          platform: [
            "About Us",
            "How It Works",
            "Pricing",
            "Become Instructor",
          ],
          courses: [
            "Browse Courses",
            "Categories",
            "Popular Courses",
            "Free Resources",
          ],
          support: ["Help Center", "FAQs", "Contact Support", "System Status"],
          legal: [
            "Privacy Policy",
            "Terms of Service",
            "Cookie Policy",
            "Refund Policy",
          ],
        },
        bgColor: "#ffffff",
      },
      editableFields: [
        { name: "companyName", type: "text", label: "Company Name" },
        { name: "description", type: "text", label: "Description" },
        { name: "bgColor", type: "color", label: "Background Color" },
      ],
    },
  ],
};
