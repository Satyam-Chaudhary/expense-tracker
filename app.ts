import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app
  .get("/test", (c) => {
    return c.json({ message: "Hello, World!" });
  })
  .get(".");

  app.route('/api/expenses', expenseRoute);

export default app;
