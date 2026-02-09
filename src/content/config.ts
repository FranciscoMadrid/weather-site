import { file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const cityScheme = z.object({
  city: z.string(),
  city_ascii: z.string(),
  lat: z.string(),
  lng: z.string(),
  country: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  admin_name: z.string(),
  capital: z.string(),
  population:z.string(),
  id: z.string(), 
})

export type City = z.infer<typeof cityScheme>;

const cities = defineCollection({
  loader: file('src/config/world_cities.json'),
  schema: cityScheme
})

export const collections = { cities }