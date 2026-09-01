import type { Location, Bus, BusRoute, FareSegment } from '$lib/domain';
import locationsData from '$lib/data/locations.json';
import busesData from '$lib/data/buses.json';
import routesData from '$lib/data/routes.json';
import faresData from '$lib/data/fares.json';

export class TransportRepository {
	private static instance: TransportRepository;

	private readonly locations: Location[];
	private readonly buses: Bus[];
	private readonly routes: BusRoute[];
	private readonly fares: FareSegment[];

	private readonly locationById = new Map<string, Location>();
	private readonly locationBySlug = new Map<string, Location>();
	private readonly busById = new Map<string, Bus>();
	private readonly busBySlug = new Map<string, Bus>();
	private readonly routeById = new Map<string, BusRoute>();
	private readonly routesByBusId = new Map<string, BusRoute[]>();
	private readonly fareMap = new Map<string, FareSegment>();

	private constructor() {
		this.locations = locationsData as Location[];
		this.buses = busesData as Bus[];
		this.routes = routesData as BusRoute[];
		this.fares = faresData as FareSegment[];

		for (const loc of this.locations) {
			this.locationById.set(loc.id, loc);
			this.locationBySlug.set(loc.slug, loc);
		}

		for (const bus of this.buses) {
			this.busById.set(bus.id, bus);
			this.busBySlug.set(bus.slug, bus);
		}

		for (const route of this.routes) {
			this.routeById.set(route.id, route);
			const existing = this.routesByBusId.get(route.busId) ?? [];
			existing.push(route);
			this.routesByBusId.set(route.busId, existing);
		}

		for (const fare of this.fares) {
			const key = `${fare.routeId}:${fare.fromLocationId}:${fare.toLocationId}`;
			this.fareMap.set(key, fare);
		}
	}

	public static getInstance(): TransportRepository {
		if (!TransportRepository.instance) {
			TransportRepository.instance = new TransportRepository();
		}
		return TransportRepository.instance;
	}

	public getAllLocations(): Location[] {
		return this.locations;
	}

	public getLocationById(id: string): Location | undefined {
		return this.locationById.get(id);
	}

	public getLocationBySlug(slug: string): Location | undefined {
		return this.locationBySlug.get(slug);
	}

	public getAllBuses(): Bus[] {
		return this.buses;
	}

	public getBusById(id: string): Bus | undefined {
		return this.busById.get(id);
	}

	public getBusBySlug(slug: string): Bus | undefined {
		return this.busBySlug.get(slug);
	}

	public getAllRoutes(): BusRoute[] {
		return this.routes;
	}

	public getRouteById(id: string): BusRoute | undefined {
		return this.routeById.get(id);
	}

	public getRoutesByBusId(busId: string): BusRoute[] {
		return this.routesByBusId.get(busId) ?? [];
	}

	public getRoutesByLocationId(locationId: string): BusRoute[] {
		return this.routes.filter((route) => route.stops.some((s) => s.locationId === locationId));
	}

	public getFareSegment(
		routeId: string,
		fromLocationId: string,
		toLocationId: string
	): FareSegment | undefined {
		return this.fareMap.get(`${routeId}:${fromLocationId}:${toLocationId}`);
	}
}

export const transportRepository = TransportRepository.getInstance();
