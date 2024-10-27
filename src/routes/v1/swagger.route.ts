import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../../modules/swagger/swagger.definition";

const router = express.Router();

delete require.cache[
  require.resolve("../../modules/swagger/swagger.definition")
];

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["packages/components.yaml", "dist/routes/v1/*.js"],
});

// Disable browser and server-side caching
router.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export default router;
