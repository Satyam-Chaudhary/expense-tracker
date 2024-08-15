import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";

import { getCookie, setCookie, deleteCookie } from "hono/cookie";

import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    //not taking from env file

    authDomain: "https://satyamchaudhary.kinde.com",
    clientId: "7f761aef16d4463d83430c67b289dc2a",
    clientSecret: "uiXGtj6fWul7phW2a6O5QWoqSguZhY9u2240f8j6wYqQD5OZi",
    redirectURL: "http://localhost:5173/api/callback",
    logoutRedirectURL: "http://localhost:5173",
  }
);

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});
type Env = {
  Variables: {
    user: UserType;
  };
};

const factory = createFactory<Env>()

export const getUserDetails = factory.createMiddleware(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager); // Boolean: true or false

    if (!isAuthenticated) {
      // Need to implement, e.g: call an api, etc...
      return c.json({ erroe: "Unauthorized" }, 401);
    }
    const user = await kindeClient.getUserProfile(manager);
    c.set("user", user);
    await next();
  } catch (e: any) {
    console.log(e);
    return c.json({ error: e.message });
  }
});
