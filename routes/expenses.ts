import { Hono } from "hono";

const expenseRoute = new Hono();

expenseRoute
  .get("/", (c) => {
    return c.json({ expenses: [] });
  })
  .post("/", (c) => {
    return c.json({ message: "Expense created!" });
  });
