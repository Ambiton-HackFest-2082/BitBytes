import AppLayout from "./layouts/AppLayout";
import LandinPageLayout from "./layouts/LandingPageLayout";
import Home from "./pages/LandingPage/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import { MyContextProvider } from "./utils/context/myContext";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
// import CreateReq from "./pages/student/CreateReq";
import Offers from "./pages/student/Offers";
import Requests from "./pages/student/Requests";
import { Toaster } from "sonner";
import RequestDetails from "./pages/requestDetails";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import About from "./pages/LandingPage/About";
import Contact from "./pages/LandingPage/Contact";
import ExploreRequests from "./pages/teacher/ExploreRequests";
import Offered from "./pages/teacher/Offered";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Feature from "./components/Landingpage/Feature";
import Testimonials from "./components/Landingpage/Testimonial";
import Faq from "./components/Landingpage/Faq";

// import Offers from "./pages/student/Offers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <LandinPageLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "feature",
            element: <Feature />,
          },
          {
            path: "testimonials",
            element: <Testimonials />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "faq",
            element: <Faq />,
          },
         
        ],
      },
      
      {
        path: "*",
        element: <NotFound />,
      },

      {
        path: "auth",
        element: "",
        children: [
          {
            index: true,
            element: <Navigate to={"login"} replace />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Registration />,
          },

          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "about",
            element: <About />,
          },
        ],
      },

      {
        path: "request-details",
        element: <RequestDetails />,
      },

      {
        path: "",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "student",
            element: <StudentLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={"dashboard"} replace />,
              },
              {
                path: "dashboard",
                element: <StudentDashboard />,
              },
              // {
              //   path: "create",
              //   element: <CreateReq />,
              // },
              // {
              //   path: "chats",
              //   element: <Chats />,
              // },
              {
                path: "requests",
                element: <Requests />,
              },
              {
                path: "accepted-offers",
                element: <Offers />,
              },
            ],
          },
          {
            path: "teacher",
            element: <TeacherLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={"dashboard"} replace />,
              },
              {
                path: "dashboard",
                element: <TeacherDashboard />,
              },
              {
                path: "explore-requests",
                element: <ExploreRequests />,
              },
              {
                path: "offered",
                element: <Offered />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <MyContextProvider>
      <main>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </main>
    </MyContextProvider>
  );
}

export default App;
