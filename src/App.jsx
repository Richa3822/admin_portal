import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/pages/Sidebar";
import Dashboard from './components/pages/Dashboard';
import AddProduct from "./components/pages/AddProduct";
import ViewProduct from "./components/pages/ViewProduct"
import ViewOrders from './components/pages/ViewOrders'
import axios from "axios";



export const axiosObject = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} >
          <Route index element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-products" element={<ViewProduct />}/>
          <Route path="/view-orders" element={<ViewOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}



export default App;
