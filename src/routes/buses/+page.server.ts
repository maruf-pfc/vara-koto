import type { PageServerLoad } from './$types';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async () => {
	const buses = transportRepository.getAllBuses();
	const busRouteMap = buses.map((bus) => {
		const routes = transportRepository.getRoutesByBusId(bus.id);
		return {
			bus,
			routes,
			stopsCount: routes[0]?.stops.length ?? 0,
			origin: routes[0]?.stops[0]
				? transportRepository.getLocationById(routes[0].stops[0].locationId)
				: null,
			destination: routes[0]?.stops[routes[0].stops.length - 1]
				? transportRepository.getLocationById(
						routes[0].stops[routes[0].stops.length - 1].locationId
					)
				: null
		};
	});

	return {
		busList: busRouteMap
	};
};
