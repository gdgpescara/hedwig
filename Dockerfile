FROM node:20-slim
COPY ./dist /app
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
ARG FIREBASE_CONFIG_ARG
ARG FIREBASE_SERVICE_ACCOUNT_ARG
ENV FIREBASE_CONFIG=$FIREBASE_CONFIG_ARG
ENV FIREBASE_SERVICE_ACCOUNT=$FIREBASE_SERVICE_ACCOUNT_ARG
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app /app
ARG FIREBASE_CONFIG_ARG
ARG FIREBASE_SERVICE_ACCOUNT_ARG
ENV FIREBASE_CONFIG=$FIREBASE_CONFIG_ARG
ENV FIREBASE_SERVICE_ACCOUNT=$FIREBASE_SERVICE_ACCOUNT_ARG
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node /app/server/entry.mjs