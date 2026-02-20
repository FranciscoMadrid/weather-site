A modern, real-time weather application engineered for speed, security, and type-safety. 
Built with Astro, React, and Tailwind CSS, this project demonstrates a "Server-First" approach to fetching and displaying meteorological data.

Live Demo
https://weather-site-alpha-nine.vercel.app/

Key Highlight

- End-to-End Type Safety: Fully typed API responses and component props using TypeScript.
- Zero-JS by Default: Leverages Astro’s Islands architecture to ship minimal JavaScript to the browser.
- Security First: WeatherAPI keys are strictly managed on the server-side, preventing exposure in client-side bundles.
- Edge-Ready: Optimized for Vercel’s global edge network for low-latency data delivery.

Tech Stack

| Technology  | Purpose                           |
| ----------- | --------------------------------- |
| Astro       | Framework & server-side rendering |
| React       | Interactive UI components         |
| TailwindCSS | Styling                           |
| WeatherAPI  | Real-time weather data            |
| Vercel      | Hosting & deployment              |


Architecture & API Strategy

- Weather data is fetched server-side using Astro API routes
- API keys are stored in environment variables
- No sensitive data is exposed in the browser
- Structured request handling to minimize unnecessary API calls
- Optimized for Vercel serverless deployment
