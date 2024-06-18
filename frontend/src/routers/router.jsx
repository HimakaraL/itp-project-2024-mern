import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/landingPage/Home";
import AdminReservationDashboardLayout from "../pages/Reservations/admin_dashboard/DashboardLayout";
import AdminReservationDashboard from "../pages/Reservations/admin_dashboard/Dashboard";
import AdminManageReservations from "../pages/Reservations/admin_dashboard/ManageReservations";
import AdminViewReservation from "../pages/Reservations/admin_dashboard/ViewReservation";
import ClientDashboardLayout from "../pages/Reservations/client_dashboard/DashboardLayout";
import ClientDashboard from "../pages/Reservations/client_dashboard/Dashboard";
import ClientManageReservations from "../pages/Reservations/client_dashboard/ManageReservations";
import ClientViewReservation from "../pages/Reservations/client_dashboard/ViewReservation";
import ClientCreateReservation from "../pages/Reservations/client_dashboard/CreateReservation";
import ClientUpdateReservation from "../pages/Reservations/client_dashboard/UpdateReservation";
import InitialPayment from "../pages/Reservations/client_dashboard/InitialPayment";
import ApprovedPage from "../pages/Reservations/admin_dashboard/ApprovedPage";
import ApprovedReservations from "../pages/Reservations/admin_dashboard/ApprovedReservations";
import CancelledPage from "../pages/Reservations/admin_dashboard/CancelledPage";
import CancelledReservations from "../pages/Reservations/admin_dashboard/CancelledReservations";
import Login from "../components/landingPage/ClientLogin";
import ClientSignUp from "../components/landingPage/ClientSignUp";
import AboutUs from "../components/landingPage/AboutUs";
import AdminDashboardLayout from "../pages/Admin/AdminDashboardLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import DashboardLayout from "../pages/Transaction/DashboardLayout";
import Dashboard from "../pages/Transaction/Dashboard";
import Transaction from "../pages/Transaction/Transaction";
import ManageTransaction from "../pages/Transaction/ManageTransaction";
import EditTransaction from "../pages/Transaction/EditTransaction";
import ViewTransaction from "../pages/Transaction/ViewTransaction"
import MaintainDashboard from "../pages/Maintain/Dashboard"
import MaintainDashboardLayout from "../pages/Maintain/DashboardLayout"
import CreateMaintain from "../pages/Maintain/CreateMaintain"
import ViewMaintain from "../pages/Maintain/ViewMaintain"
import UpdateMaintain from "../pages/Maintain/UpdateMaintain"
import AllServices from "../pages/Services/AllServices";
import CreateService from "../pages/Services/CreateService";
import DeleteService from "../pages/Services/DeleteService";
import EditService from "../pages/Services/EditService";
import ServicesClient from "../pages/Services/ServicesClient";
import AllMarketings from "../pages/Marketing/AllMarketings";
import CreateMarketing from "../pages/Marketing/CreateMarketing";
import DeleteMarketing from "../pages/Marketing/DeleteMarketing";
import ServiceDashboardLayout from "../pages/Services/DashboardLayout";
import InventoryDashboardLayout from "../pages/inventory/inventory dashboard/DashboardLayout";
import InventoryDashboard from "../pages/inventory/inventory dashboard/Dashboard";
import AddInventory from "../pages/inventory/inventory dashboard/AddInventory";
import ManageInventory from "../pages/inventory/inventory dashboard/ManageInventory";
import EditInventory from "../pages/inventory/inventory dashboard/EditInventory";
import EmpDashboardLayout from "../pages/Employee/employee dashboard/EmpDashboardLayout";
import EmpDashboard from "../pages/Employee/employee dashboard/EmpDashboard";
import ManageEmployee from "../pages/Employee/employee dashboard/ManageEmployee";
import EditEmployee from "../pages/Employee/employee dashboard/EditEmployee";
import AddEmployee from "../pages/Employee/employee dashboard/AddEmployee";
// import SalaryDashboardLayout from "../pages/Employee/salary dashboard/SalaryDashboardLayout";
import ManageSalary from "../pages/Employee/salary dashboard/ManageSalary";
import EditSalary from "../pages/Employee/salary dashboard/EditSalary";
import AddSalary from "../pages/Employee/salary dashboard/AddSalary";
import RentalDashboard from "../pages/Rentals/Dashboard";
import RentalDashboardLayout from "../pages/Rentals/DashboardLayout";
import ManageOrder from "../pages/Rentals/ManageOrder";
import AddOrder from "../pages/Rentals/AddOrder";
import EditOrder from "../pages/Rentals/EditOrder";
import DeleteOrder from "../pages/Rentals/DeleteOrder";
import AdminHome from "../pages/Feedback/AdminHome";
import ShowFeedback from "../pages/Feedback/ShowFeedback";
import HomeFeedback from "../pages/Feedback/HomeFeedback";
import CreateFeedback from "../pages/Feedback/CreateFeedback";
import EditFeedback from "../pages/Feedback/EditFeedback";
import DeleteFeedback from "../pages/Feedback/DeleteFeedback";
import FeedbackDashboard from "../pages/Feedback/Dashboard";
import FeedbackDashboardLayout from "../pages/Feedback/DashboardLayout";
import RejectFeedback from "../pages/Feedback/RejectFeedback";
import AllInventory from "../components/landingPage/Inventory";
import Faq from "../components/landingPage/Faq";

