export const speakersData = {
  "f-sciuti": {
    name: "Francesco Sciuti",
    imageUrl:
      "https://media.licdn.com/dms/image/C5603AQEdipsEgu67Aw/profile-displayphoto-shrink_800_800/0/1576755639170?e=2147483647&v=beta&t=_grhWifPhppnY7AutryxrOgLUMm4eIAfa_sPxni_OaU",
    work: "Devmy",
    jobTitle: "CEO",
    description: "CEO @Devmy, DevRel Expert @Codemotion, Google Developer Expert (GDE), Microsoft MVP, Google Certified Developer, LEGO Serious Play Facilitator, Projects Manager, Software Engineer, Speaker/Evangelist/Trainer, AWS UG Lead.",
    social: {
      instagram: "",
      facebook: "",
      linkedin: "https://it.linkedin.com/in/francescosciuti",
      twitter: "",
      sito: "https://www.francescosciuti.it/"
    }
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


export interface Speaker {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  work: string;
  jobTitle: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
    sito: string;
  }
}
