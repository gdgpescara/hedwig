// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

// 1.1 Create a shared schema for your content (optional)
const personSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  company: z.string(),
  jobTitle: z.string(),
});

// 2. Define your collection(s)
const speakerCollection = defineCollection({
  type: "content",
  schema: personSchema,
});

const teamCollection = defineCollection({
  type: "content",
  schema: personSchema
    .merge(
      z.object({
        team: z.array(
          z.enum([
            "core",
            "communication",
            "gamification",
            "hospitality",
            "catering",
            "logistic",
          ]),
        ),
      }),
    )
    .omit({ description: true }),
});

const eventCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z.enum(["talk", "intermission"]),
    duration: z.array(z.number()), // in minutes
    language: z.string(),
    speakers: z.array(reference("speakers")),
    slides: z.array(
      z.object({
        url: z.string(),
        title: z.string(),
      }),
    ),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  speaker: speakerCollection,
  event: eventCollection,
  team: teamCollection,
};
