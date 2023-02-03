import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EmployeeMissing from "./Pages/EmployeeMissing";
import EmployeeNotes from "./Pages/EmployeeNotes";
import TrainingSessions from "./Pages/EmployeeTrainingSessions";
import EmployeeTrainings from "./Pages/EmployeeTrainings";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/employee/:employeeId/notes/",
        element: <EmployeeNotes />
      },
      {
        path: "/missing",
        element: <EmployeeMissing />,
      },
      {
        path: "/top-paid",
        element: <EmployeeList path={"/top-paid"}/>,
      },
      {
        path: "/training-sessions",
        element: <TrainingSessions />,
      },
      {
        path: "/employee/:employeeId/trainings",
        element: <EmployeeTrainings />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/equipments/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/equipments/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
