import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import Service_details from "../pages/Service_details/Service_details";
import System_Access from "../pages/System_Access/System_Access";
import SignIn from "../pages/Singin/SignIn";
import ForgotPassword from "../pages/Singin/ForgotPassword";
import Register from "../pages/Register/Register";
import Services from "../pages/Services/Services";
import PrivateRoute from "./PrivateRoute";
import BookService from "../pages/Book service/BookService";
import Dashboard from "../Layout/Dashboard";
import AdminRoute from "./AdminRoute";
import AddService from "../pages/Dashboard_Pages/AddService";
import All_Services from "../pages/Dashboard_Pages/All_Services";
import Update_Service from "../pages/Dashboard_Pages/Update_Service";
import All_Users from "../pages/Dashboard_Pages/All_Users";
import Appointments from "../pages/Dashboard_Pages/Appointments";
import My_Appointments from "../pages/Dashboard_Pages/My_Appointments";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed ";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/service-details/:id",
        element: (
          <PrivateRoute>
            <Service_details />
          </PrivateRoute>
        ),
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/book-service",
        element: <PrivateRoute><BookService /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/system-access",
    element: <System_Access />,
    children: [
      {
        path: "/system-access/signIn",
        element: <SignIn />,
      },
      {
        path: "/system-access/ForgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/system-access/signUp",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin/add_a_service",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddService />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/all_services",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <All_Services />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/update_service/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Update_Service />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/all_users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <All_Users />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/admin/appointments",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Appointments />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // user routes

      {
        path: "/dashboard/user/my_appointments",
        element: (
          <PrivateRoute>
            {" "}
            <My_Appointments />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/api/v1/payment-complete/:transactionId",
    element:<PaymentSuccess/>
  },
  {
    path: "/api/v1/payment-failed/:transactionId",
    element:<PaymentFailed />
  },
]);

export default Route;
