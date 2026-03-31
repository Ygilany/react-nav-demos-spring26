import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Events } from "./pages/Events";
import { EventDetails } from "./pages/EventDetails";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthProvider";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: `/`, element: <Home /> },
      { path: `/login`, element: <LoginPage /> },
      { path: `/about`, element: <About /> },
      { path: `/events`, element: <Events /> },
      { path: `/events/:eventId`, element: <EventDetails /> },
      {
        path: `/settings`,
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
      },
      { path: `*`, element: <NotFound /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL
});

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
