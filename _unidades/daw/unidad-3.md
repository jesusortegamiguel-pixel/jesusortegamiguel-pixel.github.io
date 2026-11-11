---
layout: unidad
slug: unidad-3
title: Creación de imágenes
description: Crea tus propias imágenes personalizadas para su uso en Podman
asignatura: daw
orden: 3
---

# Unidad 3. {{page.title}}

## 1. Introducción

En esta unidad veremos cómo crear nuestras imágenes especificas para su uso en programas de contenerización como Podman. Para ello utilizaremos el ``Containerfile`` / ``Dockerfile`` dependiendo de si vamos a usar Podman o Docker, este archivo contiene las directrices necesarias para la creación de nuestra imagen.

## 2. Comandos del Containerfile

| Instrucción | Propósito | Ejemplo |
|:---|:---|:---|
| `FROM` | Seleccionar imagen base | `FROM ubuntu:24.04` |
| `RUN` | Ejecutar comandos durante la construcción | `RUN apt-get update` |
| `CMD` | Comando predeterminado al iniciar | `CMD ["bash"]` |
| `ENTRYPOINT` | Definir el ejecutable principal | `ENTRYPOINT ["python3"]` |
| `COPY` | Copiar archivos a la imagen | `COPY app /app` |
| `ADD` | Copiar archivos o extraer archivos comprimidos | `ADD app.tar.gz /app` |
| `WORKDIR` | Establecer el directorio de trabajo | `WORKDIR /app` |
| `ENV` | Definir variables de entorno | `ENV APP_ENV=prod` |
| `ARG` | Definir variables durante la construcción | `ARG VERSION=1.0` |
| `EXPOSE` | Documentar el puerto del contenedor | `EXPOSE 8080` |
| `USER` | Establecer el usuario de ejecución | `USER appuser` |
| `VOLUME` | Declarar una ubicación para datos persistentes | `VOLUME /data` |
| `LABEL` | Añadir metadatos a la imagen | `LABEL version="1.0"` |
| `SHELL` | Cambiar el intérprete de comandos predeterminado | `SHELL ["/bin/bash", "-c"]` |
| `STOPSIGNAL` | Configurar la señal de parada | `STOPSIGNAL SIGTERM` |
| `HEALTHCHECK` | Definir una comprobación del estado del contenedor | `HEALTHCHECK CMD curl -f http://localhost/` |
| `ONBUILD` | Instrucción que se ejecutará al construir imágenes derivadas | `ONBUILD COPY . /app` |

## 3. Creación de un Containerfile

Crear un ``Containerfile`` es tan sencillo como crear un archivo de texto con el nombre ``Containerfile`` o ``Dockerfile``. Ambos tipos de archivo utilizan la misma sintaxis y estructura.

En este ejemplo vamos a crear un servidor con Node. El archivo ``Containerfile`` y ``app.js`` son necesarios para el ejemplo y puedes encontrarlo en la sección de [descargas](#descargas-unidad), incluiremos ambos archivos en el mismo directorio y abriremos un terminal.


{% capture codigo %}
# Utilizamos una imagen ligera basada en Alpine Linux con Node instalado
FROM node:22-alpine

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos el programa al contenedor
# Esta línea copiará el archivo app.js al directorio de trabajo
COPY app.js .

# Documentamos el puerto de la aplicación
EXPOSE 3000

# Ejecutamos el programa
CMD ["node", "app.js"]
{% endcapture %}

{% include editor-fijo.html
   archivo="Containerfile"
   codigo=codigo
%}

### Creación de la imagen

Una vez tenemos ambos archivos listos es hora de crear la imagen, para ello usaremos el siguiente comando:

{% capture comando %}
podman build -t <nombre_imagen>:<tag> <directorio_containerfile>
{% endcapture %}

{% include terminal.html
   title="Crear una imagen, plantilla"
   code=comando
%}

{% capture comando %}
podman build -t servidor_node:0.0.1 .
{% endcapture %}

{% capture respuesta %}
STEP 1/5: FROM node:22-alpine
Resolved "node" as an alias (/usr/share/containers/registries.conf.d/000-shortnames.conf)
Trying to pull docker.io/library/node:22-alpine...
Getting image source signatures
Copying blob sha256:177fffbd7f516ce769745a38154a76ab1cc31d9f87f1c4ea5e448f6548fea4c4
Copying blob sha256:87aaee1f6667374a3b8e33a252954e01b1fac9749bb0c570022533b9120d13a1
Copying blob sha256:e868d1035e5072f0e369d44b840e8532b9500f7cc74aa8c908ccd2e1b9898eb3
Copying blob sha256:881fc932939efef04ca120ad44bbd2c0917851eb247aa4995428afb1e80ede17
Copying config sha256:8049382e2048cff27289992d304206b4208b5b4f5110a19a5dbe21c18a0b8603
Writing manifest to image destination
STEP 2/5: WORKDIR /app
--> 986b77e3ad94
STEP 3/5: COPY app.js .
--> 19f31cdb6d37
STEP 4/5: EXPOSE 3000
--> 9531d27ec40b
STEP 5/5: CMD ["node", "app.js"]
COMMIT servidor_node:0.0.1
--> e8bce1148904
Successfully tagged localhost/servidor_node:0.0.1
e8bce1148904d5b3458312014e6c47feae4e177db99bd07bd6549b130f69cce5
{% endcapture %}

{% include terminal.html
   title="Crear una imagen"
   code=comando
   output=respuesta
%}

Podemos ver en los logs de creación cómo se han ido ejecutando cada uno de los comandos que componen el `Containerfile`. Podemos verificar que contamos con la imagen listando las imágenes.

{% capture comando %}
podman image ls
{% endcapture %}

{% capture respuesta %}
REPOSITORY                TAG         IMAGE ID      CREATED             SIZE
localhost/servidor_node   0.0.1       e8bce1148904  About a minute ago  171 MB
{% endcapture %}

{% include terminal.html
   title="Confirmación de creación de imagen"
   code=comando
   output=respuesta
%}

### Instanciamos el contenedor

Como vimos en la unidad anterior, podemos crear una isntancia de una imagen con el comando `run`, en este ejercicio ademas utilizaremos el modo *detached* `-d`, esto permitirá que el terminal en el que ejecutamos la instrucción se desacople de la ejecución del contenedor y podamos seguir usándolo.

Como nuestra imagen expone el puerto 3000, vamos a crear una comunicación entre nuestra máquina y el contenedor. Para ello especificamos los puertos de la siguiente forma: `-p HOST_PORT:CONTAINER_PORT`. Usaremos en ambos el puerto 3000 para establecer una correlación directa pero podríamos utilizar cualquier puerto no reservado de nuestro ordenador.

Además hemos añadido un nombre de contenedor para evitar que nos genere uno aleatorio con `--name <nombre_contenedor>`.

{% capture comando %}
podman run -d --name servidor_node -p 3000:3000 localhost/servidor_node:0.0.1
{% endcapture %}

{% capture respuesta %}
95fa1cc072710de19497b984ab51012f09450fc4e5939934b8e54ab9f58788d3
{% endcapture %}

{% include terminal.html
   title="Creamos el contenedor"
   code=comando
   output=respuesta
%}

Si has seguido los pasos deberías poder acceder a [http://localhost:3000/](http://localhost:3000/) y se te redirigirá al servidor que acabamos de crear. El servidor funcionará hasta que sea detenido.