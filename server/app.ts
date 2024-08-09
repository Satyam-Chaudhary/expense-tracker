import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { cors } from 'hono/cors';

const app = new Hono();

app.use("*", logger());

app.use('*', cors());


  app.route('/api/expenses', expenseRoute);

export default app;
