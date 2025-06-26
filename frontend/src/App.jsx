import AppLayout from "./layouts/AppLayout";
import LandinPageLayout from "./layouts/LandingPageLayout";
import Home from "./pages/LandingPage/Home";
import About from "./pages/LandingPage/About";
import Contact from "./pages/LandingPage/Contact";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { MyContextProvider } from "./utils/context/myContext";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
     
    ],
  },
]);

function App() {
 

  return (
    <MyContextProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </MyContextProvider>
  );
}

export default App
