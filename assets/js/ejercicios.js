
document.addEventListener("DOMContentLoaded", function () {

  // Buscar todos los ejercicios de la página
  const ejercicios = document.querySelectorAll(".quiz");

  ejercicios.forEach(function (ejercicio) {

    const corregirBtn = ejercicio.querySelector(".quiz-correct");
    const reiniciarBtn = ejercicio.querySelector(".quiz-reset");
    const resultado = ejercicio.querySelector(".quiz-result");

    if (!corregirBtn || !resultado) return;

    corregirBtn.addEventListener("click", function () {

      const preguntas = ejercicio.querySelectorAll(".quiz-question");

      let puntuacion = 0;
      let respondidas = 0;

      preguntas.forEach(function (pregunta) {

        const correcta = pregunta.dataset.answer;
        const explicacion = pregunta.dataset.explanation || "";

        const seleccionada = pregunta.querySelector(
          'input[type="radio"]:checked'
        );

        const feedback = pregunta.querySelector(".quiz-feedback");

        if (!feedback) return;

        // Limpiar resultados anteriores
        feedback.textContent = "";
        pregunta.classList.remove("correct", "incorrect");

        if (!seleccionada) {
          feedback.textContent = "No has respondido esta pregunta.";
          pregunta.classList.add("incorrect");
          return;
        }

        respondidas++;

        if (seleccionada.value === correcta) {

          puntuacion++;

          pregunta.classList.add("correct");

          feedback.textContent =
            "¡Correcto! " + explicacion;

        } else {

          pregunta.classList.add("incorrect");

          feedback.textContent =
            "Incorrecto. " +
            "La respuesta correcta es: " +
            correcta +
            ". " +
            explicacion;
        }

      });

      // Mostrar puntuación
      resultado.textContent =
        "Has acertado " +
        puntuacion +
        " de " +
        preguntas.length +
        " preguntas. " +
        "Has respondido " +
        respondidas +
        " preguntas.";

      resultado.classList.add("visible");

    });

    // Reiniciar ejercicio
    if (reiniciarBtn) {

      reiniciarBtn.addEventListener("click", function () {

        const respuestas = ejercicio.querySelectorAll(
          'input[type="radio"]'
        );

        respuestas.forEach(function (respuesta) {
          respuesta.checked = false;
        });

        const preguntas = ejercicio.querySelectorAll(".quiz-question");

        preguntas.forEach(function (pregunta) {

          pregunta.classList.remove("correct", "incorrect");

          const feedback = pregunta.querySelector(".quiz-feedback");

          if (feedback) {
            feedback.textContent = "";
          }

        });

        resultado.textContent = "";
        resultado.classList.remove("visible");

      });

    }

  });

});
