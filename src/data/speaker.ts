import {
  getCollection,
  getEntryBySlug,
  type CollectionEntry,
} from "astro:content";

type Speaker<T = {}> = {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  company: string;
  raw: string;
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    blog: string;
  };
  imageUrl: string;
  slides: {
    title: string;
    url: string;
  }[];
} & T;

type SpeakerCollectionEntry = CollectionEntry<"speakers">;

async function createSpeaker(person: SpeakerCollectionEntry) {
  if (!person) {
    throw new Error("Speaker not found");
  }

  const speaker: Speaker<{ Bio: Awaited<ReturnType<typeof person.render>> }> = {
    id: person?.slug,
    name: person?.data.name,
    jobTitle: person?.data.jobTitle,
    description: person?.data.description,
    Bio: await person.render(),
    company: person?.data.company,
    raw: person.body,
    social: {
      linkedin: person?.data["social.linkedin"],
      twitter: person?.data["social.twitter"],
      facebook: person?.data["social.facebook"],
      instagram: person?.data["social.instagram"],
      blog: person?.data["social.blog"],
    },
    imageUrl: person?.data.imageUrl,
    slides: person.data.slides,
  };

  return speaker;
}

export async function getSpeakerById(id: string) {
  const speaker = await getEntryBySlug("speakers", id);

  if (!speaker) {
    return null;
  }

  return createSpeaker(speaker);
}

export async function getSpeakers() {
  const speakers = await getCollection("speakers");

  return Promise.all(speakers.map(async (speaker) => createSpeaker(speaker)));
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
          slides: speaker?.data.slides,
        }) satisfies Omit<Speaker, "Bio">,
    ),
  );
}
