import { request, expect } from "@playwright/test";
import { defaultHeaders } from "./helpers";

let cachedAuth = null;

export async function getAuthContext() {
  if (cachedAuth) return cachedAuth;

  const authContext = await request.newContext({
    baseURL: process.env.DEV_API,
    extraHTTPHeaders: {
      ...defaultHeaders(),
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "X-Tenant": process.env.TENANT_ID,
    },
  });

  const res = await authContext.post("/api/v1/login", {
    data: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  const headers = res.headers();

  const token =
    headers["authorization"]?.split(" ")[1] ||
    body?.data?.token ||
    body?.data?.access_token ||
    body?.token ||
    body?.access_token;

  const setCookie = headers["set-cookie"] || "";
  const tenantMatch = String(setCookie).match(/X-Tenant=([^;,\s]+)/);
  const tenantId = tenantMatch?.[1];
  const accountSlug = body?.data?.account?.slug;

  if (!token || !tenantId || !accountSlug) {
    throw new Error("Auth context incomplete");
  }

  cachedAuth = { token, tenantId, accountSlug };
  return cachedAuth;
}
