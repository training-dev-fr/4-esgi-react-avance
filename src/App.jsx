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
import DynamicList from './Component/Public/DynamicList/DynamicList.jsx';

function App() {
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/?limit=20`)
      .then(result => result.json())
      .then(data => {
        setProductList([...productList, ...data.products])
      })
  }, []);


  useEffect(() => {
    fetch(`https://dummyjson.com/users/?limit=20`)
      .then(result => result.json())
      .then(data => {
        data = data.users.map(user => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image
          }
        });
        setUserList([...userList, ...data])
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
          <Route path="/User/:id" element={<Home />} />
          <Route path="/User/Edit/:id" element={<Home />} />
        </Routes>
         <DynamicList dataList={ userList} template={() => import('./Component/Public/Card/User.jsx')} path="/User"></DynamicList>
      </BrowserRouter>
     
    </div>
  )
}

export default App
