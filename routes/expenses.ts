import { Hono } from "hono";

export const expenseRoute = new Hono();

type Expense = {
    id:number,
    title:string,
    amount:number,
};

const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 10 },
    { id: 2, title: "Transportation", amount: 20 },
    { id: 3, title: "Utilities", amount: 30 },
    { id: 4, title: "Entertainment", amount: 40 },
    { id: 5, title: "Dining Out", amount: 50 },
];


expenseRoute
  .get("/", (c) => {
    return c.json({ expenses: [] });
  })
  .post("/", async (c) => {
    const expense = await c.req.json();
    console.log(expense);
    return c.json(expense);
    
  });
