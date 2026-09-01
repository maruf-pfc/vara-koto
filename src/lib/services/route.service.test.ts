import { describe, it, expect } from 'vitest';
import { routeService } from './route.service';

describe('RouteService Unit Tests', () => {
	it('should search locations by English name and prefix', () => {
		const results = routeService.searchLocations('mirpur');
		expect(results.length).toBeGreaterThan(0);
		expect(results.some((l) => l.slug === 'mirpur-10')).toBe(true);
	});

	it('should search locations by Bengali name', () => {
		const results = routeService.searchLocations('ফার্মগেট');
		expect(results.length).toBeGreaterThan(0);
		expect(results[0].slug).toBe('farmgate');
	});

	it('should search locations by aliases and slang', () => {
		const results = routeService.searchLocations('golchokkor');
		expect(results.length).toBeGreaterThan(0);
		expect(results[0].slug).toBe('mirpur-10');
	});

	it('should find direct forward bus journeys between Mirpur 10 and Farmgate', () => {
		const result = routeService.findJourneys('mirpur-10', 'farmgate');
		expect(result).not.toBeNull();
		expect(result?.hasDirectRoutes).toBe(true);
		expect(result?.directOptions.length).toBeGreaterThan(0);

		const busIds = result!.directOptions.map((o) => o.bus.id);
		expect(busIds).toContain('bikalpa-auto');
		expect(busIds).toContain('shikhor');

		const bikalpaOption = result!.directOptions.find((o) => o.bus.id === 'bikalpa-auto')!;
		expect(bikalpaOption.direction).toBe('forward');
		expect(bikalpaOption.stopsOnSegment[0].location.id).toBe('mirpur-10');
		expect(bikalpaOption.stopsOnSegment[bikalpaOption.stopsOnSegment.length - 1].location.id).toBe(
			'farmgate'
		);
		expect(bikalpaOption.fare.fareMin).toBe(15);
		expect(bikalpaOption.fare.fareMax).toBe(20);
	});

	it('should find direct reverse bus journeys on bidirectional routes (Farmgate to Mirpur 10)', () => {
		const result = routeService.findJourneys('farmgate', 'mirpur-10');
		expect(result).not.toBeNull();
		expect(result?.hasDirectRoutes).toBe(true);

		const bikalpaOption = result!.directOptions.find((o) => o.bus.id === 'bikalpa-auto');
		expect(bikalpaOption).toBeDefined();
		expect(bikalpaOption!.direction).toBe('reverse');
		expect(bikalpaOption!.stopsOnSegment[0].location.id).toBe('farmgate');
		expect(
			bikalpaOption!.stopsOnSegment[bikalpaOption!.stopsOnSegment.length - 1].location.id
		).toBe('mirpur-10');
	});

	it('should find direct bus options between Rampura and Gulistan (Victor Classic, Akash, Victor Paribahan, Supravat, Green Dhaka)', () => {
		const result = routeService.findJourneys('rampura', 'gulistan');
		expect(result).not.toBeNull();
		expect(result?.hasDirectRoutes).toBe(true);

		const busIds = result!.directOptions.map((o) => o.bus.id);
		expect(busIds).toContain('victor-classic');
		expect(busIds).toContain('akash');
		expect(busIds).toContain('victor-paribahan');
		expect(busIds).toContain('supravat');
		expect(busIds).toContain('green-dhaka');
	});

	it('should find direct bus options between Savar and Gulistan (Savar Paribahan, Welcome, Thikana)', () => {
		const result = routeService.findJourneys('savar', 'gulistan');
		expect(result).not.toBeNull();
		expect(result?.hasDirectRoutes).toBe(true);
		expect(result!.directOptions.some((o) => o.bus.id === 'savar-paribahan')).toBe(true);
	});

	it('should return null if origin and destination are the same', () => {
		const result = routeService.findJourneys('mirpur-10', 'mirpur-10');
		expect(result).toBeNull();
	});

	it('should return null for invalid location slugs', () => {
		const result = routeService.findJourneys('invalid-stop-1', 'invalid-stop-2');
		expect(result).toBeNull();
	});

	it('should calculate estimated travel time with sensible min/max ranges', () => {
		const estimate = routeService.estimateTravelTime(5);
		expect(estimate.minMinutes).toBeGreaterThanOrEqual(10);
		expect(estimate.maxMinutes).toBeGreaterThan(estimate.minMinutes);
	});
});
