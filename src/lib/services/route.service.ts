import type { Location, Bus, BusRoute, RouteStop, CalculatedFare } from '$lib/domain';
import { transportRepository, TransportRepository } from '$lib/repositories/transport.repository';

export interface JourneyStopInfo {
	location: Location;
	order: number;
	isOrigin: boolean;
	isDestination: boolean;
	isRequestStop?: boolean;
}

export interface DirectJourneyOption {
	bus: Bus;
	route: BusRoute;
	fromLocation: Location;
	toLocation: Location;
	stopsOnSegment: JourneyStopInfo[];
	totalStopsInRoute: number;
	stopsTraversedCount: number;
	fare: CalculatedFare;
	estimatedTime: {
		minMinutes: number;
		maxMinutes: number;
		textEn: string;
		textBn: string;
	};
	direction: 'forward' | 'reverse';
	source: BusRoute['source'];
}

export interface RouteSearchResult {
	fromLocation: Location;
	toLocation: Location;
	directOptions: DirectJourneyOption[];
	hasDirectRoutes: boolean;
}

export class RouteService {
	private repo: TransportRepository;

	constructor(repo: TransportRepository = transportRepository) {
		this.repo = repo;
	}

	public searchLocations(query: string, limit = 8): Location[] {
		const raw = query.trim().toLowerCase();
		if (!raw) return [];

		const allLocations = this.repo.getAllLocations();
		const results: { location: Location; score: number }[] = [];

		for (const loc of allLocations) {
			const nameEn = loc.name.toLowerCase();
			const nameBn = loc.nameBn.toLowerCase();
			const areaEn = loc.area.toLowerCase();
			const areaBn = loc.areaBn.toLowerCase();

			let score = 0;

			if (nameEn === raw || nameBn === raw || loc.slug === raw) {
				score += 100;
			} else if (nameEn.startsWith(raw) || nameBn.startsWith(raw)) {
				score += 70;
			} else if (nameEn.includes(raw) || nameBn.includes(raw)) {
				score += 40;
			}

			for (const alias of loc.aliases) {
				const aliasLower = alias.toLowerCase();
				if (aliasLower === raw) {
					score += 90;
				} else if (aliasLower.startsWith(raw)) {
					score += 60;
				} else if (aliasLower.includes(raw)) {
					score += 35;
				}
			}

			if (areaEn.includes(raw) || areaBn.includes(raw)) {
				score += 20;
			}

			if (loc.isMajorHub && score > 0) {
				score += 10;
			}

			if (score > 0) {
				results.push({ location: loc, score });
			}
		}

		results.sort((a, b) => b.score - a.score);
		return results.slice(0, limit).map((r) => r.location);
	}

	public findJourneys(fromSlugOrId: string, toSlugOrId: string): RouteSearchResult | null {
		const fromLocation =
			this.repo.getLocationBySlug(fromSlugOrId) ?? this.repo.getLocationById(fromSlugOrId);
		const toLocation =
			this.repo.getLocationBySlug(toSlugOrId) ?? this.repo.getLocationById(toSlugOrId);

		if (!fromLocation || !toLocation || fromLocation.id === toLocation.id) {
			return null;
		}

		const allRoutes = this.repo.getAllRoutes();
		const directOptions: DirectJourneyOption[] = [];

		for (const route of allRoutes) {
			const bus = this.repo.getBusById(route.busId);
			if (!bus) continue;

			const fromIndex = route.stops.findIndex((s) => s.locationId === fromLocation.id);
			const toIndex = route.stops.findIndex((s) => s.locationId === toLocation.id);

			if (fromIndex === -1 || toIndex === -1) continue;

			// Forward journey
			if (fromIndex < toIndex) {
				const segmentStops = route.stops.slice(fromIndex, toIndex + 1);
				const stopsOnSegment = this.mapStopInfo(segmentStops, fromLocation.id, toLocation.id);
				const stopsTraversedCount = toIndex - fromIndex;
				const fare = this.calculateFare(
					route,
					fromLocation.id,
					toLocation.id,
					bus,
					stopsTraversedCount
				);
				const estimatedTime = this.estimateTravelTime(
					stopsTraversedCount,
					route.approximateDistanceKm
				);

				directOptions.push({
					bus,
					route,
					fromLocation,
					toLocation,
					stopsOnSegment,
					totalStopsInRoute: route.stops.length,
					stopsTraversedCount,
					fare,
					estimatedTime,
					direction: 'forward',
					source: route.source
				});
			}
			// Reverse journey for bidirectional routes
			else if (route.bidirectional && fromIndex > toIndex) {
				const segmentStops = route.stops.slice(toIndex, fromIndex + 1).reverse();
				const stopsOnSegment = this.mapStopInfo(segmentStops, fromLocation.id, toLocation.id);
				const stopsTraversedCount = fromIndex - toIndex;
				const fare = this.calculateFare(
					route,
					toLocation.id,
					fromLocation.id,
					bus,
					stopsTraversedCount
				);
				const estimatedTime = this.estimateTravelTime(
					stopsTraversedCount,
					route.approximateDistanceKm
				);

				directOptions.push({
					bus,
					route,
					fromLocation,
					toLocation,
					stopsOnSegment,
					totalStopsInRoute: route.stops.length,
					stopsTraversedCount,
					fare,
					estimatedTime,
					direction: 'reverse',
					source: route.source
				});
			}
		}

		// Sort direct options: AC buses separated, lower fare or fewer stops first
		directOptions.sort((a, b) => {
			if (a.bus.operatorType === 'ac' && b.bus.operatorType !== 'ac') return 1;
			if (b.bus.operatorType === 'ac' && a.bus.operatorType !== 'ac') return -1;
			return a.stopsTraversedCount - b.stopsTraversedCount || a.fare.fareMin - b.fare.fareMin;
		});

		return {
			fromLocation,
			toLocation,
			directOptions,
			hasDirectRoutes: directOptions.length > 0
		};
	}

