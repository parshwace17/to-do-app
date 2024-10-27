import express, { Router } from "express";
import authRoute from "./auth.route";
import docsRoute from "./swagger.route";
import config from "../../config/config";
import todoRoute from "./todo.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/todos", // Add the path for your todo routes
    route: todoRoute, // Connect the todo route
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
