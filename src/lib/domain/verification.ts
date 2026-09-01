import { z } from 'zod';

export const ConfidenceLevelSchema = z.enum(['verified', 'community-reported', 'unverified']);
export type ConfidenceLevel = z.infer<typeof ConfidenceLevelSchema>;

export const SourceMetadataSchema = z.object({
	name: z.string().min(1),
	url: z.string().url().optional(),
	verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
	confidence: ConfidenceLevelSchema,
	notes: z.string().optional()
});
export type SourceMetadata = z.infer<typeof SourceMetadataSchema>;
