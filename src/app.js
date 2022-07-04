// Imports
import express from "express";
import dotenv from "dotenv/config";
import { allowHeaders } from "./middleware/server-headers.js";
import { error404, errorInternal } from "./middleware/error-handling.js";
import { itemRoutes } from "./routes/item-routes.js";
import { commentRoutes } from "./routes/comment-routes.js";
import { messageRoutes } from "./routes/message-routes.js";
import { userRoutes } from "./routes/user-routes.js";
import { favoriteRoutes } from "./routes/favorite-routes.js";

// Express
const app = express();

// Body-Parser
app.use(express.json());

// Middleware
app.use(allowHeaders);

// Routes
app.use("/items", itemRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/comments", commentRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Errors
app.use(error404)
app.use(errorInternal);

// Listen on port 5500
app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`)
});
