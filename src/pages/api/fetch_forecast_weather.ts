import { getCurrentWeather, getForecast } from '@/lib/weather_api';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const searchTerm = url.searchParams.get('q');
  if(!searchTerm){
    return new Response(JSON.stringify([]), {status: 200});
  }
  try {
    const data = await getForecast(searchTerm);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}