import type { PageServerLoad } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async () => {
	const locations = transportRepository.getAllLocations();

	// Calculate bus count for each location
	const locationItems = locations.map((loc) => {
		const passingRoutes = transportRepository.getRoutesByLocationId(loc.id);
		const busIds = new Set(passingRoutes.map((r) => r.busId));
		return {
			location: loc,
			busCount: busIds.size
		};
	});

	// Group by area
	const areasMap = new Map<string, { area: string; areaBn: string; items: typeof locationItems }>();
	for (const item of locationItems) {
		const area = item.location.area;
		if (!areasMap.has(area)) {
			areasMap.set(area, { area, areaBn: item.location.areaBn, items: [] });
		}
		areasMap.get(area)!.items.push(item);
	}

	return {
		areas: Array.from(areasMap.values()),
		totalLocations: locations.length
	};
};
