import { Hono } from "hono";
import { kindeClient } from "../kinde";
import { sessionManager, getUserDetails } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    try {
      const registerUrl = await kindeClient.register(sessionManager(c));
      return c.redirect(registerUrl.toString());
    } catch (e:any) {
      console.log(e);
      return c.json({ error: e.message });
    }
  })
  .get("/callback", async (c) => {
    //get called everytime after login or register
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUserDetails, async (c) => {
    const user = c.var.user;
    return c.json({ user });
  });
