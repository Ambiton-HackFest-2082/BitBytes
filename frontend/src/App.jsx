import AppLayout from "./layouts/AppLayout";
import LandinPageLayout from "./layouts/LandingPageLayout";
import Home from "./pages/LandingPage/Home";
<<<<<<< HEAD
import About from "./pages/LandingPage/About";
import Contact from "./pages/LandingPage/Contact";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
=======
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
>>>>>>> 12a201c41f63e5f35f2a66bed84b67789e5b986a
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
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
        },
        ],
      },
<<<<<<< HEAD
     
=======
      {
        path:"*",
        element:<NotFound />
      },

      {
        path:"auth",
        element:"",
        children:[
          {
            index:true,
            element:<Navigate to={"login"} replace />,
          },
          {
            path:"login",
            element:<Login />

          },
          {
            path:"register",
            element:<Registration />
          }
        ]
      },

      {
        path:"request-details",
        element:<RequestDetails />
      },
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
>>>>>>> 12a201c41f63e5f35f2a66bed84b67789e5b986a
    ],
  },
]);

function App() {
<<<<<<< HEAD
 

=======
>>>>>>> 12a201c41f63e5f35f2a66bed84b67789e5b986a
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
