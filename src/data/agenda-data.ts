import type { AgendaEvent, AgendaEventType, EventSchedule } from "../types";
import { speakersData, type SpeakerId } from "./speakers-data";

export const events: AgendaEvent = {
  "7:00": [
    {
      day: 1,
      name: "Breakfast",
      type: "intermission",
      length: "30 min",
    },
  ],
  "8:30": [
    {
      day: 1,
      name: "The Future of Astro",
      type: "talk",
      length: "30 min",
      language: "English",
      speaker: {
        id: "f-sciuti",
      },
    },
    {
      day: 2,
      name: "Il viaggio di una commit",
      type: "talk",
      length: "45 min",
      language: "Italian",
      speaker: [
        { id: "a-forese" },
        { id: "m-dangelo" },
      ],
    },
    {
      day: 1,
      name: "The Future of React",
      type: "talk",
      length: "30 min",
      language: "English",
      speaker: {
        id: "g-palama",
      },
    },
  ],
  "9:00": [
    {
      day: 2,
      name: "The Future of Astro",
      length: "30 min",
      language: "English",
      speaker: {
        id: "f-biondi",
      },
      type: "talk",
    },
  ],
  "10:00": [
    {
      day: 1,
      name: "Breakfast",
      type: "intermission",
      length: "30 min",
    },
  ],
  "11:00": [
    {
      day: 1,
      name: "The wizardry of project management",
      length: "45 min",
      language: "English",
      speaker: {
        id: "g-galleno",
      },
      type: "talk",
    },
    {
      day: 1,
      name: "Jetpack Compose animations playground",
      length: "45 min",
      language: "English",
      speaker: {
        id: "d-favaro",
      },
      type: "talk",
    },
    {
      day: 2,
      name: "Come il Data Mesh rivoluzionerà le aziende",
      length: "45 min",
      language: "Italian",
      speaker: {
        id: "f-carusi",
      },
      type: "talk",
    },
    {
      day: 2,
      name: "Measuring the Cost of a GraphQL Query",
      length: "45 min",
      language: "English",
      speaker: {
        id: "m-ippolito",
      },
      type: "talk",
    },
  ],
};

export const filterEventsByDay = (events: AgendaEvent, day: number) => {
  const foundArray: [EventSchedule, AgendaEventType[]][] = [];

  for (const [key, value] of Object.entries(events)) {
    const schedule = key as EventSchedule;
    const foundEvents = value.filter((event) => {
      return event.day === day;
    });

    if (foundEvents.length > 0) {
      foundArray.push([schedule, foundEvents]);
    }
  }
  return foundArray;
};

export const filterEventsBySpeaker = (
  events: AgendaEvent,
  speakerId: SpeakerId,
  day?: number
) => {
  const foundArray: [EventSchedule, AgendaEventType[]][] = [];

  for (const [key, value] of Object.entries(events)) {
    const schedule = key as EventSchedule;

    const speakerTalks = value.filter((event) => {
      const dayMatches = !day || event.day === day;

      if (event.type === "talk") {
        if (Array.isArray(event.speaker)) {
          return event.speaker.some((speaker) => {
            return speaker.id === speakerId && dayMatches;
          });
        } else {
          return event.speaker.id === speakerId && dayMatches;
        }
      }

      return false;
    });

    if (speakerTalks.length > 0) {
      foundArray.push([schedule, speakerTalks]);
    }
  }
  return foundArray;
};
