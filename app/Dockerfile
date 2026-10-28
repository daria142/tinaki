FROM node:20-alpine AS b
WORKDIR /app
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=b /app/.next/standalone ./
COPY --from=b /app/.next/static ./.next/static
COPY --from=b /app/public ./public
ENV PORT=3000
EXPOSE 3000
CMD ["node","server.js"]
