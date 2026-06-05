import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			featured: z.boolean().default(false),
		}),
});

const services = defineCollection({
	loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			image: z.optional(image()),
			duration: z.string(),
			description: z.string(),
			highlights: z.array(z.string()),
			price: z.string(),
			bookingLink: z.string(),
			featured: z.boolean().default(false),
		}),
});

const retreats = defineCollection({
	loader: glob({ base: './src/content/retreats', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string().optional(),
			image: z.optional(image()),
			description: z.string(),
			details: z
				.object({
					where: z.string().optional(),
					when: z.string().optional(),
					groupSize: z.string().optional(),
					including: z.string().optional(),
				})
				.optional(),
			price: z.string(),
			bookingLink: z.string(),
			featured: z.boolean().default(false),
		}),
});

const testimonials = defineCollection({
	loader: glob({ base: './src/content/testimonials', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			rating: z.number().min(1).max(5),
			description: z.string(),
			authorName: z.string(),
			authorDescription: z.string().optional(),
			authorImage: z.optional(image()),
			featured: z.boolean().default(false),
		}),
});

export const collections = { blog, services, retreats, testimonials };