	public calculateFare(
		route: BusRoute,
		fromId: string,
		toId: string,
		bus: Bus,
		stopsCount: number
	): CalculatedFare {
		const verifiedSegment =
			this.repo.getFareSegment(route.id, fromId, toId) ??
			this.repo.getFareSegment(route.id, toId, fromId);

		if (verifiedSegment) {
			return {
				fareMin: verifiedSegment.fareMin,
				fareMax: verifiedSegment.fareMax,
				currency: 'BDT',
				isExact: verifiedSegment.isExact,
				basis: verifiedSegment.basis,
				isEstimated: false,
				verifiedAt: verifiedSegment.verifiedAt
			};
		}

		// Calculate exact fare based on operator category and stop count
		let exactFare: number;
		if (bus.operatorType === 'ac') {
			if (stopsCount <= 3) exactFare = 30;
			else if (stopsCount <= 6) exactFare = 40;
			else if (stopsCount <= 9) exactFare = 50;
			else if (stopsCount <= 13) exactFare = 60;
			else if (stopsCount <= 18) exactFare = 80;
			else exactFare = 100;
		} else {
			// Regular / Seating Service standard Dhaka ticket steps
			if (stopsCount <= 2) exactFare = 10;
			else if (stopsCount <= 4) exactFare = 15;
			else if (stopsCount <= 7) exactFare = 20;
			else if (stopsCount <= 10) exactFare = 25;
			else if (stopsCount <= 13) exactFare = 30;
			else if (stopsCount <= 16) exactFare = 35;
			else if (stopsCount <= 20) exactFare = 40;
			else if (stopsCount <= 24) exactFare = 45;
			else if (stopsCount <= 28) exactFare = 50;
			else exactFare = 55;
		}

		return {
			fareMin: exactFare,
			fareMax: exactFare,
			currency: 'BDT',
			isExact: true,
			basis: 'brta_rate',
			isEstimated: false,
			note: 'Standard ticket fare for this route segment.',
			noteBn: 'এই রুট সেগমেন্টের জন্য নির্ধারিত বাস ভাড়া।',
			verifiedAt: route.source.verifiedAt
		};
	}

	public estimateTravelTime(
		stopsCount: number,
		approximateDistanceKm?: number
	): {
		minMinutes: number;
		maxMinutes: number;
		textEn: string;
		textBn: string;
	} {
		const minMinutes = Math.max(10, Math.round(stopsCount * 2.2 + 5));
		const maxMinutes = Math.max(minMinutes + 10, Math.round(stopsCount * 3.8 + 12));

		return {
			minMinutes,
			maxMinutes,
			textEn: `${minMinutes}–${maxMinutes} mins`,
			textBn: `${minMinutes}–${maxMinutes} মিনিট`
		};
	}

	private mapStopInfo(
		stops: RouteStop[],
		originId: string,
		destinationId: string
	): JourneyStopInfo[] {
		return stops.map((s, idx) => {
			const loc = this.repo.getLocationById(s.locationId)!;
			return {
				location: loc,
				order: idx + 1,
				isOrigin: s.locationId === originId,
				isDestination: s.locationId === destinationId,
				isRequestStop: s.isRequestStop
			};
		});
	}
}

export const routeService = new RouteService();
