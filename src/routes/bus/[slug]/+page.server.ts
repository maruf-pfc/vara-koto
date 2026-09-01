import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const bus = transportRepository.getBusBySlug(slug) ?? transportRepository.getBusById(slug);

	if (!bus) {
		throw error(404, {
			message: `Bus "${slug}" not found in Dhaka transport directory.`
		});
	}

	const routes = transportRepository.getRoutesByBusId(bus.id);

	// Expand routes with location objects
	const expandedRoutes = routes.map((route) => {
		const stops = route.stops.map((s) => {
			const loc = transportRepository.getLocationById(s.locationId)!;
			return {
				order: s.order,
				location: loc,
				isRequestStop: s.isRequestStop
			};
		});
		return {
			route,
			stops
		};
	});

	return {
		bus,
		expandedRoutes
	};
};
