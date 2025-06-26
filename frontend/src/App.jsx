import AppLayout from "./layouts/AppLayout";
import LandinPageLayout from "./layouts/LandingPageLayout";
import Home from "./pages/LandingPage/Home";
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
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
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
