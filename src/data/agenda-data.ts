import type { AgendaEvent } from "../types";
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
  return Object.entries(events).filter(([key, value]) => {
    return value.some((event) => event.day === day);
  });
};

export const filterEventsBySpeaker = (
  events: AgendaEvent,
  speakerId: SpeakerId
) => {
  return Object.entries(events).filter(([key, value]) => {
    return value.some((event) => {
      if (event.type === "talk") {
        return event.speaker.id === speakerId;
      }
    });
  });
};
