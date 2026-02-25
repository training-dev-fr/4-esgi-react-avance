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
import AutoComplete from './Component/Public/AutoComplete/AutoComplete.jsx';
import { AuthProvider } from './Context/auth.context.jsx';
import Modal from './Component/Public/Modal/Modal.jsx';
import Page404 from './Page/Page404/Page404.jsx';
import ProtectedRoute from './Context/ProtectedRoute.jsx';

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
    fetch(`https://dummyjson.com/users/`)
      .then(result => result.json())
      .then(data => {
        data = data.users.map(user => user.firstName);
        setUserList([...userList, ...data])
      })
  }, []);
  return (
    <div>
      <AuthProvider>
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
            <Route element={<ProtectedRoute roles={['admin']} />} >
              <Route path="/Admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="Product" element={<Product />} />
                <Route path="Orders" element={<Order />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute roles={['admin', 'member']} />} >
              <Route path="/User/:id" element={<Home />} />
              <Route path="/User/Edit/:id" element={<Home />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>

          <AutoComplete data={userList} />
        </BrowserRouter>

      </AuthProvider>
    </div>
  )
}

export default App
