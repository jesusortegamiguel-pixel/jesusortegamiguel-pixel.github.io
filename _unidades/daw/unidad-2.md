---
layout: unidad
slug: unidad-2
title: Comandos básicos de Podman
description: Comandos más comunes y usados para la configuración y gestión de contenedores en Podman
asignatura: daw
orden: 2
---

# Unidad 2. {{page.title}}

## 1. Introducción
En este tema daremos una vuelta por los comandos básicos de obtención de imágenes desde el repositorio oficial de Docker. Así mismo aprenderemos a gestionar estas imágenes y crear contenedores con ellas.

## 2. Comandos para imagenes

Una imagen es una plantilla estática, inmutable y de solo lectura que contiene todo lo necesario para ejecutar una aplicación: el código fuente, el entorno de ejecución, las bibliotecas, las variables de entorno y los archivos de configuración.

### Obtención de una imagen

{% capture comando %}
podman pull <imagen>:<etiqueta>
{% endcapture %}

{% include terminal.html
   title="Obtener una imagen"
   code=comando
%}

Vamos a descargar la imagen Alpine, esta imagen contiene una versión minimalista de Alpine Linux.


{% capture comando %}
podman pull docker.io/library/alpine:latest
{% endcapture %}

{% capture respuesta %}
Trying to pull docker.io/library/alpine:latest...
Getting image source signatures
Copying blob sha256:881fc932939efef04ca120ad44bbd2c0917851eb247aa4995428afb1e80ede17
Copying config sha256:3ea06e4cb95e726ea6c6cc4377570ac4c4050d78710004cbd631ca809daf7e8e
Writing manifest to image destination
3ea06e4cb95e726ea6c6cc4377570ac4c4050d78710004cbd631ca809daf7e8e
{% endcapture %}

{% include terminal.html
   title="Obteniendo Alpine"
   code=comando
   output=respuesta
%}

### Lista de imágenes locales

Para ver las imágenes que hemos descargado ejecutaremos:

{% capture comando %}
podman image ls
{% endcapture %}

{% capture respuesta %}
REPOSITORY                TAG         IMAGE ID      CREATED     SIZE
docker.io/library/alpine  latest      3ea06e4cb95e  5 days ago  8.73 MB
{% endcapture %}

{% include terminal.html
   title="Listado de imágenes"
   code=comando
   output=respuesta
%}

En el listado se muestras los siguientes datos informativos:

- **REPOSITORY**: Dirección de obtención de la imagen.

- **TAG**: Versión de etiquetado de la imagen, *latest* indica que se está usando la última versión disponible.

- **IMAGE ID**: Hash identificador de la imagen.

- **CREATED**: Fecha de construcción de la imagen.

- **SIZE**: Tamaño de la imagen (como podemos ver es un tamaño ínfimo).

### Borrar imagen
{% capture comando %}
podman image rm <image_id>
{% endcapture %}

{% include terminal.html
   title="Borrado de imágenes"
   code=comando
%}

## 3. Comandos para contenedores

Un contenedor es  es una instancia ejecutable y aislada de una imagen de Docker que empaqueta una aplicación junto con su código, librerías, dependencias y archivos de configuración necesarios para funcionar.

Para crear la instancia de una imagen debemos especificar qué proceso queremos que el contenedor esté ejecutando. Usaremos "shell" para este ejemplo. Como "shell" no es un proceso que vaya a perdurar ya que al recibir un EOF el proceso finaliza. Para ello mantendremos la consola en marcha mediante el parámetro ``-it`` de forma que nos permita **interactuar** con el contenedor.

`-i`: mantiene abierta la entrada estándar (stdin).

`-t`: asigna una terminal virtual (TTY).

{% capture comando %}
podman run <imagen> <proceso>
{% endcapture %}

{% include terminal.html
   title="Instanciación de un contenedor"
   code=comando
%}

{% capture comando %}
podman run -it docker.io/library/alpine sh
{% endcapture %}

{% capture respuesta %}
 / #
{% endcapture %}

{% include terminal.html
   title="Instanciación de un contenedor"
   code=comando
   output=respuesta
%}

Cuando veamos la almohadilla **#** querrá decir que estamos dentro del contenedor e interactuando con el *shell* de la instancia.

Podemos comprobar que estamos dentro de la máquina Linux comprobando su versión de kernel:


{% capture comando %}
uname -a
{% endcapture %}

{% capture respuesta %}
Linux b6dc3b3b1d76 6.18.58.1-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Tue Oct 27 00:24:11 UTC 2026 x86_64 Linux
{% endcapture %}

{% include terminal.html
   title="Comprobar versión del kernel"
   code=comando
   output=respuesta
%}

### Listado de contenedores activos

Como tenemos el terminal ocupado con la ejecución del *shell* del contenedor, vamos a **abrir un nuevo terminal**.

