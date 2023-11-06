import {
  getCollection,
  getEntryBySlug,
  type CollectionEntry,
} from "astro:content";

export type TeamMember<T = {}> = {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  raw: string; // Markdown
  team: string[];
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    blog: string;
  };
  imageUrl: string;
} & T;

type TeamCollectionEntry = CollectionEntry<"team">;

async function createTeamMember(person: TeamCollectionEntry) {
  if (!person) {
    throw new Error("Team member not found");
  }

  const teamMember: TeamMember<{
    Bio: Awaited<ReturnType<typeof person.render>>;
  }> = {
    id: person?.slug.split("/")[1],
    name: person?.data.name,
    jobTitle: person?.data.jobTitle,
    team: person?.data.team,
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
    imageUrl:
      person?.data.imageUrl,
  };

  return teamMember;
}

export async function getTeamMemberById(id: string, lang: string = "en") {
  const teamMember = await getEntryBySlug("team", `${lang}/${id}`);

  if (!teamMember) {
    return null;
  }

  return await createTeamMember(teamMember);
}

export async function getTeam(lang: string = "en") {
  const team = await getCollection("team", (filter) =>
    filter.slug.startsWith(lang),
  );

  return Promise.all(
    team.map(async (teamMember) => createTeamMember(teamMember)),
  );
}
