import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/pages/Sidebar";
import Dashboard from './components/pages/Dashboard';
import AddProduct from "./components/pages/AddProduct";
import ViewProduct from "./components/pages/ViewProduct"
import ViewOrders from './components/pages/ViewOrders'
import Login from "./components/pages/Login";
import axios from "axios";
import PrivateRoutes from "./components/authentication/Authentication";
import ViewUsers from "./components/pages/ViewUsers";
import ViewSellers from "./components/pages/ViewSellers";
import ViewUserSellerDetails from "./components/pages/ViewUserSellerDetails";
import AddUserSeller from "./components/pages/AddUserSeller";
import ResetPassword from "./components/pages/ResetPassword";
import ResetToken from './components/organisms/ResetToken'


export const axiosObject = axios.create({
  baseURL: 'http://localhost:3200/api/',
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetToken />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<PrivateRoutes />}>

          <Route path="/" element={<Sidebar />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />


            <Route path="/view-products" element={<ViewProduct />} />
            <Route path="/view-orders" element={<ViewOrders />} />

            <Route element={<PrivateRoutes roleRequired="admin" />}>
              <Route path="/add-user-seller" element={<AddUserSeller />} />
              <Route path="/view-users" element={<ViewUsers />} />
              <Route path="/view-sellers" element={<ViewSellers />} />
              <Route path="/view-user/:id" element={<ViewUserSellerDetails />} />
            </Route>

          </Route>

        </Route>
      </Routes>
    </Router>
  );
}



export default App;
