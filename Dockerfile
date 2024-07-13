# Используем стабильную версию Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости до копирования остальных файлов
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Очищаем кэш npm
RUN npm cache clean --force

# Собираем проект
RUN npm run build

# Запускаем проект
CMD ["npm", "run", "serve"]

# Открываем порт 5173
EXPOSE 5173
