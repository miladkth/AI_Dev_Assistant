# 1. Använd en officiell Node-bild
FROM node:18

# 2. Skapa arbetskatalog
WORKDIR /app

# 3. Kopiera package*.json och installera beroenden
COPY package*.json ./
RUN npm install

# 4. Kopiera resten av backend-koden
COPY . .

# 5. Kompilera TypeScript till JavaScript
RUN npm run build  # Bygger TypeScript-koden till JavaScript (via tsc)

# 6. Exponera port
EXPOSE 3001

# 7. Starta backend med ts-node
CMD ["npx", "ts-node", "src/index.ts"]
