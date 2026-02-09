import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import type { CityStructure } from "@/lib/type";

export const GET: APIRoute = async({url}) => {
  const searchTerm = url.searchParams.get('search')?.toLowerCase();

  if(!searchTerm){
    return new Response(JSON.stringify([]), {status: 200});
  }
  /* Gets the json from astro content */
  const cities = await getCollection('cities');

  /* Filters the data and returns the first 15 entries */
  const filteredCities = cities
  .filter((city: CollectionEntry<'cities'>) => {
    const item = city.data as CityStructure;
    return (
      item.city_ascii.toLowerCase().includes(searchTerm) ||
      item.country.toLowerCase().includes(searchTerm)
    )
  })
  .slice(0, 8)
  .map((city: CollectionEntry<'cities'>) => city.data);

  return new Response(JSON.stringify(filteredCities), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}