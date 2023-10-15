export const speakersData = {
  "f-sciuti": {
    name: "Francesco Sciuti",
    imageUrl:
      "https://media.licdn.com/dms/image/C5603AQEdipsEgu67Aw/profile-displayphoto-shrink_800_800/0/1576755639170?e=2147483647&v=beta&t=_grhWifPhppnY7AutryxrOgLUMm4eIAfa_sPxni_OaU",
    company: "Devmy",
    jobTitle: "CEO",
    description: "CEO @Devmy, DevRel Expert @Codemotion, Google Developer Expert (GDE), Microsoft MVP, Google Certified Developer, LEGO Serious Play Facilitator, Projects Manager, Software Engineer, Speaker/Evangelist/Trainer, AWS UG Lead.",
    bio: "",
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
  "g-galleno": {
    name: "Giovanna Reggina Galleno Malaga",
    imageUrl:
      "https://sessionize.com/image/c226-400o400o2-9Qrv5Z9ePxyKxEQKsQVK48.JPG",
    description: "",
    company: "",
    jobTitle: "Technical Project Manager & Soft Skills Specialist",
    bio: `Giovanna is a Technical Project Manager in BIP xTech. She worked in the European Google Developer Relations team as a Senior Program Manager where she fell in love with the tech world.
      Her background as a Soft Skills Specialist allowed her to build a sustainable career by creating and engaging in trustworthy relationships with internal and external stakeholders. In addition, in the last 4 years, she has been building her data and cloud skills.
      Giovanna is a highly motivated and results-oriented person. She is also a team player, a great communicator, and passionate about making a difference by matching technology & soft skills. 
      On the other hand, she is a community lover and always looks forward to collaborating to help others sharpen their skills.
      Fluent in: Italian, English, and Spanish.`,
    social: {
      instagram: "",
      facebook: "",
      linkedin: "https://www.linkedin.com/in/giovannagalleno/",
      twitter: "",
    }
  },
  "d-favaro": {
    name: "Daniele Favaro",
    imageUrl:
      "https://sessionize.com/image/fdad-400o400o2-BcdvQRoQMg4YWv2RQ6QXiC.jpg",
    description: "",
    company: "EasyPark Group",
    jobTitle: "Software Engineer",
    bio: `Based in Stockholm, Sweden, Daniele is working on the Android stack core solutions that millions of drivers use.
      He has been working with Android since Gingerbread and Eclipse IDE were a thing. 
      He is co-organizer of the GDG Android Stockholm and DevFest Stockholm. 
      In his spare time, he loves football and travelling.`,
    social: {
      instagram: "",
      facebook: "",
      linkedin: "https://www.linkedin.com/in/giovannagalleno/",
      twitter: "https://www.linkedin.com/in/danfav/",
    }
  },
  "m-ippolito": {
    name: "Marco Ippolito",
    imageUrl:
      "https://sessionize.com/image/a7c7-400o400o2-74uC92g6sNWezMZsFAMnj5.jpg",
    description: "",
    company: "Nearform",
    jobTitle: "Developer Experience Engineer",
    bio: `With years of experience in designing, developing and testing high scalability and distributed cloud applications, I'm committed to contributing to open source projects and helping the Node.js community grow. Currently serving as a maintainer of Node.js, Fastify and Mercurius and a member of the security work group.`,
    social: {
      instagram: "https://www.instagram.com/ultralightbeamr/",
      facebook: "https://twitter.com/satanacchio",
      linkedin: "https://www.linkedin.com/in/marcoippolito2021/",
      twitter: "https://twitter.com/satanacchio",
    }
  },
  "f-carusi": {
    name: "Fabio Carusi",
    imageUrl:
      "https://sessionize.com/image/6957-400o400o2-nqkvrZXmCdzrwFXfuyn1dv.jpg",
    description: "Aspirante Nerd, Data Engineer per lavoro, sviluppatore per passione, pigro per natura.",
    company: "Capgemini",
    jobTitle: "Data Engineer",
    bio: `Aspirante Nerd, Data Engineer per lavoro, sviluppatore per passione, pigro per natura.`,
    social: {
      instagram: "https://www.instagram.com/fabio_carusi/",
      facebook: "",
      linkedin: "https://www.linkedin.com/in/fabio-carusi-34812325/",
      twitter: "",
    }
  },
};

export type SpeakerId = keyof typeof speakersData;


export interface Speaker {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  company: string;
  jobTitle: string;
  bio: string,
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
    sito: string;
  }
}
