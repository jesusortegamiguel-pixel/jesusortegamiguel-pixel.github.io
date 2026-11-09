
document.addEventListener("DOMContentLoaded", function () {

  const botonTema = document.querySelector("#theme-toggle");
  const iconoTema = document.querySelector("#theme-icon");

  // Leer la preferencia guardada
  const temaGuardado = localStorage.getItem("aula-theme");

  // Aplicar el tema
  const temaInicial = temaGuardado || "light";

  document.documentElement.setAttribute(
    "data-theme",
    temaInicial
  );

  actualizarIcono(temaInicial);

  // Cambiar de tema
  if (botonTema) {

    botonTema.addEventListener("click", function () {

      const temaActual =
        document.documentElement.getAttribute("data-theme");

      const nuevoTema =
        temaActual === "dark" ? "light" : "dark";

      document.documentElement.setAttribute(
        "data-theme",
        nuevoTema
      );

      localStorage.setItem("aula-theme", nuevoTema);

      actualizarIcono(nuevoTema);

    });

  }

  function actualizarIcono(tema) {

    if (!iconoTema) return;

    iconoTema.textContent =
      tema === "dark" ? "☀️" : "🌙";

    if (botonTema) {
      botonTema.setAttribute(
        "aria-label",
        tema === "dark"
          ? "Activar modo claro"
          : "Activar modo oscuro"
      );
    }

  }

});
