import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		image: z.string().optional(),
		repoUrl: z.string().optional(),
		demoUrl: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const data = defineCollection({
    type: 'data',
    schema: z.object({
        items: z.array(
            z.object({
                name: z.string(),
                icon: z.string(),
                level: z.string().optional()
            })
        )
    })
});


export const collections = { blog, projects, data };
