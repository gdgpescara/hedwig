// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";
// 2. Define your collection(s)
const speakerCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    company: z.string(),
    jobTitle: z.string(),
  }),
});

const eventCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z.enum(["talk", "intermission"]),
    duration: z.array(z.number()), // in minutes
    language: z.string(),
    speakers: z.array(reference("speakers")),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  speaker: speakerCollection,
  event: eventCollection,
};
