import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";

import {
    getCookie,
    setCookie,
    deleteCookie,
  } from 'hono/cookie'

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    //not taking from env file

    authDomain:"https://satyamchaudhary.kinde.com",
    clientId: "7f761aef16d4463d83430c67b289dc2a",
    clientSecret: "uiXGtj6fWul7phW2a6O5QWoqSguZhY9u2240f8j6wYqQD5OZi",
    redirectURL: "http://localhost:5173/api/callback",
    logoutRedirectURL: "http://localhost:5173",
  }
);



export const sessionManager = (c:Context) : SessionManager => (
    {
        async getSessionItem(key: string) {
            const result = getCookie(c, key);
            return result;
        },
        async setSessionItem(key: string, value: unknown) {
           const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
           } as const;
              if(typeof value === 'string'){
                setCookie(c, key, value, cookieOptions);
              }else{
                setCookie(c, key, JSON.stringify(value), cookieOptions);
              }
        },
        async removeSessionItem(key: string) {
            deleteCookie(c, key);
        },
        async destroySession() {
           ["id_token", "access_token","user", "refresh_token"].forEach((key) => {
            deleteCookie(c, key);
        });
        },
    }
)