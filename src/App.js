import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/pages/Sidebar";
import Dashboard from "./ui/organisem/Dashboard";
import AddProduct from "./ui/organisem/AddProduct";
import ViewProduct from "./ui/organisem/ViewProduct";
import ViewOrders from "./ui/organisem/ViewOrders";


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
