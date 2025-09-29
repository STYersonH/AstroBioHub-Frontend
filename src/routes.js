import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import SummaryPage from "./pages/SummaryPage/SummaryPage.jsx";
import SummaryDiscoverPage from "./pages/SummaryPage/SummaryDiscoverPage.jsx";
import SummaryAcademicPage from "./pages/SummaryPage/SummaryAcademicPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/summary",
    Component: SummaryPage,
    children: [
      { path: "discover", Component: SummaryDiscoverPage },
      { path: "academic", Component: SummaryAcademicPage },
    ],
  },
]);

export default routes;
