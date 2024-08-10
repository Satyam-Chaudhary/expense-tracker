import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expenseRoute } from "./routes/expenses";


const app = new Hono();

app.use("*", logger());

const apiRoute  = app.route("api/expenses", expenseRoute);


// Static files not getting served from the client/dist folder at any url other than the root url i.e. localhost:3000 WHYYYYYYYYYYYY


app.use("*", serveStatic({ root: "../client/dist", }));
app.get("*", serveStatic({ path: "../client/dist/index.html" }));



export type ApiRoutes = typeof apiRoute;
export default app;
