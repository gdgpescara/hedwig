import { getCollection, getEntryBySlug } from "astro:content";

export async function getSpeakerById(id: string) {
  const speaker = await getEntryBySlug("speakers", id);

  if (!speaker) {
    return null;
  }

  return {
    id: speaker?.slug,
    name: speaker?.data.name,
    jobTitle: speaker?.data.jobTitle,
    description: speaker?.data.description,
    Bio: await speaker.render(),
    company: speaker?.data.company,
    raw: speaker.body,
    social: {
      linkedin: speaker?.data["social.linkedin"],
      twitter: speaker?.data["social.twitter"],
      facebook: speaker?.data["social.facebook"],
      instagram: speaker?.data["social.instagram"],
      blog: speaker?.data["social.blog"],
    },
    imageUrl: speaker?.data.imageUrl,
  };
}

export type Speaker = Awaited<ReturnType<typeof getSpeakerById>>;

export async function getSpeakers() {
  const speakers = await getCollection("speakers");

  return Promise.all(
    speakers.map(
      async (speaker) =>
        ({
          id: speaker.slug,
          raw: speaker.body,
          name: speaker.data.name,
          jobTitle: speaker.data.jobTitle,
          description: speaker.data.description,
          company: speaker.data.company,
          social: {
            linkedin: speaker.data["social.linkedin"],
            twitter: speaker.data["social.twitter"],
            facebook: speaker.data["social.facebook"],
            instagram: speaker.data["social.instagram"],
            blog: speaker.data["social.blog"],
          },
          imageUrl: speaker.data.imageUrl,
          Bio: await speaker.render(),
        } satisfies Speaker)
    )
  );
}

export async function getSpeakersWithoutBody() {
  const speakers = await getCollection("speakers");

  return Promise.all(
    speakers.map(
      async (speaker) =>
        ({
          id: speaker.slug,
          raw: speaker.body,
          name: speaker.data.name,
          jobTitle: speaker.data.jobTitle,
          description: speaker.data.description,
          company: speaker.data.company,
          social: {
            linkedin: speaker.data["social.linkedin"],
            twitter: speaker.data["social.twitter"],
            facebook: speaker.data["social.facebook"],
            instagram: speaker.data["social.instagram"],
            blog: speaker.data["social.blog"],
          },
          imageUrl: speaker.data.imageUrl,
        } satisfies Omit<Speaker, "Bio">)
    )
  );
}