En el nuevo terminal vamos a comprobar que nuestro contenedor está siendo ejecutado, para ello obtendremos la lista de contenedores en ejecución.

{% capture comando %}
podman ps
{% endcapture %}

{% capture respuesta %}
CONTAINER ID  IMAGE                            COMMAND     CREATED        STATUS        PORTS       NAMES
8c499cc92452  docker.io/library/alpine:latest  sh          4 seconds ago  Up 5 seconds              heuristic_bardeen
{% endcapture %}

{% include terminal.html
   title="Lista de contenedores en ejecución"
   code=comando
   output=respuesta
%}

También podemos usar el comando

{% capture comando %}
podman container ls
{% endcapture %}

{% capture respuesta %}
CONTAINER ID  IMAGE                            COMMAND     CREATED        STATUS        PORTS       NAMES
8c499cc92452  docker.io/library/alpine:latest  sh          4 seconds ago  Up 5 seconds              heuristic_bardeen
{% endcapture %}

{% include terminal.html
   title="Lista de contenedores en ejecución"
   code=comando
   output=respuesta
%}

La respuesta del comando nos dará la información del contenedor:

- **CONTAINER ID**: Hash identificador del contenedor.

- **IMAGE**: Imagen de la que se está ejecutando esta instancia.

- **COMMAND**: Comando que se está ejecutando.

- **CREATED**: Momento de creación del contenedor.

- **STATUS**: Estado actual del contenedor (En este caso indica que está en marcha).

- **PORTS**: Puertos que se están mapeando, veremos esto con más detalle cuando creemos una instancia de una imagen Nginx.

- **NAMES**: Nombre de la imagen, como no hemos definido ninguno Podman ha generado uno aleatorio.

### Detener un contenedor

Detener el contenedor implica poner fin a la ejecución del programa de la instancia. Esto no eliminará el contenedor, simplemente finalizará el proceso activo. Para ello podemos utilizar tanto el ``CONTAINER_ID`` **8c499cc92452** como el ``NAME`` **heuristic_bardeen**

{% capture comando %}
podman container stop <container_id | name>
{% endcapture %}

{% include terminal.html
   title="Detención de un contenedor"
   code=comando
%}

{% capture comando %}
podman container stop 8c499cc92452
{% endcapture %}

{% capture respuesta %}
8c499cc92452
{% endcapture %}

{% include terminal.html
   title="Detención de un contenedor"
   code=comando
   output=respuesta
%}

Al detener el contenedor Podman responderá con el ``CONTAINER_ID`` del contenedor detenido. Si volvemos a mostrar la lista de contenedores en marcha, deberíamos ver una lista vacía.

{% capture comando %}
podman ps
{% endcapture %}

{% capture respuesta %}
CONTAINER ID  IMAGE  COMMAND     CREATED        STATUS        PORTS       NAMES

{% endcapture %}

{% include terminal.html
   title="Lista de contenedores en ejecución"
   code=comando
   output=respuesta
%}

Sin embargo antes hemos mencionado que la instancia no desaparecía, únicamente se finalizaba su ejecución. El contenedor detenido mantiene su estado tras la detención conservando los cambio realizados es él para su siguiente ejecución.

Si queremos ver la lista de contenedores incluyendo los deberemos especificar que se muestre la lista completa de contenedores mediante el parámetro `-a`.

{% capture comando %}
podman container ls -a
{% endcapture %}

{% capture respuesta %}
CONTAINER ID  IMAGE                            COMMAND     CREATED         STATUS                      PORTS       NAMES
8c499cc92452  docker.io/library/alpine:latest  sh          12 minutes ago  Exited (137) 6 minutes ago              heuristic_bardeen
{% endcapture %}

{% include terminal.html
   title="Lista completa de contenedores"
   code=comando
   output=respuesta
%}

En esta lista observamos que el `STATUS` del contenedor es `Exited (137) 6 minutes ago` indicando que el contenedor ha sido detenido.

### Eliminar un contenedor

Si queremos deshacernos por completo del contenedor ejecutaremos

{% capture comando %}
podman container <container_id | name>
{% endcapture %}

{% include terminal.html
   title="Lista completa de contenedores"
   code=comando
%}

{% capture comando %}
podman container rm 8c499cc92452
{% endcapture %}

{% capture respuesta %}
8c499cc92452
{% endcapture %}

{% include terminal.html
   title="Lista completa de contenedores"
   code=comando
   output=respuesta
%}

## 4. Posibles problemas durante la práctica

### Error al eliminar una imagen

Las imágenes únicamente se pueden eliminar si no existe una instancia de la misma en el ordenador. Si queremos eliminar la imagen local primero debemos eliminar los contenedores que la usen.

### Error al eliminar un contenedor

Los contenedores de forma similar a las imágenes, no pueden eliminarse si el mismo contenedor está en marcha. Para eliminarlo primero debemos detener la instancia.