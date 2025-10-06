import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import SummaryPage from "./pages/SummaryPage/SummaryPage.jsx";
import SummaryDiscoverPage from "./pages/SummaryPage/SummaryDiscoverPage.jsx";
import SummaryAcademicPage from "./pages/SummaryPage/SummaryAcademicPage.jsx";
import KnowledgeGraphPage from "./pages/KnowledgeGraphPage/KnowledgeGraphPage.jsx";
import ArticlesListPage from "./pages/ArticlePage/ArticlesListPage.jsx";
import ArticleA from "./pages/ArticlePage/ArticleA.jsx";
import ArticleB from "./pages/ArticlePage/ArticleB.jsx";
import ArticleC from "./pages/ArticlePage/ArticleC.jsx";
import ArticleD from "./pages/ArticlePage/ArticleD.jsx";
import ArticleE from "./pages/ArticlePage/ArticleE.jsx";
import ArticleF from "./pages/ArticlePage/ArticleF.jsx";
import ArticleG from "./pages/ArticlePage/ArticleG.jsx";
import ArticleH from "./pages/ArticlePage/ArticleH.jsx";
import ArticleI from "./pages/ArticlePage/ArticleI.jsx";
import ArticleJ from "./pages/ArticlePage/ArticleJ.jsx";
import ArticleK from "./pages/ArticlePage/ArticleK.jsx";
import ArticleL from "./pages/ArticlePage/ArticleL.jsx";
import ArticleM from "./pages/ArticlePage/ArticleM.jsx";

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
  {
    path: "/knowledge-graph",
    Component: KnowledgeGraphPage,
  },
  {
    path: "/articles",
    Component: ArticlesListPage,
  },
  {
    path: "/article/a",
    Component: ArticleA,
  },
  {
    path: "/article/b",
    Component: ArticleB,
  },
  {
    path: "/article/c",
    Component: ArticleC,
  },
  {
    path: "/article/d",
    Component: ArticleD,
  },
  {
    path: "/article/e",
    Component: ArticleE,
  },
  {
    path: "/article/f",
    Component: ArticleF,
  },
  {
    path: "/article/g",
    Component: ArticleG,
  },
  {
    path: "/article/h",
    Component: ArticleH,
  },
  {
    path: "/article/i",
    Component: ArticleI,
  },
  {
    path: "/article/j",
    Component: ArticleJ,
  },
  {
    path: "/article/k",
    Component: ArticleK,
  },
  {
    path: "/article/l",
    Component: ArticleL,
  },
  {
    path: "/article/m",
    Component: ArticleM,
  },
]);

export default routes;
