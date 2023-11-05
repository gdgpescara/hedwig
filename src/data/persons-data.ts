import { getCollection, getEntryBySlug } from "astro:content";

export async function getSpeakerById(id: string) {
  const speaker = await getEntryBySlug("speakers", id);
  return await createPerson(speaker);
}

export async function getTeamMemberById(id: string) {
  const teamMember = await getEntryBySlug("team", id);
  return await createPerson(teamMember);
}

async function createPerson(person: any) {
  if (!person) {
    return null;
  }

  return {
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
  };
}


export type Speaker = Awaited<ReturnType<typeof getSpeakerById>>;
export type TeamMember = Awaited<ReturnType<typeof getTeamMemberById>>;

export async function getSpeakers() {
  const speakers = await getCollection("speakers");

  return Promise.all(
    speakers.map(
      async (speaker) => createPerson(speaker)
    )
  );
}

export async function getTeam() {
  const team = await getCollection("team");

  return Promise.all(
    team.map(
      async (teamMember) => createPerson(teamMember)
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
