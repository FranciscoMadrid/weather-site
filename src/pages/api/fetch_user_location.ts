import { getCurrentLocation } from "@/lib/weather_api";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "";
    try {
      const data = await getCurrentLocation(ip)
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};