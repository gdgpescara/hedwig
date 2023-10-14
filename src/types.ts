import type { SpeakerId } from "./data/speakers-data";

interface Speaker {
  id: SpeakerId;
}

interface AgendaElement {
  time: string;
  events: Event[];
}

type AgendaEventSpeakerType = {
  type: "talk";
  language: string;
  speaker: Speaker;
};

type AgendaEventIntermissionType = {
  type: "intermission";
};

export type AgendaEventType = {
  name: string;
  length: string;
  day: 1 | 2;
} & (AgendaEventSpeakerType | AgendaEventIntermissionType);

export type EventSchedule = `${string}:${string}`;

export type AgendaEvent = {
  [key: EventSchedule]: AgendaEventType[];
};
