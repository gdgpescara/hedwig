import { getCollection, getEntryBySlug } from "astro:content";

export type TeamMember<T = {}> = {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  Bio: string;
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
} & T;

async function createTeamMember(person: any) {
  if (!person) {
    throw new Error("Team member not found");
  }

  const teamMember: TeamMember<{
    Bio: Awaited<ReturnType<typeof person.render>>;
  }> = {
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

  return teamMember;
}

export async function getTeamMemberById(id: string) {
  const teamMember = await getEntryBySlug("team", id);
  return await createTeamMember(teamMember);
}

export async function getTeam() {
  const team = await getCollection("team");

  return Promise.all(
    team.map(async (teamMember) => createTeamMember(teamMember)),
  );
}
