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
      name: "The Future of Astro (day 2)",
      type: "talk",
      length: "30 min",
      language: "English",
      speaker: {
        id: "f-sciuti",
      },
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
        return event.speaker.id === speakerId && dayMatches;
      }

      return false;
    });

    if (speakerTalks.length > 0) {
      foundArray.push([schedule, speakerTalks]);
    }
  }
  return foundArray;
};
