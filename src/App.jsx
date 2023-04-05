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
import UpdateOrder from "./components/pages/UpdateOrder";
import React from 'react';
import SetPassword from "./components/pages/SetPassword";
import SetToken from './components/organisms/setToken';
import ChangePassword from './components/pages/ChangePassword'
import ProfileFlyOut from "./components/organisms/ProfileFlyOut";
import ForgottenPassword from "./components/pages/ForgottenPassword";


export const axiosObject = axios.create({
  baseURL: 'http://localhost:4001/api/',
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/set-password/:token" element={<SetToken path='login' />}/>
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/reset-password/:token" element={<SetToken path='reset-password'/>}/>
        <Route path="/reset-password" element={<SetPassword />} />
        <Route path="/forgotten-password" element={<ForgottenPassword />} />
        <Route element={<PrivateRoutes />}>
        <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Sidebar />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />


            <Route path="/view-products" >
              <Route path="" element={<ViewProduct />} />
              <Route path=":id" element={<AddProduct />} />
            </Route>
            <Route path="/view-orders" element={<ViewOrders />} />
            {/* <Route path="/add-offers" element={<AddOffers />} /> */}

            <Route element={<PrivateRoutes roleRequired="admin" />}>
              <Route path="/add-user-seller" element={<AddUserSeller />} />
              <Route path="/update-order" element={<UpdateOrder />}></Route>
              <Route path="/view-users" >
                <Route path="" element={<ViewUsers />} />
                <Route path=":id" element={<ViewUserSellerDetails />} />
              </Route>

              <Route path="/view-sellers" >
                <Route path="" element={<ViewSellers />} />
                <Route path=":id" element={<ViewUserSellerDetails />} />
              </Route>

            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  );
}


export default App;
