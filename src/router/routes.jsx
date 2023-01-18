import App from "../App";
import ErrorPage404 from "../ErrorPage404";
import SectionForm from "../components/Sections/SectionForm";
import { createBrowserRouter } from "react-router-dom";
import SectionList from "../components/Sections/SectionList";
import Reorder from "../components/Sections/Reorder";
import SectionDetailsList from "../components/SectionDetail/SectionDetailsList";
import SectionDetailForm from "../components/SectionDetail/SectionDetailForm";
import SectionDetailItemList from "../components/SectionDetailItem/SectionDetailItemList";
import SectionDetailItemForm from "../components/SectionDetailItem/SectionDetailItemForm";
import ProtectedRoute from "../components/utils/ProtectedRoute";
import Login from "../components/Login/Login";
import { login } from "../components/Login/LoginActions";
import HomePage from "../components/Home/HomePage";

const RouterPage = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage404 />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "sections/",
        element: <SectionList />,
      },
      {
        path: "sections/reorder/",
        element: <Reorder />,
      },
      {
        path: "sections/new/",
        element: <SectionForm />,
      },
      {
        path: "sections/:slugNameSection/edit/",
        element: <SectionForm />,
      },
      {
        path: "section-details/",
        element: <SectionDetailsList />,
      },
      {
        path: "section-details/:slugNameSection/new/",
        element: <SectionDetailForm />,
      },
      {
        path: "section-details/:slugNameSection/:idSectionDetail/edit/",
        element: <SectionDetailForm />,
      },
      {
        path: "section-details-item/",
        element: <SectionDetailItemList />,
      },
      {
        path: "section-details-item/:slugNameSection/details/:idSectionDetail/items/new/",
        element: <SectionDetailItemForm />,
      },
      {
        path: "section-detail-items/:slugNameSection/details/:idSectionDetail/items/:idSectionDetailItem/edit/",
        element: <SectionDetailItemForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: login,
  },
]);

export { RouterPage };
