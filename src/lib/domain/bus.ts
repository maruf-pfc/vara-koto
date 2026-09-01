import { z } from 'zod';
import { SourceMetadataSchema } from './verification';

export const BusOperatorTypeSchema = z.enum([
	'regular',
	'seating_service',
	'ac',
	'semi_seating',
	'brtc'
]);
export type BusOperatorType = z.infer<typeof BusOperatorTypeSchema>;

export const BusSchema = z.object({
	id: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
	name: z.string().min(1),
	nameBn: z.string().min(1),
	aliases: z.array(z.string()).default([]),
	operatorType: BusOperatorTypeSchema.default('regular'),
	colorCode: z
		.string()
		.regex(/^#[0-9a-fA-F]{6}$/)
		.default('#047857'),
	serviceHours: z
		.object({
			start: z.string(),
			end: z.string()
		})
		.optional(),
	description: z.string().optional(),
	descriptionBn: z.string().optional(),
	source: SourceMetadataSchema
});
export type Bus = z.infer<typeof BusSchema>;
