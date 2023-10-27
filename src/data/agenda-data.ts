import type { AgendaEvent, AgendaEventType, EventSchedule } from "../types";
import { speakersData, type SpeakerId } from "./speakers-data";

export const events: AgendaEvent = {
  "8:00": [
    {
      day: 1,
      name: "Check-in and breakfast",
      type: "intermission",
      length: "120 min",
    },
  ],
  "09:45": [
    {
      day: 2,
      name: "Day 2 Opening by GDG Pescara",
      type: "intermission",
      length: "15 min",
    },
  ],
  "10:00": [
    {
      day: 1,
      name: "Opening by GDG Pescara",
      type: "intermission",
      length: "15 min",
    },
    {
      day: 2,
      name: "To be defined",
      type: "talk",
      tags: ["TBD"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "tbd",
      },
      room: "Room 9-11",
      abstract: "To be defined"
    },
    {
      day: 2,
      name: "JavaScript: No ti stai sbagliando, non è un linguaggio single thread!",
      type: "talk",
      tags: ["TDB"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: {
        id: "f-sciuti",
      },
      abstract: "Troppo spesso ci si riferisce a JavaScript come ad un linguaggio single thread e questo, altrettanto spesso, non è chiaro quanto sia ormai un retaggio del passato! Da fin troppo tempo ormai sono presenti nel linguaggio (e negli environments) tante caratteristiche che consentono di lavorare multi thread, finalmente alleggerendo (e non di poco) il tanto affaticato main thread. Dai Workers agli Atomics, da alcuni piccoli tricks sino agli SharedArrayBuffers, ci tufferemo in un viaggio che porta JavaScript ad un nuovo livello, così da dire alla prossima occasione: No ti stai sbagliando, JavaScript non è un linguaggio single thread!"
    },
    {
      day: 2,
      name: "La magia di Erlang può far bene  al tuo stipendio",
      type: "talk",
      tags: ["Languages"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "g-santomaggio",
      },
      abstract: "Gli sviluppatori Erlang sono tra i più pagati sul mercato.\nWhatsapp e molti altri grandi sistemi usano Erlang/Elixir come linguaggio di backend.\n\nIn questo talk cerchiamo di capire perché questo linguaggio è cosi potente e perché conoscerlo ti può far bene anche se usi altri linguaggi.\nSopratutto potrebbe far bene alla tua RAL:)!\nfonte ( https://survey.stackoverflow.co/2023/#work-salary )"
    },
    {
      day: 2,
      name: "The wizardry of project management",
      type: "talk",
      tags: ["Inspirational", "Soft skill"],
      length: "50 min",
      language: "English",
      room: "Room 10-12",
      speaker: {
        id: "g-gallenomalaga",
      },
      abstract: "It would be great to have a bunch of spells ready to be used to overcome any issue, delay, or conflict during the lifecycle of a project! Do you agree? Unfortunately, those spells are not available yet, but I will show you how to use your magic powder (soft skills) to manage one of the most important resources in a project, to successfully deliver a project on time, within budget, and to the required quality...that important resource is your stakeholders. ATTENTION: This session is not only for project managers. If you have a position that demands leadership or if you want to become a project manager, you can't miss this session!"
    },
    {
      day: 2,
      name: "Python beginner's workshop",
      type: "talk",
      tags: ["Workshop"],
      length: "180 min",
      language: "Italian",
      room: "Room 3 INFO",
      speaker: [
        {
          id: "l-divita",
        },
        {
          id: "j-salviati",
        },
        {
          id: "m-mazzocchetti",
        },
        {
          id: "p-melchiorre",
        }
      ],
      abstract: "Registrazioni tramite il form https://docs.google.com/forms/d/e/1FAIpQLSeCKzlR-lFlpDDcEhuFAzxSteAVWCQdCy_CzW91i27JfBaz8A/viewform"
    }
  ],
  "10:15": [
    {
      day: 1,
      name: "True Wizards: The Story of John Von Neumann and Alan Turing",
      type: "talk",
      tags: ["Keynote"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "e-dusi",
      },
      room: "Room 13, Room 14",
      abstract: "We will delve into the fascinating history of two of the most important figures in the development of modern magic. We will explore the lives and work of John Von Neumann and Alan Turing, and examine how their pioneering contributions helped shape the field of magical theory. From Von Neumann’s groundbreaking work on the architecture of the modern wand, to Turing’s foundational work in the areas of cryptomancy and arithmancy, this talk will provide a comprehensive overview of the early days of magic, and the visionary thinkers who helped bring it to life. Whether you’re a Pure-blood or a Muggle-born, this talk is sure to leave you with a deeper appreciation for the groundbreaking work of these two remarkable wizards."
    }
  ],
  "10:50": [
    {
      day: 2,
      name: "From Smart Home to Smart Cats: extending my home automation to my pets",
      type: "talk",
      tags: ["Smart Home"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "p-insogna",
      },
      room: "Room 9-11",
      abstract: "When going online and searching for new gadgets for our home, we often find Alexa, HomeKit or Google Assistant compatibility badges. Are these compatibility layers hard to code? What if I want to code mine? The truth is that every gadget that is connected to the internet is probably speaking to an HTTP or MQTT API. And this means you know how to use it. In this talk, I will show you how I easily made my cat’s life way technological."
    },
    {
      day: 2,
      name: "Testing Web3 applications",
      type: "talk",
      tags: ["Web", "Web3"],
      length: "50 min",
      language: "English",
      room: "Room 13",
      speaker: {
        id: "s-erradi",
      },
      abstract: "Let's dive into every developer's worst nightmare: end-to-end (e2e) testing. While in Web2 we got used to testing to ensure that the entire application, from the user interface to the backend systems, functions correctly and seamlessly. Web3 has a different setup and testing applications requires an understanding of blockchain technology, smart contracts and how to deal with Web3 tools. In this talk we will explore everything you need to know with a hands-on demonstration that showcases how to test your own Web3 applications effectively."
    },
    {
      day: 2,
      name: "Jetpack Compose animations playground",
      type: "talk",
      tags: ["Android"],
      length: "50 min",
      language: "English",
      room: "Room 14",
      speaker: {
        id: "d-favaro",
      },
      abstract: "Animations make our apps nicer! Let's see how easy it is to use them. In this talk, you will have an overview of how to orchestrate multiple animation states, different ways of triggering them, and measure your app performance."
    },
    {
      day: 2,
      name: "Tutto quello che devi sapere prima di creare contenuti audio e video",
      type: "talk",
      tags: ["Inspirational", "Podcast"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "a-mazzu",
      },
      abstract: "Tutti oggi producono contenuti audio (podcast) e video (su YouTube). Come mai alcuni hanno visualizzazioni e successo e altri no? Scopriamolo insieme!"
    },
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
      type: "talk",
      tags: ["Workshop", "Home Assistant"],
      length: "120 min",
      language: "Italian",
      room: "Room 3 INFO",
      speaker: {
        id: "a-morresi",
      },
      abstract: "Home Assistant is a powerful tool that can make your home smarter, but it can also be a lot of fun. In this session, we will give an overview of Home Assistant, including its features, benefits, and installation process. We will also cover some of the most popular integrations available, such as IoT devices, smart speakers, etc. Finally, we will show you how to create your own automations, so that you can control your smart home devices however you want."
    }
  ],
  "11:40": [
    {
      day: 2,
      name: "Coffee break",
      length: "20 min",
      type: "intermission",
    },
  ],
  "12:00": [
    {
      day: 2,
      name: "TDD la formula magica che ti mancava",
      type: "talk",
      tags: ["TDD", "Methodologies"],
      length: "50 min",
      language: "Italian",
      speaker: {
        id: "c-desanctis",
      },
      room: "Room 9-11",
      abstract: "Bello sentirsi dei maghi del software quando \"hello world\" è stampato a video; un po' meno quando la nostra code base è diventata così grande da riempire il calderone del laboratorio di pozioni e modificando una funzione banale ci accorgiamo che i nargilli hanno spaccato tutt'altra feature sviluppata 3 mesi fa e che fino a 5 minuti prima funzionava. \"Ma come è possibile?! Meglio non toccarla quella classe... questo codice non l'ho mai visto meglio evitare modifiche.\" Il Test Driven Development può essere la formula magica che stiamo cercando per smettere di avere paura di tu-sai-chi, essere più confidenti e scrivere del codice migliore. Cerchiamo di capire come e perchè."
    },
    {
      day: 2,
      name: "Exploring the Enigmatic: Navigating JavaScript's Uncharted Realms",
      type: "talk",
      tags: ["Languages"],
      length: "50 min",
      language: "English",
      room: "Room 13",
      speaker: {
        id: "l-delpuppo",
      },
      abstract: "Delve into the depths of advanced JavaScript features that often remain shrouded in mystery. Join us as we unravel the complexities of Symbols, WeakMap, WeakSet, and the art of Metaprogramming. In this session, we'll demystify Symbols, showcasing how they transcend traditional properties, enabling the creation of private and immutable members. WeakMap and WeakSet will take the stage, offering insights into memory management. Metaprogramming, the crown jewel of this journey, will empower you to transcend ordinary coding. Witness how code can be generated, modified, and customized programmatically, opening doors to efficient, dynamic, and elegant solutions. We aim to equip you with the knowledge to effectively wield these features, elevating your JavaScript prowess. Whether you're an aspiring developer or an experienced coder, join us in unravelling JavaScript's enigmatic potential."
    },
    {
      day: 2,
      name: "Dart FFI: A Beginner's Guide to High-Performance Integration",
      type: "talk",
      tags: ["Flutter"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "m-terzuolo",
      },
      abstract: "Dart is a versatile language that can be used to build a wide range of applications. However, sometimes you need the performance of another language, such as C or Rust, for certain tasks. That's where Dart FFI comes in. Dart FFI allows you to call functions written in other languages directly from your Dart code. This can be a great way to boost the performance of your Dart application for specific tasks, such as image processing, numerical computing, or machine learning. With that said, it's important to ask yourself: Is FFI always the best way to boost performance? In this talk, we will discuss the benefits and challenges of using Dart FFI. We will also explore some alternative ways to improve the performance of your Dart application."
    },
    {
      day: 2,
      name: "Dalla scintilla iniziale (un'idea!) agli accordi tra i Founder: cosa devi assolutamente conoscere per non fare la figura del Babbano",
      type: "talk",
      tags: ["Inspirational", "Startup", "Soft skill"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "s-dalessandro",
      },
      abstract: "Una delle principali cause di fallimento delle startup riguarda i problemi tra i co-founder che, se non affrontati preventivamente e tempestivamente, possono portare alla divisione del team e a far chiudere i battenti prima del dovuto nonostante la bontà dell'idea imprenditoriale. In questo talk condividerò con te alcune preziose strategie utili a prevenire l'emergere di problemi tra co-founder, evitando così di fare la fine dei Babbani 😁 che, notoriamente, ignorano l'esistenza del magico mondo degli accordi tra i soci."
    },
  ],
  "12:10": [
    {
      day: 1,
      name: "Slivering Lists",
      type: "talk",
      tags: ["Flutter"],
      length: "50 min",
      language: "Italian",
      speaker: {
        id: "c-lucera",
      },
      room: "Room 9-11",
      abstract: "Flutter permette di gestire la UI quasi come per Magia! perché non approfittarne per alzare il livello e gestire situazioni molto complesse in modo veramente semplice? Una delle domande più frequenti è quella di come gestire più liste di diverso tipo nello stesso Scrollable, ad esempio potremmo trovarci a dover gestire una prima parte della lista con delle card, per poi passare ad una griglia o a degli elementi a pagina intera, ogni sessione con le sua peculiare logica di scroll e magari con un Header separato! Come possiamo gestire tutto questo senza dover necessariamente ricorrere alla magia oscura (e senza \"AVADARE\" qualche collega?) semplice! non Cruciatevi oltre! abbiamo le Slivers che ci aiuteranno a risolvere anche gli scroll più complessi, e non servirà nemmeno la bacchetta!"
    },
    {
      day: 1,
      name: "Il viaggio di una commit",
      type: "talk",
      tags: ["Cloud"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: [
        { id: "a-forese" }, 
        { id:"m-dangelo" }
      ],
      abstract: "Analizzeremo insieme il viaggio che una commit effettua per arrivare ad essere pubblicata in produzione. La scrittura del codice, in realtà, è solo l'inizio!"
    },
    {
      day: 1,
      name: "Venice is a Triwizard Maze! Various Uses of Ant Colony Optimization.",
      type: "talk",
      tags: ["Machine Learning"],
      length: "50 min",
      language: "English",
      room: "Room 14",
      speaker: {
        id: "f-trevisan",
      },
      abstract: "There's an ant colony in your kitchen, and you might have not noticed that. [shocked reaction] In this session, we will explore the power of Ant Colony Optimization (ACO) in solving mazes. We'll delve deep into the fascinating world of Nature-Inspired Computing by applying the popular metaheuristic algorithm that mimics the foraging behavior of ants, to labyrinths all around the world. Topics included: Nature-Inspired Computing / Evolutionary Algorithms / Ant Colony Optimization / Mazes / Ants 🐜"
    },
    {
      day: 1,
      name: "QuestDb and the timeseries of secrets",
      type: "talk",
      tags: ["Databases", "Cloud"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "r-solazzi",
      },
      abstract: "Nel magico mondo delle timeseries esistono strumenti degni di essere paragonati al mantello dell'invisibilità di Harry Potter, strumenti come QuestDB! Questa presentazione vi condurrà attraverso la camera dei segreti di QuestDB, permettendovi di esplorare la sua natura orientata alle colonne, proprio come si impara a incanalare correttamente la propria magia. Scopriremo quanto sia importante questa magica arte nella gestione dei dati in serie temporali, proprio come la perfezione nell'incantesimo è essenziale per un mago. E infine, vedremo come le estensioni SQL di QuestDB consentano agli utenti di sfruttare appieno il potenziale dei dati, proprio come un mago sfrutta al massimo le sue abilità magiche!"
    },
  ],
  "12:50": [
    {
      day: 2,
      name: "Closing by GDG Pescara",
      type: "intermission",
      length: "30 min",
    },
  ],
  "13:00": [
    {
      day: 1,
      name: "Lunch",
      type: "intermission",
      length: "60 min",
    },
  ],
  "13:20": [
    {
      day: 2,
      name: "Lunch and afterparty",
      type: "intermission",
      length: "90 min",
    },
  ],
  "14:00": [
    {
      day: 1,
      name: "Make the world your canvas with augmented reality",
      type: "talk",
      tags: ["Mobile", "AR/VR/XR"],
      length: "50 min",
      language: "Italian",
      speaker: {
        id: "m-trizio",
      },
      room: "Room 9-11",
      abstract: "In this talk we will explore how mobile developers can use augmented reality technologies for smartphones and tablets to turn the world into an infinite canvas for expressing their creativity. We'll show how to use libraries like Google's ARCore to create amazing immersive and interactive experiences. Did you get excited seeing the Gorillaz augmented reality concert in Time square? We will discover how to create similar experiences, using the Geospatial API, the latest feature added to the Google framework for positioning virtual elements in outdoor real spaces. We will see into the code needed to develop applications using ARCore and show real use cases to illustrate how augmented reality is already changing the way we interact with the world and how it can be used to improve people's lives."
    },
    {
      day: 1,
      name: "Platform Engineering: L'Arte di Creare Ecosistemi Digitali",
      type: "talk",
      tags: ["DX", "DevOps"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: { 
        id: "m-murabito" 
      },
      abstract: "L'evoluzione continua nel settore dello sviluppo software ha portato a nuove pratiche e strumenti. Esploreremo il Platform Engineering e gli Internal Developer Portal, integranti nell'ecosistema moderno per potenziare la Developer Experience. Definiremo i concetti chiave e vedremo come questi approcci possano notevolmente migliorare la qualità e l'efficienza dello sviluppo software. Il nostro obiettivo è tracciare una panoramica su questi temi, dissipando dubbi sul loro ruolo in DevOps e sulla positiva trasformazione dell'esperienza degli sviluppatori."
    },
    {
      day: 1,
      name: "La Nimbus per la logistica intelligente",
      type: "talk",
      tags: ["Alghoritms"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "c-martini",
      },
      abstract: "Esiste una bacchetta magica per risolvere problemi di gestione complessi come la logistica? Esiste una Nimbus per spostarci rapidamente, di cui possiamo magari scoprire il segreto e usarlo per movimentare ad esempio Containers, in modo più efficiente e sostenibile? Di certo sappiamo che esistono algoritmi, alberi decisionali, machine learning, intelligenza artificiale e altri strumenti interessanti che possiamo utilizzare e che fanno la differenza per noi e per la trasformazione digitale del mondo in cui viviamo. In questo intervento parleremo di un sistema software di “Supporto alla decisione”, basato su Algoritmi, Alberi decisionali ed Intelligenza Artificiale (AI), in grado di suggerire decisioni per la movimentazione dei containers su complesse rotte europee denominate “corridoi intermodali logistici”, al fine di ridurre costi ed emissioni CO2, tempi, rischi ed utilizzo di risorse. Parleremo anche di come il mercato del software si stia aprendo sempre di più a tali tecnologie, e di come sempre più sviluppatori trovino opportunità in quest’area per la loro carriera. Vi aspetto!"
    },
    {
      day: 1,
      name: "Site Reliability Engineering out of the box natively on the Google Cloud Platform.",
      type: "talk",
      tags: ["Cloud", "DevOps"],
      length: "50 min",
      language: "English",
      room: "Room 10-12",
      speaker: {
        id: "j-campbell",
      },
      abstract: "Quick intro about SRE and reasons why to implement SRE best practices when developing and engineering on GCP. Overview of native API's and services that are available on GCP that enable SRE natively on the platform. A demo application running in GCP with said services including explanations, cost effectiveness (Cloud FinOps), monitoring, logging and DevOps etc. Ending with questions."
    },
  ],
  "14:30": [
    {
      day: 1,
      name: "Your First Node.js Contribution",
      type: "talk",
      tags: ["Workshop", "Open source"],
      length: "180 min",
      language: "Italian",
      room: "Room 3 INFO",
      speaker: [
        {
          id: "m-ippolito",
        },
        {
          id: "p-insogna",
        }
      ],
      abstract: "Have you ever wanted to contribute to a foundational open source project like Node.js? Maybe you don’t know where to start. Maybe you always assumed that was work reserved for “someone else.” Join experienced contributors who will guide you through your first (or second or third or fourth) commit to the Node.js core. They will be available to help troubleshoot any development environment issues and also to provide guided tours through specific areas of the Node.js core source code. Contributors of all skill levels and experiences are welcome (not every contribution has to be a code change). Come and make your first Node.js core contribution!"
    }
  ],
  "14:50": [
    {
      day: 1,
      name: "Improving Firebase Backend for Flutter App through Cloud Functions",
      type: "talk",
      tags: ["Mobile", "Web"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "s-denisov",
      },
      room: "Room 9-11",
      abstract: "This talk explores practical methods for improving serverless backends for Flutter apps using Firebase Cloud Functions. Attendees will gain insights into the benefits of serverless architecture and its seamless integration with Flutter. Discover how Firebase Cloud Functions empowers developers to efficiently handle your Firebase backend tasks such as data validation, notifications, and authentication and even build REST APIs. Moreover, the potential of leveraging AI assistance in cloud function development will be showcased, particularly for those who are unfamiliar with JavaScript or TypeScript."
    },
    {
      day: 1,
      name: "Unveiling the Technological Odyssey: A Journey through Cycles of Dreamers and Makers",
      type: "talk",
      tags: ["Inspirational"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: { 
        id: "n-guglielmi" 
      },
      abstract: "Embark on a captivating journey through the technological evolution, where the creative synergy between dreamers and makers has paved the way for innovation across generations. We'll explore into the dynamic interplay between those who envision the impossible and those who transform dreams into reality. The intricate dance between visionaries and engineers has driven the advancement of technology for centuries, in turns. Ones that inspire the seconds to build new technolgies and the seconds that inspire the following generation of dreamers in an endless loop. From the pioneers who invented the telegraph to today's architects of artificial intelligence, the torch of progress has been passed from the dreamers who ignite the spark of imagination to the makers who forge the tools of realization."
    },
    {
      day: 1,
      name: "Non essere obiettivo, sii innovativo",
      type: "talk",
      tags: ["Machine Learning"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "l-divita",
      },
      abstract: "In un mondo sempre più competitivo abbiamo smesso di \"agire\" in favore del \"fare\" - L'uomo nell'età della tecnica, U.G. . Educazione, professionalità, ecc... ci costringono all'obiettivo ed al raggiungimento di esso, facendo sì che ci si scordi perchè abbiamo intrapreso una determinata strada, e sopratutto facendo sì che ci scordassimo perchè è bello percorrerla. La vera creatività non è nel perseguire gli obiettivi ma nell'innovare, nel fare qualcosa che non si è mai fatto perchè quello potrebbe essere lo \"stepping stone\" per qualcosa di più grande. Il Novelty Search è un processo evolutivo libero, \"senza obiettivi da raggiungere ma che alla fine li raggiunge\". Collocandosi tra filosofia e pragmatismo algoritmico, ci insegna come avere la volontà di innovarsi senza perseguire obiettivi, ci porta alla via della grandezza. Greatness Cannot Be Planned - K.O.S ."
    },
    {
      day: 1,
      name: "Speed Up Microservice Setup with Composable Approach",
      type: "talk",
      tags: ["Cloud", "Microservices"],
      length: "50 min",
      language: "English",
      room: "Room 10-12",
      speaker: {
        id: "k-hrytsaienko",
      },
      abstract: "Imagine how good it would be to have a magic button to set up and integrate a brand-new microservice in your ecosystem in XX minutes. Infrastructure, CI/CD, and basic code snippets all in one. This talk aimed to familiarize you with the composable approach -- closest to the \"magic button\" as possible. In this session, we'll walk you through how Terraform conjures infrastructure like magic, shared workflows streamline processes, and Maven archetypes simplify code generation. As the cherry on top -- live demo of the accelerator approach with Google cloud platfrom."
    },
  ],
  "15:40": [
    {
      day: 1,
      name: "Yolo e Flutter: costruiamo un rilevatore di magia",
      type: "talk",
      tags: ["Flutter", "Machine Learning"],
      length: "50 min",
      language: "Italian",
      speaker: {
        id: "s-bonfrate",
      },
      room: "Room 9-11",
      abstract: "In questo talk vedremo insieme come costruire un rilevatore di magia. Verrà introdotta la Computer vision e il suo ciclo di sviluppo partendo dalla scelta del dataset fino al realizzazione dell'app finale in Flutter."
    },
    {
      day: 1,
      name: "Develop a Second Brain",
      type: "talk",
      tags: ["Soft Skill"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: { 
        id: "m-bertaina" 
      },
      abstract: "Do you need to enhance productivity? create flows? Increase your ability to capture, remember and benefit from the unprecedented amount of information all around you? For the first time in history, we have instantaneous access to the world’s knowledge. There has never been a better time to learn, to contribute, and to improve ourselves. Yet, rather than feeling empowered, we are often left feeling overwhelmed by this constant influx of information. The very knowledge that was supposed to set us free has instead led to the paralyzing stress of believing we’ll never know or remember enough. Let's understand together how you can easily develop your own personal system for knowledge management, otherwise known as a Second Brain. As a trusted and organized digital repository of your most valued ideas, notes, and creative work synced across all your devices and platforms, a Second Brain gives you the confidence to tackle your most important projects and ambitious goals. Discover the full potential of your ideas and translate what you know into more powerful, more meaningful improvements in your work and life by developing a Second Brain."
    },
    {
      day: 1,
      name: "Come il Data Mesh rivoluzionerà le aziende",
      type: "talk",
      tags: ["Cloud", "Data science"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "f-carusi",
      },
      abstract: "La sessione sarà composta da tre macro argomenti:\n- una panoramica su sul Data Mesh, sui princìpi fondamentali e sulla loro applicazione;\n- gli utilizzi di questa nuova architettura nel mondo dati;\n- il Data Mesh come sfida \"sociotecnica\" e culturale a livello aziendale. \n\nIn particolare, questo ultimo punto sarà il centro della sessione e seguirà questi tre punti: \n- perché l'adozione di un'architettura dati necessità di un radicale cambio nell'organizzazione e nel mindset aziendale; \n- le best practice per guidare il change management; \n- le persone come fulcro del cambiamento."
    },
    {
      day: 1,
      name: "Untold CQRS",
      type: "talk",
      tags: ["Cloud", "Web"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "e-giacomazzi",
      },
      abstract: "Tutti siamo abituati a produrre o consumare API RESTful, attraverso metodi CRUD, ma siamo sicuri che sia sempre il modo migliore per far interagire il client con il server? In questo talk analizzeremo i vantaggi dell'approccio CQRS (e del pattern da cui deriva, CQS) evidenziando le differenze rispetto al classico paradigma CRUD."
    },
  ],
  "16:30": [
    {
      day: 1,
      name: "Coffee break",
      length: "20 min",
      type: "intermission",
    },
  ],
  "16:50": [
    {
      day: 1,
      name: "Firebase Extensions: Unleashing the Magic in Your Web Development Spells",
      type: "talk",
      tags: ["Cloud", "Web"],
      length: "50 min",
      language: "English",
      speaker: {
        id: "l-morinigo",
      },
      room: "Room 9-11",
      abstract: "It's time to add a dash of magic to your web development cauldron! In this enchanting session, we'll dive into Firebase Extensions – the spellbook that transforms your mundane web development tasks into bewitching feats of automation. Picture it: as you sip your morning coffee, Firebase Extensions silently conjure features, handle tasks, and streamline workflows, leaving you with more time to practice your wand-waving skills (or enjoy that second cup of coffee)."
    },
    {
      day: 1,
      name: "La rivoluzione dei framework front-end \"fullstack\": sessione interattiva",
      type: "talk",
      tags: ["Web"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: { 
        id: "f-biondi" 
      },
      abstract: "Stiamo assistendo ad una rivoluzione del mondo front-end e moltissimi nuovi framework (full-stack) stanno nascendo o si stanno evolvendo: Next e i React Server Component, Astro, Qwik, SvelteKit, SolidJS, solo per citarne alcuni. L'ottimizzazione per i motori di ricerca e l'incremento le prestazioni sono i principali motivi che stanno spingendo il mondo JavaScript ad abbandonare il Client Side Rendering (utilizzato principalmente nelle SPA) e tornare al Server Side Rendering (SSR), alla Static Generation (SSG) e ad adottare molteplici nuove strategie per migliorare il processo di Hydration, al fine di aumentare i punteggi dei Core Web Vitals e la velocità di rendering. SEO, User Experience , incremento delle conversioni e minor impatto ambientale sono le motivazioni principali che spingono i vari team ad andare in questa direzione. Cosa dobbiamo aspettarci per il prossimo futuro? E come è possibile raggiungere certi obiettivi e aggirare dei limiti che finora non permettevano di raggiungere certi risultati? In questa sessione interattiva, Fabio farà una panoramica sull'argomento e farà partecipare attivamente il pubblico con domande e quiz: i più preparati sul tema avranno la possibilità di vincere gadget, libri e licenze software : )"
    },
    {
      day: 1,
      name: "Red Team Demystified",
      type: "talk",
      tags: ["Security"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "s-chiccarelli",
      },
      abstract: "L’intervento offre una dettagliata panoramica delle attività offensive e di Red Teaming, esplorando le sfaccettature organizzative, tecniche e operative di questo approccio. Questo intervento si propone di chiarire i metodi e le strategie utilizzate dai Red Teams per simulare attacchi realistici contro le organizzazioni, al fine di valutare e migliorare le loro misure di sicurezza. Questo tipo di servizi richiedono uno sforzo di comprensione dal punto di vista organizzativo, si esamineranno quindi le strutture e i processi che guidano queste operazioni. Infine, dal punto di vista operativo, si discuterà di come le attività vengono effettivamente condotte sul campo, offrendo una visione completa di cosa significhi realmente essere parte di un Red Team e di come essi contribuiscano a rafforzare la sicurezza delle organizzazioni."
    },
    {
      day: 1,
      name: "Come sei progetta un videogioco: dall’idea allo sviluppo",
      type: "talk",
      tags: ["Game Design"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "p-lacitignola",
      },
      abstract: "Le fasi e il flusso di lavoro necessari allo sviluppo di un prodotto videoludico, dall'ideazione del progetto alla realizzazione del prodotto per il mercato"
    },
  ],
  "17:40": [
    {
      day: 1,
      name: "È possibile gestire form complessi in Flutter evitando un crollo nervoso?",
      type: "talk",
      tags: ["Flutter"],
      length: "50 min",
      language: "Italian",
      speaker: {
        id: "c-bucciarelli",
      },
      room: "Room 9-11",
      abstract: "La risposta è SI. Reactive Forms è un package che ti permette di costruire form complessi con comportamenti e regole di validazione complesse attraverso un interfaccia semplice."
    },
    {
      day: 1,
      name: "New Jobs horror stories from developers and recruiters",
      type: "talk",
      tags: ["Panel", "Inspirational"],
      length: "50 min",
      language: "Italian",
      room: "Room 13",
      speaker: [
        { 
          id: "m-marzocchi" 
        },
        { 
          id: "l-fregoso" 
        }
      ],
      abstract: "Nel processo di hiring, developer e recruiter meritano di vivere un'esperienza appagante basata sulla trasparenza, velocità e rispetto reciproco…spesso però accade l’esatto contrario. In questo panel analizzeremo delle testimonianze particolarmente spaventose da entrambe le parti, per fare un passo avanti a beneficio di tutti."
    },
    {
      day: 1,
      name: "To be defined",
      type: "talk",
      tags: ["TDB"],
      length: "50 min",
      language: "Italian",
      room: "Room 14",
      speaker: {
        id: "tbd",
      },
      abstract: "To be defined"
    },
    {
      day: 1,
      name: "Come usare le VM Spot/Preemptible per risparmiare nella Google Cloud Platform (GCP)",
      type: "talk",
      tags: ["Cloud"],
      length: "50 min",
      language: "Italian",
      room: "Room 10-12",
      speaker: {
        id: "s-caruso",
      },
      abstract: "Scopriremo come utilizzare le VM Spot/Preemptible per risparmiare sui costi della Google Cloud Platform (GCP). Mostreremo un esempio pratico di come questa tecnologia può essere utilizzata per ridurre i costi di esecuzione dei tuoi carichi di lavoro, verrà mostrato quali sono i possibili limiti di utilizzo delle VM Spot/Preemptible e come mitigare i rischi associati ad un loro utilizzo."
    },
  ],
  "20:30": [
    {
      day: 1,
      name: "Community Dinner",
      length: "210 min",
      type: "intermission",
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
