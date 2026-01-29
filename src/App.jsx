import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layout/Public/Layout.jsx';
import AdminLayout from './Layout/Admin/Layout.jsx';
import ProductList from './Page/Public/ProductList/ProductList';
import Home from './Page/Public/Home/Home';
import ProductDetail from './Page/Public/ProductDetail/ProductDetail';
import Cart from './Page/Public/Cart/Cart';
import Dashboard from './Page/Admin/Dashboard/Dashboard';
import Product from './Page/Admin/Product/Product';
import Order from './Page/Admin/Order/Order';

function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="Product" element={<ProductList/>} />
            <Route path="Product/:id" element={<ProductDetail/>} />
            <Route path="/Cart" element={<Cart/>} />
          </Route>
          <Route path="/Admin" element={<AdminLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path="Product" element={<Product/>} />
            <Route path="Orders" element={<Order/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
