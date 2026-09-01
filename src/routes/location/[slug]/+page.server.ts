import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const location =
		transportRepository.getLocationBySlug(slug) ?? transportRepository.getLocationById(slug);

	if (!location) {
		throw error(404, {
			message: `Location "${slug}" not found in Dhaka transport directory.`
		});
	}

	const passingRoutes = transportRepository.getRoutesByLocationId(location.id);
	const busIdSet = new Set(passingRoutes.map((r) => r.busId));
	const buses = Array.from(busIdSet).map((id) => transportRepository.getBusById(id)!);

	// Find direct destinations connected from this stop
	const reachableLocationMap = new Map<string, { location: typeof location; busesCount: number }>();

	for (const route of passingRoutes) {
		const locIndex = route.stops.findIndex((s) => s.locationId === location.id);
		if (locIndex === -1) continue;

		for (const stop of route.stops) {
			if (stop.locationId === location.id) continue;
			const destLoc = transportRepository.getLocationById(stop.locationId);
			if (!destLoc) continue;

			if (!reachableLocationMap.has(destLoc.id)) {
				reachableLocationMap.set(destLoc.id, { location: destLoc, busesCount: 0 });
			}
			reachableLocationMap.get(destLoc.id)!.busesCount++;
		}
	}

	const directDestinations = Array.from(reachableLocationMap.values()).sort(
		(a, b) => b.busesCount - a.busesCount
	);

	return {
		location,
		buses,
		routesCount: passingRoutes.length,
		directDestinations
	};
};
