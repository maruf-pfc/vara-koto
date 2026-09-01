import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { routeService } from '$lib/services/route.service';
import { transportRepository } from '$lib/repositories/transport.repository';

export const load: PageServerLoad = async ({ params }) => {
	const { from, to } = params;

	const fromLocation =
		transportRepository.getLocationBySlug(from) ?? transportRepository.getLocationById(from);
	const toLocation =
		transportRepository.getLocationBySlug(to) ?? transportRepository.getLocationById(to);

	if (!fromLocation || !toLocation) {
		throw error(404, {
			message: `Invalid route locations: "${from}" or "${to}" not found in Dhaka transit directory.`
		});
	}

	const searchResult = routeService.findJourneys(fromLocation.slug, toLocation.slug);

	return {
		fromLocation,
		toLocation,
		searchResult
	};
};
