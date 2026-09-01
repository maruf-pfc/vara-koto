import type { RequestHandler } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;
	const buses = transportRepository.getAllBuses();
	const locations = transportRepository.getAllLocations();
	const routes = transportRepository.getAllRoutes();

	const staticPages = ['', '/buses', '/locations', '/about', '/methodology', '/contribute'];

	const busPages = buses.map((b) => `/bus/${b.slug}`);
	const locationPages = locations.map((l) => `/location/${l.slug}`);

	// Popular route pairs
	const routePages: string[] = [];
	for (const route of routes) {
		if (route.stops.length >= 2) {
			const originLoc = transportRepository.getLocationById(route.originId);
			const destLoc = transportRepository.getLocationById(route.destinationId);
			if (originLoc && destLoc) {
				routePages.push(`/route/${originLoc.slug}/to/${destLoc.slug}`);
				if (route.bidirectional) {
					routePages.push(`/route/${destLoc.slug}/to/${originLoc.slug}`);
				}
			}
		}
	}

	const allUrls = [
		...staticPages.map((p) => `${origin}${p}`),
		...busPages.map((p) => `${origin}${p}`),
		...locationPages.map((p) => `${origin}${p}`),
		...routePages.map((p) => `${origin}${p}`)
	];

	const uniqueUrls = Array.from(new Set(allUrls));

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
	.map(
		(pageUrl) => `  <url>
    <loc>${pageUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>${pageUrl === `${origin}/` ? '1.0' : pageUrl.includes('/route/') ? '0.9' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
