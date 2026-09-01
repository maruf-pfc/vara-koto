import { z } from 'zod';
import { SourceMetadataSchema } from './verification';

export const RouteStopSchema = z.object({
	locationId: z.string().min(1),
	order: z.number().int().nonnegative(),
	isRequestStop: z.boolean().default(false)
});
export type RouteStop = z.infer<typeof RouteStopSchema>;

export const BusRouteSchema = z.object({
	id: z.string().min(1),
	busId: z.string().min(1),
	name: z.string().min(1),
	nameBn: z.string().min(1),
	originId: z.string().min(1),
	destinationId: z.string().min(1),
	stops: z.array(RouteStopSchema).min(2),
	bidirectional: z.boolean().default(true),
	approximateDistanceKm: z.number().positive().optional(),
	notes: z.string().optional(),
	notesBn: z.string().optional(),
	source: SourceMetadataSchema
});
export type BusRoute = z.infer<typeof BusRouteSchema>;
