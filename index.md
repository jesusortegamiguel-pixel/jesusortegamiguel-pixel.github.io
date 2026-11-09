---
layout: default
title: Inicio
---

<section class="hero" id="inicio">
  <span class="hero-tag">ZONA DE APUNTES</span>
  <h1>Carpeta de apuntes</h1>
  <p>
    Encuentra temarios, consulta los apuntes y practica
    con ejercicios interactivos para reforzar tu aprendizaje.
  </p>
</section>

<section class="section" id="asignaturas">
  <div class="section-heading">
    <div>
      <span class="section-kicker">CONTENIDOS</span>
      <h2>Mis asignaturas</h2>
      <p>Selecciona una asignatura para acceder a sus contenidos.</p>
    </div>
  </div>

  <div class="subject-grid">
    {% for asignatura in site.data.asignaturas %}
      <a class="subject-card"
         href="{{ '/asignaturas/' | append: asignatura.slug | append: '/' | relative_url }}">

        <div class="subject-icon">
          {{ asignatura.icono }}
        </div>

        <div class="subject-info">
          <h3>{{ asignatura.nombre }}</h3>
          <p>{{ asignatura.descripcion }}</p>
        </div>

        <span class="subject-arrow">→</span>
      </a>
    {% endfor %}
  </div>
</section>
