import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import { IslandManagement } from "./pages/islandPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/island",
    element: <IslandManagement />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
