# ── Build Stage ───────────────────────────
FROM node:22-alpine AS builder

# ── Set Working Directory ─────────────────
WORKDIR /app

# ── Copy Package Files ────────────────────
COPY package*.json .

# ── Install Dependencies ──────────────────
RUN npm install

# ── Copy App Code ─────────────────────────
COPY . .

# ── Build App ─────────────────────────────
RUN npm run build

# ── Production Stage ──────────────────────
FROM nginx:alpine

# ── Copy Build to Nginx ───────────────────
COPY --from=builder /app/dist /usr/share/nginx/html

# ── Copy Nginx Config ─────────────────────
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ── Expose Port ───────────────────────────
EXPOSE 80

# ── Run Nginx ─────────────────────────────
CMD ["nginx", "-g", "daemon off;"]