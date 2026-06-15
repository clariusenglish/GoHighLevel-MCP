const BASE = process.env.GHL_BASE_URL || "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

/** GET helper for the GoHighLevel API v2 using a Private Integration Token. */
export async function ghlGet(path: string, params?: Record<string, unknown>) {
  const token = process.env.GHL_API_KEY;
  if (!token) throw new Error("Falta la variable GHL_API_KEY");

  const url = new URL(BASE + path);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Version: VERSION,
      Accept: "application/json",
    },
  });

  const raw = await res.text();
  let body: unknown;
  try { body = JSON.parse(raw); } catch { body = raw; }

  if (!res.ok) {
    throw new Error(`GHL API ${res.status}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body;
}
