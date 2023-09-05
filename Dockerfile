# Usamos una imagen de Node.js
FROM node:20.04

# Establecer un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usa tu aplicación (cambia 3001 si tu app usa otro puerto)
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
