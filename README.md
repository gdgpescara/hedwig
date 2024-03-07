# Hedwig 🦉

## ⚡️ Quick Start

Clone the repo and install dependencies with [pnpm](https://pnpm.js.org/):

```bash
pnpm install
```

Create a `.env` file in the root folder.
Create a new Firebase project. [Get the Firebase's configuration object](https://support.google.com/firebase/answer/7015592) and use it to set the `FIREBASE_CONFIG` variable in the `.env` file:

```bash
FIREBASE_CONFIG=THE_CONFIGURATION_OBJECT
```

Be careful to put the whole object in a single row, eliminating every new line character.

[Create a private key for the Firebase's service account](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments) and use it to set the `FIREBASE_SERVICE_ACCOUNT` variable in the `.env` file:

```bash
FIREBASE_SERVICE_ACCOUNT=THE_SERVICE_ACCOUNT_PRIVATE_KEY
```

Again, be careful to put the whole object in a single row, eliminating every new line character.

Start the local development server:

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:4321) in your browser to see the site!

That's it! You're ready to start contributing to the project! 🥳

[⚡ Live demo](https://hedwig-demo-app.web.app/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── feature-x/
│   │   └── ComponentName.astro
│   │   └── AnotherComponentName.astro 
│   ├── shared/
│   │   └── Card.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/feature-x/`, (replace "x" with any component name that you want)  but that's where we like to put any Astro/React/Vue/Svelte/Preact components or something related to the feature.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:3000`      |
| `pnpm build`        | Build your production site to `./dist/`          |
| `pnpm preview`      | Preview your build locally, before deploying     |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help` | Get help using the Astro CLI                     |

## Tools used

- [Tailwind CSS (Utility-First CSS Framework)](https://tailwindcss.com/)
- [DaisyUI (Tailwind CSS Components)](https://daisyui.com/)
- [astro-i18n](https://github.com/yassinedoghri/astro-i18next) - TBD

## User Personas

You can find the User Personas in the [Wiki page](https://github.com/gdgpescara/hedwig/wiki/User-Personas) and on [Figma](https://www.figma.com/file/8TIY8v09HJbxblDy2ZZfiL/GDG-Pescara---User-Personas---User-Journery?type=design&node-id=8%3A7&mode=design&t=t5UFCQfpvqX27Jno-1)

## Mockup

TBD

## Contributing

**New contributors welcome!** Check out our [Contributors Guide](CONTRIBUTING.md) for help getting started.

Join us on [Telegram](https://gdgpescara.page.link/telegram) to meet other maintainers. We'll help you get your first contribution in no time!

## Code of Conduct
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

## License

The project is published under the [MIT license](/LICENSE.md).
Feel free to clone and modify repo as you want, but don't forget to add a reference to authors :)
