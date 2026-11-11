---
layout: unidad
title: Contenerización con Podman
description: Introducción a despliegue de aplicaciones con Podman
asignatura: daw
orden: 1
---

# Unidad 1. {{page.title}}

## 1. Introducción
El despliegue de aplicaciones web (deployment, en inglés) es el proceso de trasladar una aplicación desde el entorno de desarrollo local (la computadora del programador) a un entorno de producción (un servidor físico o en la nube) para que los usuarios finales puedan acceder a ella a través de internet mediante una URL.

No se trata únicamente de copiar y pegar archivos, sino de configurar todos los elementos necesarios para que el sistema funcione de forma estable, segura y escalable.

## 2. Actividades clave del despliegue

- **Configuración del servidor**: Preparar el sistema operativo, los servidores web (como Nginx o Apache) y los intérpretes o motores de ejecución.

- **Gestión de dependencias**: Instalar las librerías, frameworks y paquetes necesarios para que el código se ejecute correctamente.

- **Configuración de bases de datos**: Conectar, migrar y asegurar los esquemas de datos que la aplicación utiliza.

- **Seguridad y redes**: Implementar certificados SSL/TLS (HTTPS), reglas de firewall, gestión de puertos y variables de entorno sensibles.

- **Automatización (CI/CD)**: Utilizar integración y despliegue continuo para actualizar la aplicación de forma automática cada vez que se modifica el código.

En este tema nos vamos a centrar en la **configuración del servidor** mediante [Podman](https://podman.io/)

## 3. Instalación de Podman

Podman es un gestor de contenedores, pods e imágenes. Permite la creación de un entorno aislado de máquinas virtuales con los requisitos mínimos para la ejecución de un programa.

Vamos a instalar podman, para ello será preciso descargar el ejecutable de la [página oficial](https://podman.io/)

<figure class="unidad-figure">
  <img
    src="{{ '/assets/images/daw/unidad-1/01_podman_download.png' | relative_url }}"
    alt="Arquitectura de Podman"
  />
  <figcaption>
    Figura 1. Página oficial Podman.
  </figcaption>
</figure>

Una vez descargado ejecutaremos el instalador seleccionando la opción "Windows Linus Subsystem (WSLv2)

<figure class="unidad-figure">
  <img
    src="{{ '/assets/images/daw/unidad-1/02_podman_wizard.png' | relative_url }}"
    alt="Arquitectura de Podman"
  />
  <figcaption>
    Figura 2. Podman CLI Setup.
  </figcaption>
</figure>

Para finalizar la instalación haremos click en "Finish".

<figure class="unidad-figure">
  <img
    src="{{ '/assets/images/daw/unidad-1/03_podman_wizard.png' | relative_url }}"
    alt="Arquitectura de Podman"
  />
  <figcaption>
    Figura 3. Podman CLI Setup.
  </figcaption>
</figure>

Comprobaremos que la instalación es correcta ejecutando el siguiente comando en la línea de comandos del sistema "cmd" en caso de Windows.

{% capture comando %}
podman -v
{% endcapture %}

{% capture respuesta %}
podman version 6.1.4
{% endcapture %}

{% include terminal.html
   title="Comprobar versión de Podman"
   code=comando
   output=respuesta
%}

Con esto habremos concluido la instalación de Podman. En la próxima unidad veremos los comandos básicos para la manipulación de imagenes y contenedores con Podman.

## 4. Posibles problemas durante la práctica

### Requisito WSL

Si estás instalando Podman en una máquina windows es posible que necesites instalar WSLv2, para ello abre el terminal y ejecuta el siguiente comando y reinicia tu máquina.

{% capture comando %}
wsl --install
{% endcapture %}

{% include terminal.html
   title="Instalar WSL"
   code=comando
   output=respuesta
%}

### Podman Machine

Tras instalarlo es posible que la máquina virtual de Podman no se haya iniciado, para ello ejecuta el siguiente comando:

{% capture comando %}
podman machine start
{% endcapture %}

{% capture respuesta %}
Starting machine "podman-machine-default"
API forwarding listening on: npipe:////./pipe/docker_engine

Docker API clients default to this address. You do not need to set DOCKER_HOST.
The host trusted CA certificates have been imported successfully
Machine "podman-machine-default" started successfully
{% endcapture %}

{% include terminal.html
   title="Comprobar versión de Podman"
   code=comando
   output=respuesta
%}