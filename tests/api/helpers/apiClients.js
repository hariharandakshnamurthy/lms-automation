import { test, expect, request } from "@playwright/test";
import { getAuthContext } from "./authContext";
import { defaultHeaders } from "./helpers";

export default async function getPythonApi() {
  const { tenantId, token } = await getAuthContext();

  return request.newContext({
    baseURL: process.env.PY_DEV,
    extraHTTPHeaders: {
      ...defaultHeaders(),
      Authorization: `Bearer ${token}`,
      "X-Tenant": tenantId,
    },
  });
}
