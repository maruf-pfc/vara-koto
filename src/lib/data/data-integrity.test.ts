import { describe, it, expect } from 'vitest';
import locationsData from './locations.json';
import busesData from './buses.json';
import routesData from './routes.json';
import faresData from './fares.json';
import { LocationSchema } from '$lib/domain/location';
import { BusSchema } from '$lib/domain/bus';
import { BusRouteSchema } from '$lib/domain/route';
import { FareSegmentSchema } from '$lib/domain/fare';

describe('Transport Data Integrity Tests', () => {
	it('should validate all locations against LocationSchema', () => {
		expect(locationsData.length).toBeGreaterThan(0);
		for (const loc of locationsData) {
			const result = LocationSchema.safeParse(loc);
			if (!result.success) {
				console.error('Failed location validation:', loc, result.error);
			}
			expect(result.success).toBe(true);
		}
	});

	it('should have unique IDs and slugs for all locations', () => {
		const idSet = new Set<string>();
		const slugSet = new Set<string>();

		for (const loc of locationsData) {
			expect(idSet.has(loc.id)).toBe(false);
			expect(slugSet.has(loc.slug)).toBe(false);
			idSet.add(loc.id);
			slugSet.add(loc.slug);
		}
	});

	it('should validate all buses against BusSchema', () => {
		expect(busesData.length).toBeGreaterThan(0);
		for (const bus of busesData) {
			const result = BusSchema.safeParse(bus);
			if (!result.success) {
				console.error('Failed bus validation:', bus, result.error);
			}
			expect(result.success).toBe(true);
		}
	});

	it('should have unique IDs and slugs for all buses', () => {
		const idSet = new Set<string>();
		const slugSet = new Set<string>();

		for (const bus of busesData) {
			expect(idSet.has(bus.id)).toBe(false);
			expect(slugSet.has(bus.slug)).toBe(false);
			idSet.add(bus.id);
			slugSet.add(bus.slug);
		}
	});

	it('should validate all routes against BusRouteSchema', () => {
		expect(routesData.length).toBeGreaterThan(0);
		for (const route of routesData) {
			const result = BusRouteSchema.safeParse(route);
			if (!result.success) {
				console.error('Failed route validation:', route, result.error);
			}
			expect(result.success).toBe(true);
		}
	});

	it('should have valid relational references in all routes', () => {
		const busIds = new Set(busesData.map((b) => b.id));
		const locationIds = new Set(locationsData.map((l) => l.id));
		const routeIds = new Set<string>();

		for (const route of routesData) {
			expect(routeIds.has(route.id)).toBe(false);
			routeIds.add(route.id);

			expect(busIds.has(route.busId)).toBe(true);
			expect(locationIds.has(route.originId)).toBe(true);
			expect(locationIds.has(route.destinationId)).toBe(true);

			expect(route.stops.length).toBeGreaterThanOrEqual(2);
			expect(route.stops[0].locationId).toBe(route.originId);
			expect(route.stops[route.stops.length - 1].locationId).toBe(route.destinationId);

			for (let i = 0; i < route.stops.length; i++) {
				const stop = route.stops[i];
				expect(locationIds.has(stop.locationId)).toBe(true);
				expect(stop.order).toBe(i + 1);
			}
		}
	});

	it('should validate all fares against FareSegmentSchema and reference valid routes/stops', () => {
		const routeMap = new Map(routesData.map((r) => [r.id, r]));
		const locationIds = new Set(locationsData.map((l) => l.id));

		for (const fare of faresData) {
			const result = FareSegmentSchema.safeParse(fare);
			if (!result.success) {
				console.error('Failed fare validation:', fare, result.error);
			}
			expect(result.success).toBe(true);
			expect(fare.fareMin).toBeLessThanOrEqual(fare.fareMax);

			expect(routeMap.has(fare.routeId)).toBe(true);
			expect(locationIds.has(fare.fromLocationId)).toBe(true);
			expect(locationIds.has(fare.toLocationId)).toBe(true);

			const route = routeMap.get(fare.routeId)!;
			const routeStopIds = new Set(route.stops.map((s) => s.locationId));
			expect(routeStopIds.has(fare.fromLocationId)).toBe(true);
			expect(routeStopIds.has(fare.toLocationId)).toBe(true);
		}
	});
});
