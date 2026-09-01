import { z } from 'zod';

export const FareBasisSchema = z.enum(['brta_rate', 'operator_fixed', 'community_reported']);
export type FareBasis = z.infer<typeof FareBasisSchema>;

export const FareSegmentSchema = z.object({
	routeId: z.string().min(1),
	fromLocationId: z.string().min(1),
	toLocationId: z.string().min(1),
	fareMin: z.number().nonnegative(),
	fareMax: z.number().nonnegative(),
	currency: z.literal('BDT').default('BDT'),
	basis: FareBasisSchema.default('brta_rate'),
	isExact: z.boolean().default(false),
	verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
export type FareSegment = z.infer<typeof FareSegmentSchema>;

export interface CalculatedFare {
	fareMin: number;
	fareMax: number;
	currency: 'BDT';
	isExact: boolean;
	basis: FareBasis;
	isEstimated: boolean;
	note?: string;
	noteBn?: string;
	verifiedAt: string;
}
