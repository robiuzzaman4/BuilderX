# BuilderX LMS - Drag & Drop Learning Management System

Build Your Learning Platform in Minutes
Drag, drop, and deploy. No coding required. Create stunning online courses and manage learners effortlessly with our intuitive platform builder.

**Live Demo:** [https://builderlms.vercel.app](https://builderlms.vercel.app)

---

## 🎯 Features

- **Drag & Drop Page Builder** - Intuitive interface to create platform by dragging components
- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Platform Create and Management** - Create, edit, publish, and manage multiple platforms
- **Real-time Updates** - Instant feedback and state synchronization

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19.2** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful, consistent icons
- **Sonner** - Toast notifications
- **@dnd-kit** - Drag and drop functionality

### Backend

- **Next.js API Routes** - Serverless backend
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure token-based authentication
- **Axios** - HTTP client for API calls
- **Zod** - Runtime schema validation

### State & Data Management

- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **React Hook Form** - Form state management

### Development & Tooling

- **Biome** - Fast linter and formatter
- **React Compiler** - Next.js 16 compiler optimization
- **Tailwind CSS v4** - Latest CSS framework with improved performance
- **TypeScript 5** - Latest TypeScript features

### Deployment

- **Vercel** - Optimized Next.js hosting platform

---

## 📁 Project Structure

\`\`\`
builderx/
├── src/
│ ├── app/
│ │ ├── (auth)/ # Authentication pages (login, signup)
│ │ ├── (dashboard)/ # Protected dashboard routes
│ │ ├── (platform)/ # Platform-specific routes
│ │ ├── api/ # API route handlers
│ │ ├── globals.css # Global styles & Tailwind config
│ │ ├── layout.tsx # Root layout component
│ │ └── page.tsx # Home page
│ ├── components/
│ │ ├── builder/ # Course builder components
│ │ ├── forms/ # Reusable form components
│ │ ├── ui/ # shadcn UI components
│ │ ├── registry/ # Component registry
│ │ └── shared/ # Shared utility components
│ ├── config/ # Configuration files
│ ├── constant/ # Application constants
│ ├── hooks/ # Custom React hooks
│ ├── http/ # API client setup
│ ├── lib/ # Utility functions
│ ├── models/ # MongoDB schemas
│ ├── providers/ # React context providers
│ ├── store/ # Zustand stores
│ └── types/ # TypeScript type definitions
├── public/
│ ├── thumbnails/ # Image assets
│ └── triangle.svg # SVG assets
├── .env.local # Environment variables (local)
├── biome.json # Biome linter config
├── components.json # Component registry
├── next.config.ts # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies & scripts
└── README.md # This file
\`\`\`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/builderx.git
   cd builderx
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in your environment variables (see [Environment Variables](#environment-variables) section)

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env

# Database

MONGODB_URI=your_mongodb_connection_string

# Authentication

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
\`\`\`

## 📝 Available Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start development server (http://localhost:3000) |
| `npm run build`  | Build for production                             |
| `npm start`      | Start production server                          |
| `npm run lint`   | Run Biome linter                                 |
| `npm run format` | Format code with Biome                           |

## 🏗 Project Architecture

### Authentication Flow

1. User registers/logs in via `/auth` routes
2. JWT token is issued and stored securely
3. Protected routes check token validity via middleware
4. API requests include JWT in Authorization header

### Create Plaform Flow

1. Sign In & create platform by entering name and slug of this platform
2. Uses drag-and-drop builder to add components
3. Components data structure are stored in MongoDB via API
4. Platform is now ready to publish and use it

### Data Flow

\`\`\`
Client (React Component)
↓
State Management (Zustand/React Query)
↓
API Routes (Next.js)
↓
Database (MongoDB)
\`\`\`

## 🎨 Design System

- **Color Scheme**: Blue-500 primary with clean, minimal light mode
- **Typography**: Clean, readable fonts optimized for learning platforms
- **Components**: Built with Radix UI for accessibility
- **Responsive**: Mobile-first approach using Tailwind CSS
