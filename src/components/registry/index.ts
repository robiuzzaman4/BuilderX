import { Footer0001 } from "./footer/footer0001";
import Hero0001 from "./hero/hero0001";
import { Navbar0001 } from "./navbars/navbar0001";
import { Navbar0002 } from "./navbars/navbar0002";
import { CourseSection0001 } from "./sections/courser-section-0001";

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
        logo: "/logo.png",
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
        logo: "/logo.png",
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
      component: Hero0001,
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
      name: "Course Grid Section",
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
            image: "/course1.jpg",
            rating: 4.8,
          },
          {
            id: 2,
            title: "Data Science Fundamentals",
            instructor: "Jane Smith",
            price: "$129",
            image: "/course2.jpg",
            rating: 4.9,
          },
          {
            id: 3,
            title: "Mobile App Development",
            instructor: "Mike Johnson",
            price: "$119",
            image: "/course3.jpg",
            rating: 4.7,
          },
          {
            id: 4,
            title: "UI/UX Design Masterclass",
            instructor: "Sarah Williams",
            price: "$89",
            image: "/course4.jpg",
            rating: 4.8,
          },
        ],
      },
      editableFields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "subtitle", type: "text", label: "Section Subtitle" },
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
  ],
};
