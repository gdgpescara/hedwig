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
  "10:00": [
    {
      day: 1,
      name: "True Wizards: The Story of John Von Neumann and Alan Turing",
      type: "talk",
      tags: ["Keynote"],
      length: "65 min",
      language: "English",
      speaker: {
        id: "e-dusi",
      },
      room: "Room 13, Room 14",
      abstract: "We will delve into the fascinating history of two of the most important figures in the development of modern magic. We will explore the lives and work of John Von Neumann and Alan Turing, and examine how their pioneering contributions helped shape the field of magical theory. From Von Neumann’s groundbreaking work on the architecture of the modern wand, to Turing’s foundational work in the areas of cryptomancy and arithmancy, this talk will provide a comprehensive overview of the early days of magic, and the visionary thinkers who helped bring it to life. Whether you’re a Pure-blood or a Muggle-born, this talk is sure to leave you with a deeper appreciation for the groundbreaking work of these two remarkable wizards."
    }
  ],
  "11:05": [
    {
      day: 1,
      name: "Coffee break",
      length: "15 min",
      type: "intermission",
    },
  ],
  "11:20": [
    {
      day: 1,
      name: "Flutter and shaders: oh my",
      type: "talk",
      tags: ["Flutter"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "r-araujo",
      },
      room: "Room 9-11",
      abstract: "The full support of Fragment shaders on Flutter UIs means such a revolution in UI design and development that not many people have realized yet. Let's discover what Fragment shaders can do for everyday flutter development and how they can be combined with all we know and love about Flutter, by using creative examples."
    },
    {
      day: 1,
      name: "To be defined",
      type: "talk",
      tags: ["TDB"],
      length: "50 min",
      language: "English",
      room: "Room 13",
      speaker: {
        id: "tbd",
      },
      abstract: "To be defined"
    },
    {
      day: 1,
      name: "MLOps for GenAI: A practical walkthrough",
      type: "talk",
      tags: ["Machine Learning"],
      length: "50 min",
      language: "English",
      room: "Room 14",
      speaker: {
        id: "i-nardini",
      },
      abstract: "LLMs and GenAI are new and rapidly developing areas of AI. And MLOps is the key to deploying GenAI applications to production. In this session, we will walk through a practical example of how to implement MLOps for GenAI on Vertex AI. We will cover everything from data preparation to model tuning, reinforcement learning with human feedback and deployment. By the end of this session, you will have the skills and knowledge you need to implement MLOps for your own GenAI applications on Vertex AI."
    },
    {
      day: 1,
      name: "Measuring the Cost of a GraphQL Query",
      type: "talk",
      tags: ["Web"],
      length: "50 min",
      language: "English",
      room: "Room 10-12",
      speaker: {
        id: "m-ippolito",
      },
      abstract: "Developers often make the mistake of centralizing fragment definitions and using them in every query, even when only a subset of attributes is needed. It's important for GraphQL clients to be mindful of query optimization because the server has to process the client's query and generate a customized response. If the client's query isn't optimized, it can force the server to process unnecessary data, resulting in slower response times. Unfortunately, identifying performance bottlenecks and slow queries, especially in an Apollo Federation architecture, can be quite challenging. In this session, we'll dive into the reasons why measuring the \"cost\" of a GraphQL query is not a simple task. We'll explore how the unique design of GraphQL affects the speed at which it executes a query. You'll understand why it's essential for you, as a client, to prioritize query optimization in order to achieve faster and more efficient performance."
    },
    {
      day: 1,
      name: "Home Assistant: The Open Source Home Automation Platform",
      type: "workshop",
      tags: ["Workshop", "Home Assistant"],
      length: "120 min",
      language: "English",
      room: "Room 3 INFO",
      speaker: {
        id: "a-morresi",
      },
      abstract: "Home Assistant is a powerful tool that can make your home smarter, but it can also be a lot of fun. In this session, we will give an overview of Home Assistant, including its features, benefits, and installation process. We will also cover some of the most popular integrations available, such as IoT devices, smart speakers, etc. Finally, we will show you how to create your own automations, so that you can control your smart home devices however you want."
    }
  ],
  "13:00": [
    {
      day: 1,
      name: "The wizardry of project management",
      length: "45 min",
      language: "English",
      abstract: "",
      tags: ["keynote"],
      room: "",
      speaker: {
        id: "g-gallenomalaga",
      },
      type: "talk",
    },
    {
      day: 1,
      name: "Jetpack Compose animations playground",
      length: "45 min",
      language: "English",
      tags: ["keynote"],
      room: "",
      abstract: "",
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
      abstract: "",
      tags: ["keynote"],
      room: "",
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
      room: "",
      abstract: "",
      tags: ["keynote"],
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
