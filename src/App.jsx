import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// --- Student / User ---
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import Upload from "./pages/Upload";
import OrderStatus from "./pages/OrderStatus";
import Dashboard from "./pages/Dashboard";

// --- Shop ---
import ShopLogin from "./pages/shop/shopLogin";
import ShopSetup from "./pages/shop/shopSetup";
import ShopDashboard from "./pages/shop/ShopDashboard";

// --- Auth ---
import { AuthProvider } from "./context/AuthContext";
import {
  RedirectIfAuth,
  RequireAuth,
  RequireShop,
} from "./routes/ProtectedRoutes";

function App() {
  const BaseLayout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* =========================================
              SECTION 1: SHOP OWNER ROUTES
              (No Header/Footer)
             ========================================= */}
          <Route element={<RequireShop />}>
            <Route path='/shop/setup' element={<ShopSetup />} />
            <Route path='/shop/dashboard' element={<ShopDashboard />} />
          </Route>

          {/* Shop login (blocked if already logged in) */}
          <Route element={<RedirectIfAuth />}>
            <Route path='/shop/login' element={<ShopLogin />} />
          </Route>

          {/* =========================================
              SECTION 2: STUDENT / USER ROUTES
              (Wrapped in BaseLayout)
             ========================================= */}
          <Route path='/' element={<BaseLayout />}>
            <Route index element={<Home />} />

            {/* User login */}
            <Route element={<RedirectIfAuth />}>
              <Route path='login/user' element={<UserLogin />} />
            </Route>

            {/* User-only pages */}
            <Route element={<RequireAuth />}>
              <Route path='upload' element={<Upload />} />
              <Route path='order/:orderId' element={<OrderStatus />} />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
