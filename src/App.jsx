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
import Select from './Page/Public/Select';
import Paint from './Page/Public/Paint/Paint';
import Combobox from './Component/Public/Combobox/Combobox.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/?limit=20`)
      .then(result => result.json())
      .then(data => {
        setProductList([...productList, ...data.products])
      })
  }, []);
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Product" element={<ProductList />} />
            <Route path="Product/:id" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Select" element={<Select />} />
            <Route path="/Paint" element={<Paint />} />
          </Route>
          <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Product" element={<Product />} />
            <Route path="Orders" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Combobox list={productList} multiple={true} filter={true} onChange={() => true} template={() => import("./Component/Public/Combobox/Option/Product.jsx")}/>
              <Combobox list={userList} multiple={true} filter={true} onChange={() => true} template={() => import("./Component/Public/Combobox/Option/User.jsx")}/>
    </div>
  )
}

export default App
