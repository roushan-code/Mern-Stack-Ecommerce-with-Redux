import './App.css';
import Header from "./component/layout/Header/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from 'webfontloader';
import React from 'react';
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import Contact from './component/layout/Contact/Contact.jsx';
import About from './component/layout/About/About.jsx';
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Products from "./component/Product/Products.jsx"
import Search from "./component/Product/Search.jsx"
import LoginSignUp from './component/User/LoginSignUp.jsx';
import store from "./store"
import { loadUser } from './actions/userAction.jsx';
import UserOptions from "./component/layout/Header/UserOptions.jsx"
import { useSelector } from 'react-redux';
import ForgotPassword from './component/User/ForgotPassword.jsx';
import ResetPassword from './component/User/ResetPassword.jsx';
import Cart from "./component/Cart/Cart.jsx"
import Profile from './component/User/Profile.jsx';
import PrivateRoute from './component/Route/ProtectedRoute.jsx';
import PrivateRouteAdmin from './component/Route/ProtectedRouteAdmin.jsx';
import UpdateProfile from './component/User/UpdateProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword.jsx';
import Shipping from './component/Cart/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx';
import MyOrders from './component/Order/MyOrders.jsx';


import PaymentGuard from './component/Route/PaymentGuard.jsx';
import OrderSuccess from './component/Cart/OrderSuccess.jsx';
import OrderDetails from './component/Order/OrderDetails.jsx';
import Dashboard from './component/Admin/Dashboard.jsx';
import ProductList from './component/Admin/ProductList.jsx';
import NewProduct from './component/Admin/NewProduct.jsx';
import UpdateProduct from './component/Admin/UpdateProduct.jsx';
import OrderList from './component/Admin/OrderList.jsx';
import ProcessOrder from './component/Admin/ProcessOrder.jsx';
import UsersList from './component/Admin/UserList.jsx';
import UpdateUser from './component/Admin/UpdateUser.jsx';
import ProductReviews from './component/Admin/ProductReviews.jsx';
import NotFound from "./component/layout/Not Found/NotFound.jsx"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());


  }, [])

  // window.addEventListener("contextmenu", (e)=> e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        {/* <Route
          element={<PrivateRouteAdmin isAdmin={true} />}
        >
          <Route element={<Dashboard />} path="/admin/dashboard" exact/>
        </Route> */}

        <Route path="/admin/dashboard"
          element={
            <PrivateRouteAdmin isAdmin={true} >
              <Dashboard />
            </PrivateRouteAdmin>
          }
        ></Route>

        <Route path="/admin/products"
          element={<PrivateRouteAdmin isAdmin={true} >
            <ProductList />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/product"
          element={<PrivateRouteAdmin isAdmin={true} >
            <NewProduct />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/product/:id"
          element={<PrivateRouteAdmin isAdmin={true} >
            <UpdateProduct />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/orders"
          element={<PrivateRouteAdmin isAdmin={true} >
            <OrderList />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/order/:id"
          element={<PrivateRouteAdmin isAdmin={true} >
            <ProcessOrder />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/users"
          element={<PrivateRouteAdmin isAdmin={true} >
            <UsersList />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/user/:id"
          element={<PrivateRouteAdmin isAdmin={true} >
            <UpdateUser />
          </PrivateRouteAdmin>}
        ></Route>

        <Route path="/admin/reviews"
          element={<PrivateRouteAdmin isAdmin={true} >
            <ProductReviews />
          </PrivateRouteAdmin>}
        ></Route>


        {/* <Route
          element={<PrivateRoute isAdmin={false} />}
        >
          <Route element={<Profile />} path="/account" exact />
        </Route> */}

        <Route path="/account"
          element={<PrivateRoute isAdmin={false} >
            <Profile />
          </PrivateRoute>}
        ></Route>
        <Route path="/me/update"
          element={<PrivateRoute isAdmin={false} >
            <UpdateProfile />
          </PrivateRoute>}
        ></Route>
        <Route path="/password/update"
          element={<PrivateRoute isAdmin={false} >
            <UpdatePassword />
          </PrivateRoute>}
        ></Route>
        <Route path="/login/shipping"
          element={<PrivateRoute isAdmin={false} >
            <Shipping />
          </PrivateRoute>}
        ></Route>
        <Route path="/order/confirm"
          element={<PrivateRoute isAdmin={false} >
            <ConfirmOrder />
          </PrivateRoute>}
        ></Route>
        <Route path="/success"
          element={<PrivateRoute isAdmin={false} >
            <OrderSuccess />
          </PrivateRoute>}
        ></Route>
        <Route path="/orders"
          element={<PrivateRoute isAdmin={false} >
            <MyOrders />
          </PrivateRoute>}
        ></Route>
        <Route path="/order/:id"
          element={<PrivateRoute isAdmin={false} >
            <OrderDetails />
          </PrivateRoute>}
        ></Route>


        <Route element={
          <PaymentGuard />
        } path="/process/payment" exact />

        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>

  );
}

export default App;

