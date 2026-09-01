import type { PageServerLoad } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async () => {
	const buses = transportRepository.getAllBuses();
	const locations = transportRepository.getAllLocations();
	const routes = transportRepository.getAllRoutes();

	// Group locations by area
	const areasMap = new Map<string, { area: string; areaBn: string; locations: typeof locations }>();
	for (const loc of locations) {
		if (!areasMap.has(loc.area)) {
			areasMap.set(loc.area, { area: loc.area, areaBn: loc.areaBn, locations: [] });
		}
		areasMap.get(loc.area)!.locations.push(loc);
	}

	return {
		buses,
		locations,
		routesCount: routes.length,
		areas: Array.from(areasMap.values())
	};
};
