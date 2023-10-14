export const speakersData = {
  "f-sciuti": {
    name: "Francesco Sciuti",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1410277875389127680/6X1X1J9U_400x400.jpg",
    description: "Francesco is a software engineer at Pika.",
  },
  "f-biondi": {
    name: "Fabio Biondi",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1410277875389127680/6X1X1J9U_400x400.jpg",
    description: "Fabio is a software engineer at Pika.",
  },
  "g-palama": {
    name: "Gregorio Palamà",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1410277875389127680/6X1X1J9U_400x400.jpg",
    description: "Gregorio is a software engineer at Pika.",
  },
};

export type SpeakerId = keyof typeof speakersData;
