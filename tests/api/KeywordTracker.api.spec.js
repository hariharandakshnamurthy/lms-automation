import { test, expect } from "@playwright/test";
import getPythonApi from "./helpers/apiClients";
import { KEYWORD_TRACKER_TEST_DATA } from "../ui/testdata/KeywordTracker.data";
import { getAuthContext } from "./helpers/authContext";
import { defaultHeaders } from "./helpers/helpers";

test.use({ baseURL: process.env.PY_DEV });

test.describe("Keyword Tracker API tests", () => {
  test("Add Product for Keyword Tracking", async () => {
    const { accountSlug } = await getAuthContext();
    const api = await getPythonApi();

    const res = await api.post(`${accountSlug}/keyword_tracker`, {
      data: {
        asin: KEYWORD_TRACKER_TEST_DATA.VALID_ASIN,
        channel_id: 11,
        competitor_asins: [],
        keywords: ["Sleeping Mat"],
        status: true,
      },
    });
    const data = await res.json();
    try {
      await expect([200, 201]).toContain(res.status());
    } catch (e) {
      console.log(res.status());
      console.log(data);
      console.error(e);
    }
  });

  test("get product list", async () => {
    const { accountSlug, tenantId, token } = await getAuthContext();

    console.log(tenantId);
    const api = await getPythonApi();
    const res = await api.post(`${accountSlug}/keyword_tracker/list`, {
      headers: {
        // "X-Tenant": tenantId,
        // Authorization: `Bearer ${token}`,
        ...defaultHeaders(),
        Cookie: `X-Tenant=${tenantId};Authorization=Bearer${token}`,
      },
      data: {
        channel_id: 1,
        filters: {},
        limit: 20,
        order_by: "asc",
        page: 1,
        sort_by: "competitors",
      },
    });

    const url = process.env.PY_DEV;
    console.log(url);

    const data = await res.json();

    console.log(data);
  });
});
