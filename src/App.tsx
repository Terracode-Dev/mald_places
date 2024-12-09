import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import { IslandManagement } from "./pages/islandPage";
import { IslandDetails } from "./pages/islandDetails";
import { IslandServices } from "./pages/islandServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/island",
    element: <IslandManagement />,
  },
  {
    path: "/island/:islandName",
    element: <IslandDetails />,
  },
  {
    path: "/island/:islandNo/:ctg",
    element: <IslandServices />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
