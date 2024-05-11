import itemRoutes from "./itemRoute.js";
import categoryRoutes from "./categoryRoute.js";
import userRoutes from "./userRoutes.js";
import billRoutes from "./billRoute.js";

const mountRoutes = (app) => {
app.use("/api/v1/items" , itemRoutes);
app.use("/api/v1/categories" , categoryRoutes);
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/bills" , billRoutes);
}



export default mountRoutes;