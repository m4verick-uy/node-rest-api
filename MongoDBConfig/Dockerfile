# Archivo dedicado a configurar el dockerfile

FROM mongo:latest

#Variables de entorno para configurar el usuario y la contraseña 

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=1234

# Copia un script de inicialiación a la carpeta /docker-entrypoint-initdb..d/
# Este script se ejecutará cuando se inicie el contenedor y creará un usuario y contraseña

