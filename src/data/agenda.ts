import { getCollection } from "astro:content";
import type { AgendaEvent, AgendaEventType, EventSchedule } from "../types";

export async function getEvents(args: {
  filters?: Partial<{ tag: string; day: number; speaker: string }>;
}) {
  const events = await getCollection("events", (filter) => {
    let condition = true;

    if (args.filters?.speaker) {
      condition = filter.data.speakers?.includes(args.filters.speaker);
    }

    if (args.filters?.tag) {
      condition = filter.data.tags?.includes(args.filters.tag);
    }
    if (args.filters?.day) {
      condition = condition && filter.data.day === args.filters.day;
    }
    return condition;
  });

  const eventObject: AgendaEvent = {};

  for (const event of events) {
    if (!eventObject[event.data.time]) {
      eventObject[event.data.time] = [];
    }

    eventObject[event.data.time].push({
      day: 1,
      name: event.data.name,
      type: event.data.type,
      length: `${event.data.duration}`,
      // type Talk
      tags: event.data.tags,
      language: event.data.language,
      speaker: event.data?.speakers?.map((id: string) => ({
        id,
      })),
      room: event.data.room,
      Abstract: await event.render(),
    });
  }

  // order by key (time)
  const eventsByTime = Object.keys(eventObject).sort((a, b) => {
    const [aHour, aMinute] = a.split(":").map((n) => parseInt(n));
    const [bHour, bMinute] = b.split(":").map((n) => parseInt(n));
    const aTime = new Date(0);
    aTime.setHours(aHour);
    aTime.setMinutes(aMinute);

    const bTime = new Date(0);
    bTime.setHours(bHour);
    bTime.setMinutes(bMinute);

    return aTime.getTime() - bTime.getTime();
  });

  const orderedEvents: AgendaEvent = {};
  eventsByTime.forEach((key) => {
    const castedKey = key as keyof AgendaEvent;
    orderedEvents[castedKey] = eventObject[castedKey];
  });

  return Object.entries(orderedEvents) as [EventSchedule, AgendaEventType[]][];
}
