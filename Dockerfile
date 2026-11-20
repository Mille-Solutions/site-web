# Image du site Mille Solutions : pages statiques + /api/contact/ (envoi du formulaire par SMTP).
# Construction : docker build -t millesolutions-site .
# Lancement    : docker run -d -p 4321:4321 --env-file .env --restart unless-stopped millesolutions-site
# Variables : voir .env.example (identifiants SMTP fournis au lancement, jamais dans l'image).

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Adresse publique du site (balises canoniques, plan du site). À adapter si besoin.
ARG SITE_URL=https://millesolutions.mc
ARG SITE_BASE=/
RUN SITE_URL=$SITE_URL SITE_BASE=$SITE_BASE npm run build && npm prune --omit=dev

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:4321/ >/dev/null || exit 1
CMD ["node", "./dist/server/entry.mjs"]
