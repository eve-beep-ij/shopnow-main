import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loader from './components/Loader';


const Home = React.lazy(() => import("./pages/Home"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Register = React.lazy(() => import("./pages/Register"));
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"));
const ProductDetail = React.lazy(() => import("./pages/ProdcutDetail"));
const Checkout = React.lazy(() => import("./pages/Checkout"));

const App = () => {
  return (
    <React.Suspense fallback={<div style={{width: "100%", height: "100vh"}}>
      <Loader />
    </div>}>
      
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/' element={<Home />} /> 
          <Route path='/cart' element={<Cart />} /> 
          <Route path='/verify-email' element={<VerifyEmail />} /> 
          <Route path='/product-detail/:id' element={<ProductDetail />} /> 
          <Route path='/checkout' element={<Checkout />} /> 
          <Route path='*' element={<NotFound />} /> 
        </Routes>
      
    </React.Suspense>
  )
}

export default App