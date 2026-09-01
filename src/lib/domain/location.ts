import { z } from 'zod';

export const LocationCoordinatesSchema = z.object({
	latitude: z.number(),
	longitude: z.number()
});
export type LocationCoordinates = z.infer<typeof LocationCoordinatesSchema>;

export const LocationSchema = z.object({
	id: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
	name: z.string().min(1),
	nameBn: z.string().min(1),
	aliases: z.array(z.string()).default([]),
	area: z.string().min(1),
	areaBn: z.string().min(1),
	isMajorHub: z.boolean().default(false),
	coordinates: LocationCoordinatesSchema.optional(),
	description: z.string().optional(),
	descriptionBn: z.string().optional()
});
export type Location = z.infer<typeof LocationSchema>;
