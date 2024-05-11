import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import Items from "../pages/Items";
import CartPage from "../pages/CartPage";
import Bills from "../pages/Bills";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "./../pages/LoginPage";
import SuperAdminRoutes from "../components/protectedRoutes/SuperAdminRoutes";
import AdminRoutes from "../components/protectedRoutes/AdminRoutes";
import ItemDetails from "../pages/ItemDetails";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={<AdminRoutes/>}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/items/:id" element={<ItemDetails/>} />
      </Route>

      <Route path="" element={<SuperAdminRoutes/>}>
        <Route path="/items" element={<Items />} />
      </Route>
    </Route>
  )
);

export default Router;
