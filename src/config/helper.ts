import dayjs from "dayjs";
import {tokenType} from "../store/initialState";
import {store} from "../store";
import {login, logout} from "../store/reducers/userSlice";
import {refreshUrl} from "./api";

export async function getValidToken(tokens: tokenType) {
    let created_at: string;
    try {
        if (Object.keys(tokens).indexOf("reCreatedAt") !== -1) {
            created_at = tokens.reCreatedAt;
        } else {
            created_at = tokens.createdAt;
        }
    } catch (e) {
        return false;
    }
    const isAccessExpired = dayjs(created_at).add(tokens.expiry, "s") < dayjs().add(2, "m");
    const isRefreshValid = dayjs(tokens.createdAt).add(tokens.refreshExpiry, "s") > dayjs().add(30, "m");

    if (isAccessExpired) {
        if (isRefreshValid) {
            const resp = await fetch(refreshUrl, {
                method: "POST",
                headers:
          {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
                body: JSON.stringify({
                    "refresh": tokens.refreshToken
                })
            });
            if (resp.status === 200) {
                const data = await resp.json();
                const tok = JSON.parse(JSON.stringify(tokens));
                tok["accessToken"] = data["accessToken"];
                tok["reCreatedAt"] = dayjs().valueOf();
                return tok;
            }
        } else {
            return null;
        }
    }
    return tokens;
}

export async function checkValidity(tokens: tokenType) {
    let created_at;
    try {
        if (Object.keys(tokens).indexOf("reCreatedAt") !== -1) {
            created_at = tokens.reCreatedAt;
        } else {
            created_at = tokens.createdAt;
        }
    } catch (e) {
        return false;
    }
    const isAccessExpired = dayjs(created_at).add(tokens.expiry, "s") < dayjs().add(2, "m");
    const isRefreshValid = dayjs(tokens.createdAt).add(tokens.refreshExpiry, "s") > dayjs().add(30, "m");

    if (isAccessExpired) {
        if (isRefreshValid) {
            const resp = await fetch(refreshUrl, {
                method: "POST",
                headers:
          {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
                body: JSON.stringify({
                    "refresh": tokens.refreshToken
                })
            });
            if (resp.status === 200) {
                const data = await resp.json();
                const tok = JSON.parse(JSON.stringify(tokens));
                tok["accessToken"] = data["accessToken"];
                tok["reCreatedAt"] = dayjs().valueOf();
                return tok;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return tokens;
    }
}

export async function fetchWithToken(url: string, method: string, headers?: any, body?: string | FormData) {
    const state: any = store.getState();
    const token = await getValidToken(state.user.tokens);
    store.dispatch(login(token));

    let header = {
        "authorization": `Bearer ${token.accessToken}`,
        "content-type": "application/json",
        "accept": "application/json"
    };
    if (headers)
        header = {
            ...header,
            ...headers
        };
    const resp = await fetch(url, {
        method: method,
        headers: header,
        body
    });
    if (resp.status === 401) {
        store.dispatch(logout());
    }
    return resp;
}