function CreateRouter(){
  return createBrowserRouter([
    /*reservation routes*/
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        }
      ]
    },
    {
      path:"/admin/reservation/dashboard",
      element:<AdminReservationDashboardLayout/>,
      children:[
        {
          path:"/admin/reservation/dashboard",
          element:<AdminReservationDashboard/>
        },{
          path:"/admin/reservation/dashboard/manage",
          element:<AdminManageReservations/>
        },{
          path:"/admin/reservation/dashboard/view-reservation/:id",
          element:<AdminViewReservation/>
        },{
          path:"/admin/reservation/dashboard/approve/:id",
          element:<ApprovedPage/>
        },{
          path:"/admin/reservation/dashboard/cancel/:id",
          element:<CancelledPage/>
        },{
          path:"/admin/reservation/dashboard/approve-reservations",
          element:<ApprovedReservations/>
        },{
          path:"/admin/reservation/dashboard/cancel-reservations",
          element:<CancelledReservations/>
        },
        
      ]
    },
    {
      path:"/client/dashboard",
      element:<ClientDashboardLayout/>,
      children:[
        {
          path:"/client/dashboard",
          element:<ClientDashboard/>
        },
        {
          path:"/client/dashboard/login",
          element:<Login/>
        },
        {
          path:"/client/dashboard/aboutus",
          element:<AboutUs/>
        },
        {
          path:"/client/dashboard/faq",
          element:<Faq/>
        },
        {
          path:"/client/dashboard/signup",
          element:<ClientSignUp/>
        },
        {
          path:"/client/dashboard/create",
          element:<ClientCreateReservation/>
        },{
          path:"/client/dashboard/manage",
          element:<ClientManageReservations/>
        },{
          path:"/client/dashboard/update-reservation/:id",
          element:<ClientUpdateReservation/>
        },{
          path:"/client/dashboard/view-reservation/:id",
          element:<ClientViewReservation/>
        },{
          path:"/client/dashboard/initial-payment",
          element:<InitialPayment/>
        }
      ]
    },

    /*service routes*/
    {
      path: "/admin/service/dashboard",
      element: <ServiceDashboardLayout />,
      children: [
        {
          path: "/admin/service/dashboard/all",
          element: <AllServices />,
        },
        {
          path: "/admin/service/dashboard/marketing/add",
          element: <CreateMarketing />,
        },
        {
          path: "/admin/service/dashboard/add",
          element: <CreateService />,
        },
        {
          path: "/admin/service/dashboard/delete/:id",
          element: <DeleteService />,
        },
        {
          path: "/admin/service/dashboard/marketing/delete/:id",
          element: <DeleteMarketing />,
        },
        {
          path: "/admin/service/dashboard/update/:id",
          element: <EditService />,
        },
      ],
    },

    /** Client services */
    {
      path: "/client/service",
      element: <ServicesClient />,
    },

    {
      path: "/admin/finance/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: "/admin/finance/dashboard",
          element: <Dashboard/>
        },{
          path: "/admin/finance/dashboard/transaction",
          element: <Transaction/>
        },{
          path: "/admin/finance/dashboard/manage-transaction",
          element: <ManageTransaction/>
        },{
          path: "/admin/finance/dashboard/edit-transaction/:id",
          element: <EditTransaction/>
        },{
          path: "/admin/finance/dashboard/view-transaction/:id",
          element: <ViewTransaction/>
        }
      ]
    },
    {
      path: "/admin/maintain/dashboard",
      element: <MaintainDashboardLayout />,
  
      children: [
        {
          path: "/admin/maintain/dashboard",
          element: <MaintainDashboard />,
        },
        {
          path: "/admin/maintain/dashboard/view",
          element: <ViewMaintain />,
        },
        {
          path: "/admin/maintain/dashboard/create",
          element: <CreateMaintain />,
        },
        {
          path: "/admin/maintain/dashboard/update/:id",
          element: <UpdateMaintain />,
        },
      ],
    },

    /*admin route*/
    {
      path:"/admin/dashboard",
      element:<AdminDashboardLayout/>,
      children:[
        {
          path:"/admin/dashboard",
          element:<AdminDashboard/>
        },
      ]
    },

    /* inventory routes */
    {
      path: "/admin/inventory/dashboard",
      element: <InventoryDashboardLayout />,
      children: [
        {
          path: "/admin/inventory/dashboard",
          element: <InventoryDashboard />,
        },
        {
          path: "/admin/inventory/dashboard/add",
          element: <AddInventory />,
        },
        {
          path: "/admin/inventory/dashboard/manage",
          element: <ManageInventory />,
        },
        {
          path: "/admin/inventory/dashboard/edit-inventory/:id",
          element: <EditInventory />,
           
        },
      ],
    },
    /* employee routes */
    {
      path: "/admin/empdashboard",
      element: <EmpDashboardLayout />,
      children: [
        {
          path: "/admin/empdashboard",
          element: <EmpDashboard />,
        },
        {
          path: "/admin/empdashboard/AddEmployee",
          element: <AddEmployee />,
        },
        {
          path: "/admin/empdashboard/manage",
          element: <ManageEmployee />,
        },
        {
          path: "/admin/empdashboard/edit-employee/:id",
          element: <EditEmployee />,
          loader: ({ params }) =>
            fetch(`http://localhost:3000/employee/${params.id}`),
        },
      ],
    },
    {
      path: "/admin/e_saldashboard",
      element: <EmpDashboardLayout />,
      children: [
        {
          path: "/admin/e_saldashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/e_saldashboard/AddSalary",
          element: <AddSalary />,
        },
        {
          path: "/admin/e_saldashboard/manage-salary",
          element: <ManageSalary />,
        },
        {
          path: "/admin/e_saldashboard/edit-salary/:id",
          element: <EditSalary />,
          loader: ({ params }) =>
            fetch(`http://localhost:3000/sal/salary/${params.id}`),
        },
        
      ],
    },
     //Rental routes
     {
      path: "/admin/rental/dashboard",
      element: <RentalDashboardLayout/>,
      children: [
        {
          path: "/admin/rental/dashboard",
          element: <RentalDashboard/>,
        },
        {
          path: "/admin/rental/dashboard/manage",
          element: <ManageOrder/>,
        },
        {
          path: "/admin/rental/dashboard/add",
          element: <AddOrder/>,
        },
        {
          path: "/admin/rental/dashboard/edit/:id",
          element: <EditOrder/>,
          loader: ({ params }) => fetch(`http://localhost:3000/rental/get/${params.id}`)
        },
        {
          path: "/admin/rental/dashboard/delete/:id",
          element: <DeleteOrder/>,
          loader: ({ params }) => fetch(`http://localhost:3000/rental/get/${params.id}`)
        }
      ]
    },
    //routes for feedbacks
    {
      path: "/admin/feedback/dashboard",
      element: <FeedbackDashboardLayout />,
      children: [
        {
          path: "/admin/feedback/dashboard",
          element: <FeedbackDashboard />,
        },
        {
          path: "/admin/feedback/dashboard/adminHome",
          element: <AdminHome />,
        },
        ,
        {
          path: "/admin/feedback/dashboard/getFeedback/:id",
          element: <ShowFeedback />,
        },
        {
          path: "/admin/feedback/dashboard/rejectFeedback/:id",
          element: <RejectFeedback />,
        },
      ],
    },
    {
      path: "/client/feedback/homeFeedback",
      element: <HomeFeedback />,
    },
    {
      path: "/client/feedback/addFeedback",
      element: <CreateFeedback />,
    },
    {
      path: "/client/feedback/updateFeedback/:id",
      element: <EditFeedback />,
    },{
      path: "/client/feedback/deleteFeedback/:id",
      element: <DeleteFeedback />,
    },
    /** Inventory page home */
    {
     path: "/client/inventory/details",
     element: <AllInventory />,
   },

  ]);
}
export default CreateRouter;